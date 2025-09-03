import { AccountConnection } from "@/components/ui/account-connection"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-['Pacifico'] text-primary">
            Social Media Maestro
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Need help?</span>
            <button className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              Support
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6">
        <AccountConnection />
      </main>
    </div>
  )
}
