import { NextResponse } from "next/server"
import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
})

export async function POST(request: Request) {
  try {
    const {
      profile,
      analysis,
      documentText,
    } = await request.json()

    const prompt = `
You are an expert in Indian government schemes.

User Profile:
${JSON.stringify(profile, null, 2)}

Document Analysis:
${JSON.stringify(analysis, null, 2)}

Document Content:
${documentText}

Recommend only schemes that are relevant to the uploaded document.

For each scheme provide:
1. Scheme name
2. Why user is eligible
3. Benefits

If no scheme is relevant, say:
"No relevant government scheme found."
`

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    })

    return NextResponse.json({
      answer: response.text,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        answer: "Failed to generate recommendations",
      },
      { status: 500 }
    )
  }
}