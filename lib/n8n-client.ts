import jwt from "jsonwebtoken";

export async function triggerN8nWebhook(workflowId: string, data: any) {
  const token = jwt.sign({ app: "social-media-saas" }, process.env.N8N_JWT_SECRET || "", { expiresIn: "1h" });
  const response = await fetch(`${process.env.N8N_WEBHOOK_URL}/${workflowId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
}