"use client"

import { createContext, useContext, useState } from "react"

type AnalysisData = {
  documentName: string
  summary: string
  summaryHindi?: string
  importantDates: any[]
  requiredDocuments: any[]
  eligibility: any[]
  nextActions: string[]
}

const AnalysisContext = createContext<{
  analysis: AnalysisData | null
  setAnalysis: (data: AnalysisData) => void
  documentText: string
  setDocumentText: (text: string) => void
}>({
  analysis: null,
  setAnalysis: () => {},
  documentText: "",
  setDocumentText: () => {},
})

export function AnalysisProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null)
  const [documentText, setDocumentText] = useState("")
  console.log("CONTEXT DOCUMENT TEXT:", documentText.length)
  return (
    <AnalysisContext.Provider
    value={{
      analysis,
      setAnalysis,
      documentText,
      setDocumentText,
    }}
    >
      {children}
    </AnalysisContext.Provider>
  )
}

export function useAnalysis() {
  return useContext(AnalysisContext)
}