"use client"
import { Sparkles, FileText } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAnalysis } from "@/lib/analysis-context"
import { jsPDF } from "jspdf"



export function SummaryCard() {
  const { analysis } = useAnalysis()
  const downloadPdf = () => {
    if (!analysis) return
  
    const doc = new jsPDF()
  
    let y = 20
  
    doc.setFontSize(18)
    doc.text(analysis.documentName, 10, y)
  
    y += 15
  
    doc.setFontSize(12)
  
    doc.text("Summary:", 10, y)
    y += 8
  
    const summaryLines = doc.splitTextToSize(
      analysis.summary,
      180
    )
  
    doc.text(summaryLines, 10, y)
  
    y += summaryLines.length * 7 + 10
  
    doc.text("Eligibility:", 10, y)
    y += 8
  
    analysis.eligibility.forEach((item) => {
      doc.text(
        `${item.met ? "YES" : "NO"} - ${item.label}`,
        10,
        y
      )
      y += 7
    })
  
    y += 5
  
    doc.text("Required Documents:", 10, y)
    y += 8
  
    analysis.requiredDocuments.forEach((item) => {
      doc.text(`- ${item.name}`, 10, y)
      y += 7
    })
  
    y += 5
  
    doc.text("Important Dates:", 10, y)
    y += 8
  
    analysis.importantDates.forEach((item) => {
      doc.text(`${item.label}: ${item.date}`, 10, y)
      y += 7
    })
  
    y += 5
  
    doc.text("Next Actions:", 10, y)
    y += 8
  
    analysis.nextActions.forEach((action) => {
      doc.text(`- ${action}`, 10, y)
      y += 7
    })
  
    doc.save(`${analysis.documentName}.pdf`)
  }
  return (
    <Card className="glass flex h-full flex-col border-0 p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-xl bg-accent text-primary">
          <Sparkles className="size-4.5" aria-hidden="true" />
        </div>
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight">AI Summary</h2>
          <p className="text-xs text-muted-foreground">Generated in plain language</p>
        </div>
        <Badge variant="secondary" className="ml-auto gap-1.5">
          <FileText className="size-3" aria-hidden="true" />
          Gazette
        </Badge>
      </div>

      <div>
      <h3 className="mb-2 text-lg font-semibold">
      {analysis?.documentName}
      </h3>
  <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
    {analysis?.summary || "Upload a document to see AI summary"}
  </p>

  {analysis && (
    <button
      onClick={downloadPdf}
      className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground"
    >
      📄 Download Report
    </button>
  )}
</div>

      
    </Card>
  )
}
