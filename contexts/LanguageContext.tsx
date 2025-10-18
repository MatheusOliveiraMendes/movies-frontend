import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Language, translate } from '../lib/translations';

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, variables?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const DEFAULT_LANGUAGE: Language = 'en';
const STORAGE_KEY = 'movies-language';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stored = window.localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored && ['en', 'pt', 'es'].includes(stored)) {
      setLanguage(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: (key, variables) => translate(language, key, variables),
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
