"use client"

import {
  LayoutDashboard,
  FileText,
  CalendarClock,
  FolderCheck,
  ShieldCheck,
  MessageSquareText,
  Settings,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Summary", icon: FileText },
  { label: "Important Dates", icon: CalendarClock },
  { label: "Required Docs", icon: FolderCheck },
  { label: "Eligibility", icon: ShieldCheck },
  { label: "Ask AI", icon: MessageSquareText },
]

export function Sidebar() {
  return (
    <aside className="glass sticky top-4 hidden h-[calc(100vh-2rem)] w-64 shrink-0 flex-col rounded-3xl p-5 lg:flex">
      <div className="flex items-center gap-3 px-2">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <ShieldCheck className="size-5" aria-hidden="true" />
        </div>
        <div className="leading-tight">
          <p className="font-heading text-base font-semibold tracking-tight">SarkarAI</p>
          <p className="text-xs text-muted-foreground">Document Intelligence</p>
        </div>
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-1" aria-label="Primary">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              item.active
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            <item.icon className="size-4.5" aria-hidden="true" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="flex flex-col gap-1 border-t border-border pt-4">
        <button className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
          <Settings className="size-4.5" aria-hidden="true" />
          Settings
        </button>
        <button className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
          <LogOut className="size-4.5" aria-hidden="true" />
          Sign out
        </button>
      </div>
    </aside>
  )
}
