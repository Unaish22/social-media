import type { ReactNode } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar>
          <SidebarHeader>
            <div className="p-4">
              <Link href="/" className="text-2xl font-['Pacifico'] text-primary">
                Social Maestro
              </Link>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              {/* Dashboard */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <Link href="/dashboard">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                      className="h-5 w-5">
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                    </svg>
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Create Post */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/create-post">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                      className="h-5 w-5">
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                    <span>Create Post</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Schedule */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/schedule">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                      className="h-5 w-5">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>Schedule</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Analytics */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/analytics">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                      className="h-5 w-5">
                      <line x1="18" y1="20" x2="18" y2="10" />
                      <line x1="12" y1="20" x2="12" y2="4" />
                      <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* 🚀 Token Manager */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/token">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                      className="h-5 w-5">
                      <path d="M12 1v22M5 12h14" />
                    </svg>
                    <span>Token Manager</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* 🔐 Auth Setup */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/auth">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                      className="h-5 w-5">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>Auth Setup</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Media Library */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/media">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                      className="h-5 w-5">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span>Media Library</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Settings */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/settings">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                      className="h-5 w-5">
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>

          {/* Sidebar Footer */}
          <SidebarFooter>
            <div className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                    className="h-5 w-5 text-gray-600">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">Emily Johnson</p>
                  <p className="text-xs text-gray-500">Premium Plan</p>
                </div>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1">
          <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center">
                <SidebarTrigger />
                <h1 className="text-xl font-semibold text-gray-800 ml-4">Marketing HQ</h1>
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="outline" className="flex items-center gap-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                    className="h-5 w-5">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  <span>AI Assistant</span>
                </Button>

                <div className="flex items-center space-x-3">
                  <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                      className="h-5 w-5">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                      className="h-5 w-5">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </header>

          <main className="container mx-auto px-4 py-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
