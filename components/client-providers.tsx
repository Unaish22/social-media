'use client';

import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { OnboardingProvider } from '@/components/onboarding/onboarding-context'; // ✅ Import OnboardingProvider

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <OnboardingProvider> {/* ✅ Wrap children in OnboardingProvider */}
            {children}
          </OnboardingProvider>
        </ThemeProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
