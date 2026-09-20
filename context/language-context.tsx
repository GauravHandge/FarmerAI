"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { Language, LANGUAGES, TRANSLATIONS } from "@/lib/i18n"

type LanguageContextType = {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en")

  useEffect(() => {
    const saved = localStorage.getItem("kisanmitra_lang") as Language
    if (saved && TRANSLATIONS[saved]) {
      setLangState(saved)
    }
  }, [])

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    localStorage.setItem("kisanmitra_lang", newLang)
  }

  const t = (key: string): string => {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS["en"]
    return dict[key] || TRANSLATIONS["en"][key] || key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    // Return fallback if called outside provider
    return {
      lang: "en" as Language,
      setLang: () => {},
      t: (key: string) => TRANSLATIONS["en"][key] || key,
    }
  }
  return context
}
