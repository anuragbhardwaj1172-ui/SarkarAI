import { NextResponse } from "next/server"
import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
})

export async function POST(request: Request) {
  try {
    const { question, documentText, analysis } = await request.json()
    console.log("ANALYSIS RECEIVED:", analysis)
    console.log("ELIGIBILITY:", analysis?.eligibility)
    console.log("CHAT ROUTE HIT")
    console.log("QUESTION:", question)
    console.log("DOCUMENT LENGTH:", documentText?.length)

    let response
    if (
      question.toLowerCase().includes("eligible") &&
      analysis?.eligibility?.length
    ) {
      const allMet = analysis.eligibility.every(
        (item: any) => item.met
      )
    
      return NextResponse.json({
        answer: allMet
          ? "Based on the analyzed criteria, you appear eligible for this scheme."
          : "Based on the analyzed criteria, you may not be fully eligible for this scheme.",
      })
    }
    try {
      response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
Document:
${documentText}

Analysis:
${JSON.stringify(analysis, null, 2)}

Question:
${question}

Use both the document and the analysis.

If the user asks about eligibility,
use the eligibility analysis to answer.

If information is unavailable, reply:
"Information not found in the uploaded document."
`,
      })
    } catch (error) {
      console.error("CHAT API ERROR:", error)

      return NextResponse.json({
        answer:
          "Demo Mode: Gemini quota is exhausted. The AI assistant is currently unavailable.",
      })
    }

    return NextResponse.json({
      answer: response.text,
    })
  } catch (error) {
    console.error("CHAT ROUTE ERROR:", error)

    return NextResponse.json({
      answer: "Something went wrong.",
    })
  }
}