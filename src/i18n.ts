import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./language/en/translation.json";
import de from "./language/de/translation.json";

const resources = {
  en: { translation: en },
  de: { translation: de },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",  // Standard-Sprache
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
