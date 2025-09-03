import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to conditionally join classNames and intelligently merge Tailwind classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Utility function to safely format error messages.
 */
export function formatError(error: unknown): string {
  return error instanceof Error ? error.message : "An unexpected error occurred"
}
