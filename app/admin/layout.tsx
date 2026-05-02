import type React from "react"

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
}

// Bare admin layout — child segments (login, (panel)) provide their own chrome.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
