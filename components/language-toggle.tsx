"use client"

import { useLanguage } from "@/lib/language-context"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <button
      onClick={() =>
        setLanguage(
          language === "en" ? "hi" : "en"
        )
      }
      className="border px-3 py-2 rounded-lg"
    >
      {language === "en"
        ? "English"
        : "हिन्दी"}
    </button>
  )
}