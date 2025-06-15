import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import raw from "./language/translation.json"; // enthält beide Sprachen in einer Datei

function transform(lang: "en" | "de") {
  const translateNode = (node: any): any => {
    if (typeof node === "object" && node.en && node.de) {
      return node[lang];
    }
    if (typeof node === "object") {
      const result: any = {};
      for (const key in node) {
        result[key] = translateNode(node[key]);
      }
      return result;
    }
    return node;
  };

  return translateNode(raw);
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: transform("en") },
      de: { translation: transform("de") },
    },
    lng: "en",            // 🔁 Sprache fest auf Englisch
    fallbackLng: "en",    // Falls etwas fehlt → Englisch
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
