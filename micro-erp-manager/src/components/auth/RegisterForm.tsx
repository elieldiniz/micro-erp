import React, { useState } from "react";
import { register } from "@/services/authService";

const RegisterForm: React.FC = () => {
  const [form, setForm] = useState({
    nome: "",
    cnpj: "",
    email: "",
    senha: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      await register(form.nome, form.cnpj, form.email, form.senha);
      setSuccess("Empresa cadastrada com sucesso! Faça login para continuar.");
      setForm({ nome: "", cnpj: "", email: "", senha: "" });
    } catch (err) {
      setError(err.message || "Erro ao cadastrar empresa");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Cadastrar Empresa</h2>
      <div>
        <label htmlFor="nome" className="block mb-1 font-medium">
          Nome da empresa
        </label>
        <input
          id="nome"
          name="nome"
          className="input w-full"
          value={form.nome}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="cnpj" className="block mb-1 font-medium">
          CNPJ
        </label>
        <input
          id="cnpj"
          name="cnpj"
          className="input w-full"
          value={form.cnpj}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block mb-1 font-medium">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="input w-full"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="senha" className="block mb-1 font-medium">
          Senha
        </label>
        <input
          id="senha"
          name="senha"
          type="password"
          className="input w-full"
          value={form.senha}
          onChange={handleChange}
          required
        />
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">{success}</div>}
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={loading}
      >
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>
    </form>
  );
};

export default RegisterForm;