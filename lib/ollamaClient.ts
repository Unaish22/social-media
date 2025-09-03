// lib/ollamaClient.ts
export async function ollamaGenerate(prompt: string): Promise<string> {
  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "tinyllama", prompt, stream: false }),
  });

  if (!res.ok) throw new Error(`Ollama ${res.status}`);
  const json = await res.json();
  console.log("TinyLlama response:", json);
  return json.response?.trim() || "";
}