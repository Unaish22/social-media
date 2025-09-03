"use client"
import { PlatformSelection } from "./platform-selection"
import { AccountDetails } from "./account-details"
import { FeatureSelection } from "./feature-selection"
import { BrandVoice } from "./brand-voice"
import { UploadAssets } from "./upload-assets"
import { Confirmation } from "./confirmation"
import { OnboardingProvider, useOnboarding } from "./onboarding-context"

export function OnboardingWizard() {
  return (
    <OnboardingProvider>
      <OnboardingWizardContent />
    </OnboardingProvider>
  )
}

function OnboardingWizardContent() {
  const { step, setStep } = useOnboarding()

  const renderStep = () => {
    switch (step) {
      case 1:
        return <PlatformSelection />
      case 2:
        return <AccountDetails />
      case 3:
        return <FeatureSelection />
      case 4:
        return <BrandVoice />
      case 5:
        return <UploadAssets />
      case 6:
        return <Confirmation />
      default:
        return <PlatformSelection />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="w-full bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="text-2xl font-['Pacifico'] text-primary">Social Media Maestro</div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Need help?</span>
            <button className="text-primary hover:text-primary/80 text-sm font-medium rounded-button flex items-center gap-1">
              <div className="w-5 h-5 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <path d="M12 17h.01" />
                </svg>
              </div>
              Support
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-2xl">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-gray-500">Step {step} of 6</div>
              <div className="text-xs text-gray-500">{Math.round((step / 6) * 100)}% Complete</div>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: `${(step / 6) * 100}%` }}></div>
            </div>
          </div>

          {renderStep()}
        </div>
      </main>
    </div>
  )
}
