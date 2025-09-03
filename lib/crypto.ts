import crypto from "crypto"
const key = Buffer.from(process.env.ENCRYPTION_KEY!, "utf8")

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv)
  return iv.toString("hex") + ":" + Buffer.concat([cipher.update(text, "utf8"), cipher.final()]).toString("hex")
}

export function decrypt(encrypted: string): string {
  const [ivHex, encryptedHex] = encrypted.split(":")
  const iv = Buffer.from(ivHex, "hex")
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv)
  return Buffer.concat([decipher.update(Buffer.from(encryptedHex, "hex")), decipher.final()]).toString("utf8")
}