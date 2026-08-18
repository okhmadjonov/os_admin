import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import uzJSON from "./translate/uz.json";
import ruJSON from "./translate/ru.json";

const getInitialLanguage = (): string => {
  const savedLang = localStorage.getItem("lang");
  if (savedLang) return savedLang;
  
  const browserLang = navigator.language.split("-")[0];
  return browserLang === "ru" ? "ru" : "uz";
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      uz: {
        translation: uzJSON,
      },
      ru: {
        translation: ruJSON,
      },
    },
    lng: getInitialLanguage(),
    fallbackLng: "uz",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true, 
    },
  });

export default i18n;