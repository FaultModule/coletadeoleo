"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaLock } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        const data = await res.json();
        setMessage(data.error || "Erro ao fazer login");
      }
    } catch (error) {
      setMessage("Erro na conexão com o servidor.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-600">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Login CleanSite
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full pl-10 pr-4 py-2 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Senha"
              required
              className="w-full pl-10 pr-4 py-2 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-xl transition duration-300"
          >
            Entrar
          </button>

          {message && (
            <p className="text-sm text-center text-red-600">{message}</p>
          )}

          <p className="text-center text-sm text-gray-500">
            Ainda não tem uma conta?{" "}
            <a href="/register" className="text-green-600 hover:underline">
              Cadastre-se
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

