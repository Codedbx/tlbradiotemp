"use client"

import { Sun, Moon } from "lucide-react" // Import Lucide icons
import { useTheme } from "@/components/theme-provider" // Corrected import path

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-md p-2 border border-border bg-card hover:bg-muted transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Sun className="h-5 w-5 text-foreground" /> : <Moon className="h-5 w-5 text-foreground" />}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
