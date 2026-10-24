const THEME_KEY = "samadhan_theme";
const LANG_KEY = "samadhan_language";
const CHATS_KEY = "samadhan_chats";

export const getTheme = () => localStorage.getItem(THEME_KEY) || "system";
export const setTheme = (theme) => localStorage.setItem(THEME_KEY, theme);

export const getLanguage = () => localStorage.getItem(LANG_KEY) || "hinglish";
export const setLanguage = (lang) => localStorage.setItem(LANG_KEY, lang);

export const getChats = () => {
  try {
    return JSON.parse(localStorage.getItem(CHATS_KEY) || "{}");
  } catch {
    return {};
  }
};

export const saveChats = (chats) => {
  localStorage.setItem(CHATS_KEY, JSON.stringify(chats));
};