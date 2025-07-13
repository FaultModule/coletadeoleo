import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest } from 'next/server'

const prisma = new PrismaClient();

const SECRET = process.env.JWT_SECRET || "segredo-temporario";


export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return Response.json({ error: "Usuário não encontrado." }, { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) {
    return Response.json({ error: "Senha incorreta." }, { status: 401 });
  }

  const token = jwt.sign(
    { id: user.id, name: user.first_name, email: user.email },
    SECRET,
    { expiresIn: "7d" }
  );

  return new Response(null, {
    status: 200,
    headers: {
      "Set-Cookie": `token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=604800`,
    },
  });
}
