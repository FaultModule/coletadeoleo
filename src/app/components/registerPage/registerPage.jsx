"use client";
import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaMapMarkerAlt,
  FaWallet,
} from "react-icons/fa";

export default function RegisterPage() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    cep:"",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (result.success) {
        setMessage("✅ Usuário cadastrado com sucesso!");
        setForm({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          password: "",
          address: "",
          cep:"",
          balance: "",
        });
      } else {
        setMessage("❌ Erro: " + result.error);
      }
    } catch (error) {
      setMessage("❌ Erro inesperado: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Cadastro CleanSite
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField icon={<FaUser />} name="first_name" value={form.first_name} placeholder="Nome" onChange={handleChange} />
          <InputField icon={<FaUser />} name="last_name" value={form.last_name} placeholder="Sobrenome" onChange={handleChange} />
          <InputField icon={<FaEnvelope />} type="email" name="email" value={form.email} placeholder="Email" onChange={handleChange} />
          <InputField icon={<FaPhone />} name="phone" value={form.phone} placeholder="Telefone" onChange={handleChange} />
          <InputField icon={<FaLock />} type="password" name="password" value={form.password} placeholder="Senha" onChange={handleChange} />
          <InputField icon={<FaMapMarkerAlt />} name="address" value={form.address} placeholder="Endereço" onChange={handleChange} />
          <InputField icon={<FaMapMarkerAlt />} name="cep" value={form.cep} placeholder="CEP" onChange={handleChange} />
         

          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition duration-300"
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </div>
        </form>

        {message && (
          <p className="text-center mt-4 text-sm text-gray-700">{message}</p>
        )}

        <p className="text-center text-sm text-gray-500 mt-4">
          Já tem uma conta?{" "}
          <a href="/login" className="text-green-600 hover:underline">
            Entrar
          </a>
        </p>
      </div>
    </div>
  );
}

// Componente reutilizável de input
function InputField({ icon, name, value, onChange, placeholder, type = "text", step, full }) {
  return (
    <div className={`relative ${full ? "col-span-1 md:col-span-2" : "col-span-1"}`}>
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600">
        {icon}
      </div>
      <input
        type={type}
        step={step}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        required
      />
    </div>
  );
}
