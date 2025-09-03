import TokenManager from "@/components/token-management/token-manager";

export default function TokensPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Token Manager</h1>
      <TokenManager />
    </div>
  );
}
