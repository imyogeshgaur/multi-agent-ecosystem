export default function PersonaCard({ persona, language, onClick }) {
  const desc = persona.description[language] || persona.description.hinglish;

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 cursor-pointer hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all"
    >
      <div className={`w-12 h-12 ${persona.accent} rounded-xl flex items-center justify-center text-xl mb-4 text-white`}>
        {persona.icon}
      </div>
      <h3 className="text-xl font-semibold mb-1">{persona.name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}