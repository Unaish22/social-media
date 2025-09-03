import SocialAuth from "@/components/token-management/social-auth";

export default function AuthPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Authentication Setup</h1>
      <SocialAuth />
    </div>
  );
}
