export default function MessageBubble({ message }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] px-4 py-2 rounded-2xl whitespace-pre-wrap ${
          isUser
            ? "bg-green-700 text-white"
            : "bg-gray-700 text-white font-semibold"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}