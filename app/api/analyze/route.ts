import { NextResponse } from "next/server"

import { analyzeGovernmentDocument } from "@/lib/gemini"
console.log("ANALYZE ROUTE FILE LOADED")
export async function POST(request: Request) {
  console.log("API ANALYZE HIT")
  try {
    const body = await request.json()
    const text =
      typeof body.text === "string"
        ? body.text
        : typeof body.documentText === "string"
          ? body.documentText
          : null

    if (!text?.trim()) {
      return NextResponse.json(
        { error: "Request body must include a non-empty `text` string." },
        { status: 400 },
      )
    }

    const analysis = await analyzeGovernmentDocument(text)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("ANALYZE ERROR:", error)
  
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
