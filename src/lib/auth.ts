import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'default_secret'

export function getUserFromToken(req: Request) {
  const cookieHeader = req.headers.get('cookie')
  const token = cookieHeader
    ?.split(';')
    ?.find((c) => c.trim().startsWith('token='))
    ?.split('=')[1]

  if (!token) return null

  try {
    const user = jwt.verify(token, SECRET)
    return user as { id: string; email: string }
  } catch (err) {
    console.error('Invalid token', err)
    return null
  }
}
