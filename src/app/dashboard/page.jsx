import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "segredo-temporario";

export default async function DashboardPage() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const user = jwt.verify(token, SECRET);

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-green-700">
          Bem-vindo, {user.name}!
        </h1>
        <p className="text-gray-600 mt-2">Email: {user.email}</p>

        <form action="/api/logout" method="POST" className="mt-6">
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition"
          >
            Sair
          </button>
        </form>
      </div>
    );
  } catch (err) {
    redirect("/login");
  }
}
