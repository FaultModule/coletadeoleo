// src/app/api/collections/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const data = await req.json()
  const user = await getUserFromToken(req)

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { quantityLiters, address } = data

  // Converte o user.id (string) para number
  const userId = typeof user.id === 'string'
    ? parseInt(user.id, 10)
    : user.id

  // Garante que quantityLiters também seja number
  const qty = typeof quantityLiters === 'string'
    ? parseFloat(quantityLiters)
    : quantityLiters

  const collection = await prisma.collection.create({
    data: {
      user_id: userId,
      quantity_liters: qty,
      address,
      status: 'Pendente',
    },
  })

  return NextResponse.json(collection)
}
