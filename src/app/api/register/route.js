import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const data = await req.json();
    const {
      first_name,
      last_name,
      email,
      phone,
      password,
      address,
      cep,
    } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        phone,
        password_hash: hashedPassword, // <-- Aqui está o ajuste
        address,
        cep,
      },
    });

    return Response.json({ success: true, newUser });
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
