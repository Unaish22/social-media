import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(req: NextRequest, context: any) {
  const { id } = context.params // ✅ avoid Next.js 15 type bug
  try {
    const body = await req.json()
    const user = await prisma.user.update({
      where: { id },
      data: body,
    })
    return NextResponse.json(user)
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}
