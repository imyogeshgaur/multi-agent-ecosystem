import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { personas } from "../data/personas";
import { getTheme, setTheme, getLanguage, setLanguage } from "../utils/storage";
import PersonaCard from "../components/PersonaCard";

export default function Home() {
  const navigate = useNavigate();
  const [theme, setThemeState] = useState(getTheme());
  const [language, setLanguageState] = useState(getLanguage());

  useEffect(() => {
    const isDark =
      theme === "dark" ||
      (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);
  }, [theme]);

  const handleTheme = (t) => {
    setTheme(t);
    setThemeState(t);
  };

  const handleLanguage = (l) => {
    setLanguage(l);
    setLanguageState(l);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="w-40"></div>
        <h1 className="text-2xl font-bold">Samadhan</h1>
        <div className="flex gap-3">
          <select
            value={theme}
            onChange={(e) => handleTheme(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 px-3 py-1.5 rounded-lg text-sm"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
          <select
            value={language}
            onChange={(e) => handleLanguage(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 px-3 py-1.5 rounded-lg text-sm"
          >
            <option value="hinglish">Hinglish</option>
            <option value="tamil">Tamil</option>
            <option value="telugu">Telugu</option>
            <option value="gujarati">Gujarati</option>
            <option value="punjabi">Punjabi</option>
            <option value="kannada">Kannada</option>
            <option value="malayalam">Malayalam</option>
          </select>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-center mb-3">Namaste! 👋</h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-12">
          Choose a persona to get started with Samadhan AI.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personas.map((p) => (
            <PersonaCard
              key={p.id}
              persona={p}
              language={language}
              onClick={() => navigate(`/chat/${p.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}