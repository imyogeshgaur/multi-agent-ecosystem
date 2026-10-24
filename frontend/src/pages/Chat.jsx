import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { personas } from "../data/personas";
import { getChats, saveChats, getLanguage } from "../utils/storage";
import Sidebar from "../components/Sidebar";
import MessageBubble from "../components/MessageBubble";
import AnimationOverlay from "../components/AnimationOverlay";

export default function Chat() {
  const { personaId } = useParams();
  const navigate = useNavigate();
  const persona = personas.find((p) => p.id === personaId);
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [input, setInput] = useState("");
  const [showAnim, setShowAnim] = useState(false);
  const [language, setLanguageState] = useState(getLanguage());
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const all = getChats();
    const personaChats = all[personaId] || [];
    setChats(personaChats);
    if (personaChats.length === 0) {
      createNewChat();
    } else {
      setCurrentId(personaChats[personaChats.length - 1].id);
    }
  }, [personaId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, currentId]);

  const saveAll = (updated) => {
    const all = getChats();
    all[personaId] = updated;
    saveChats(all);
    setChats(updated);
  };

  const createNewChat = () => {
    const id = Date.now().toString();
    const welcome = persona.welcome[language] || persona.welcome.hinglish;
    const newChat = {
      id,
      title: "New chat",
      messages: [{ role: "assistant", content: welcome }],
    };
    const updated = [...chats, newChat];
    saveAll(updated);
    setCurrentId(id);
  };

  const currentChat = chats.find((c) => c.id === currentId);

  const send = async () => {
    if (!input.trim() || !currentChat) return;
    const text = input.trim();
    setInput("");

    const updatedMessages = [...currentChat.messages, { role: "user", content: text }];
    const updatedChats = chats.map((c) =>
      c.id === currentId
        ? { ...c, messages: updatedMessages, title: c.title === "New chat" ? text.slice(0, 30) : c.title }
        : c
    );
    saveAll(updatedChats);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          persona: personaId,
          language: getLanguage(),
          history: updatedMessages,
          message: text,
        }),
      });
      const data = await res.json();
      let reply = data.reply || "...";

      if (reply.startsWith("COIN")) {
        reply = reply.replace("COIN", "").trim();
        setShowAnim(true);
        setTimeout(() => {
          setShowAnim(false);
          const final = updatedChats.map((c) =>
            c.id === currentId
              ? { ...c, messages: [...c.messages, { role: "assistant", content: reply }] }
              : c
          );
          saveAll(final);
        }, 3000);
      } else {
        const final = updatedChats.map((c) =>
          c.id === currentId
            ? { ...c, messages: [...c.messages, { role: "assistant", content: reply }] }
            : c
        );
        saveAll(final);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (!persona) return <div>Persona not found</div>;

  const roleText = persona.role[language] || persona.role.hinglish;

  return (
    <div className="flex h-screen bg-gray-950 text-white dark:bg-gray-950">
      <Sidebar
        chats={chats}
        currentId={currentId}
        onSelect={setCurrentId}
        onNew={createNewChat}
      />

      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-800 flex items-center gap-3">
          <button onClick={() => navigate("/")} className="text-gray-400 hover:text-white">←</button>
          <div className={`w-10 h-10 ${persona.accent} rounded-full flex items-center justify-center`}>
            {persona.icon}
          </div>
          <div>
            <div className="font-semibold">{persona.name}</div>
            <div className="text-xs text-gray-400">{roleText}</div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {currentChat?.messages.map((m, i) => (
            <MessageBubble key={i} message={m} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-gray-800">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type your message..."
              className="flex-1 bg-gray-800 rounded-full px-4 py-3 outline-none"
            />
            <button
              onClick={send}
              className="bg-green-600 hover:bg-green-700 w-12 h-12 rounded-full"
            >
              ➤
            </button>
          </div>
        </div>
      </div>

      <AnimationOverlay persona={personaId} show={showAnim} />
    </div>
  );
}