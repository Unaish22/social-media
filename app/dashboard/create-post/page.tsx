"use client"

import { OnboardingProvider } from "@/components/onboarding/onboarding-context";
import { CreatePostWizard } from "@/components/create-post/create-post-wizard";

export default function CreatePostPage() {
  return (
    <OnboardingProvider>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold tracking-tight mb-6">Create New Post</h1>
        <CreatePostWizard />
      </div>
    </OnboardingProvider>
  );
}