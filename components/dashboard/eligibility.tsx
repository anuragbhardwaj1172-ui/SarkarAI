"use client"
import { useAnalysis } from "@/lib/analysis-context"
import { ShieldCheck, Check, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const criteria = [
  { label: "Annual household income under ₹6 lakh (LIG)", met: true },
  { label: "Applicant is 18 years or older", met: true },
  { label: "No pucca house owned by family in India", met: true },
  { label: "Woman ownership / co-ownership of property", met: false },
]

export function Eligibility() {
  const { analysis } = useAnalysis()
  
  const currentCriteria = analysis?.eligibility ?? []
  console.log(
    "ELIGIBILITY DATA:",
    JSON.stringify(currentCriteria, null, 2)
  )
  const total = currentCriteria.length

  const metCount = currentCriteria.filter(
    (item) => item.met
  ).length
  
  const score =
    total > 0
      ? Math.round((metCount / total) * 100)
      : 0

  return (
    <Card className="glass flex h-full flex-col border-0 p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-xl bg-accent text-primary">
          <ShieldCheck className="size-4.5" aria-hidden="true" />
        </div>
        <h2 className="font-heading text-lg font-semibold tracking-tight">Eligibility</h2>
      </div>

      <div className="mb-5 rounded-2xl border border-glass-border p-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Eligibility score</p>
            <p
  className={cn(
    "font-heading text-3xl font-semibold tracking-tight",
    score >= 80
      ? "text-green-500"
      : score >= 50
      ? "text-yellow-500"
      : "text-red-500"
  )}
>
  {score}%
</p>
          </div>
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
          {
  score >= 70
    ? "Likely eligible"
    : score >= 40
    ? "Needs verification"
    : "Eligibility unknown"
}
          </span>
        </div>
        <Progress value={score} className="mt-3 h-2" />
      </div>

      <ul className="flex-1 space-y-2.5">
      {currentCriteria.map((item) => (
          <li key={item.label} className="flex items-start gap-3 text-sm">
            <span
  className={cn(
    "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
    item.met
      ? "bg-green-500 text-white"
      : "bg-red-500 text-white"
  )}
>
  {item.met ? (
    <Check className="size-3" />
  ) : (
    <X className="size-3" />
  )}
</span>
            <span className="text-pretty">{item.label}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
