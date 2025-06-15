import { useTranslation as useBaseTranslation } from "react-i18next";
import { TranslationKey } from "./translationKeys";

export function useTypedTranslation() {
  const { t: baseT, ...rest } = useBaseTranslation();
  const t = (key: TranslationKey) => baseT(key);
  return { t, ...rest };
}
