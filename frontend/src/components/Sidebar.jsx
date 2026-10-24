export default function Sidebar({ chats, currentId, onSelect, onNew }) {
  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <span className="font-semibold">Chats</span>
        <button
          onClick={onNew}
          className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded-lg"
        >
          + New
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelect(chat.id)}
            className={`p-3 cursor-pointer border-b border-gray-800 hover:bg-gray-800 ${
              chat.id === currentId ? "bg-gray-800" : ""
            }`}
          >
            <div className="text-sm truncate">{chat.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}