import { spawn } from 'child_process';

export async function runPrompt(prompt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const llama = spawn('ollama', ['run', 'tinyllama', prompt]);
    let out = '';
    llama.stdout.on('data', (d) => (out += d));
    llama.on('close', () => resolve(out.trim()));
    llama.on('error', reject);
  });
}