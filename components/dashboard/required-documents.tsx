"use client"
import { useAnalysis } from "@/lib/analysis-context"
import { FolderCheck, CheckCircle2, Circle } from "lucide-react"
import { Card } from "@/components/ui/card"

const documents = [
  { name: "Aadhaar Card", note: "Identity proof", ready: true },
  { name: "PAN Card", note: "Income / tax proof", ready: true },
  { name: "Income Certificate", note: "Issued by Tehsildar", ready: true },
  { name: "Bank Account Details", note: "Linked to Aadhaar", ready: false },
  { name: "Property Documents", note: "Sale agreement / allotment", ready: false },
]

export function RequiredDocuments() {
  const { analysis } = useAnalysis()
  console.log(analysis)
  const currentDocs = analysis?.requiredDocuments || documents

  

  return (
    <Card className="glass flex h-full flex-col border-0 p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-xl bg-accent text-primary">
          <FolderCheck className="size-4.5" aria-hidden="true" />
        </div>
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight">Required Documents</h2>
          <p className="text-xs text-muted-foreground">
           {currentDocs.length} documents required
          </p>
        </div>
      </div>

      <ul className="flex-1 space-y-2">
      {currentDocs.map((doc) => (
          <li
            key={doc.name}
            className="flex items-center gap-3 rounded-xl border border-glass-border px-3 py-2.5"
          >
            {doc.ready ? (
              <CheckCircle2
              className="size-5 shrink-0 text-primary"
              aria-hidden="true"
            />
            ) : (
              <Circle className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
            )}
            <div className="flex-1">
              <p className="text-sm font-medium">{doc.name}</p>
              <p className="text-xs text-muted-foreground">{doc.note}</p>
            </div>
            <span className="text-xs font-medium text-muted-foreground">
            Required
            </span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
