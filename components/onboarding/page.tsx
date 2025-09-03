"use client"

import { SessionProvider } from "next-auth/react"
import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard"

export default function OnboardingPage() {
  return (
    <SessionProvider>
      <OnboardingWizard />
    </SessionProvider>
  )
}
