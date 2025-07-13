import { prisma } from '@/lib/prisma'
import { getUserFromToken } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const data = await req.json()
  const user = await getUserFromToken(req)

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { quantityLiters, address } = data
  console.log(Object.keys(prisma))
  const collection = await prisma.collection.create({
    data: {
      user_id: user.id,
      quantity_liters: quantityLiters,
      address,
      status: 'Pendente',
    },
  })

  return NextResponse.json(collection)
}
