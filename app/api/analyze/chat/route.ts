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
      (
        question.toLowerCase().includes("eligible") ||
        question.includes("पात्र")
      ) &&
      analysis?.eligibility?.length
    ){
      const allMet = analysis.eligibility.every(
        (item: any) => item.met
      )
    
      const isHindi =
  question.includes("पात्र") ||
  question.includes("योजना") ||
  question.includes("क्या")

return NextResponse.json({
  answer: isHindi
    ? allMet
      ? "विश्लेषित मानदंडों के आधार पर, आप इस योजना के लिए पात्र प्रतीत होते हैं।"
      : "विश्लेषित मानदंडों के आधार पर, आप इस योजना के लिए पूरी तरह पात्र नहीं हो सकते हैं।"
    : allMet
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

If the question is in Hindi, answer in Hindi.

If the question is in English, answer in English.

If the user asks about eligibility,
use the eligibility analysis to answer.

If information is unavailable, reply in the same language as the question.
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