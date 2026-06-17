"use client"

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react"

type Language = "en" | "hi"

type LanguageContextType = {
  language: Language
  setLanguage: React.Dispatch<
    React.SetStateAction<Language>
  >
}

const LanguageContext =
  createContext<LanguageContextType | null>(null)

export function LanguageProvider({
  children,
}: {
  children: ReactNode
}) {
  const [language, setLanguage] =
    useState<Language>("en")
    console.log("PROVIDER LANGUAGE:", language)
  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    )
  }

  return context
}