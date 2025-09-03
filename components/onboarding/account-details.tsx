"use client"

import { useOnboarding } from "@/components/onboarding/onboarding-context"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { AccountConnection } from "@/components/ui/account-connection"

export function AccountDetails() {
  const { selectedPlatforms, setStep } = useOnboarding()

  const handleNext = () => {
    setStep(3)
  }

  const handleBack = () => {
    setStep(1)
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-3">Step 2: Account Details</h1>
        <p className="text-gray-600 max-w-lg mx-auto">
          Connect your selected social media accounts using OAuth
        </p>
      </div>

      <div className="space-y-8">
        {Object.keys(selectedPlatforms).some(
          (platform) => selectedPlatforms[platform as keyof typeof selectedPlatforms]
        ) ? (
          <AccountConnection />
        ) : (
          <p className="text-gray-500 text-center">
            No platforms selected. Please go back to select at least one platform.
          </p>
        )}
      </div>

      <div className="mt-6 text-center text-sm text-gray-500 mb-8">
        Your credentials are securely handled through OAuth and will never be stored.
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={handleBack}
          className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-button hover:bg-gray-200 transition-colors"
        >
          &lt; Back
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-3 bg-primary text-white font-medium rounded-button hover:bg-primary/90 transition-colors"
        >
          Next &gt;
        </button>
      </div>
    </div>
  )
}
