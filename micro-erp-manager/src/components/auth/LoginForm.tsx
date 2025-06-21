import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { login } from "@/services/authService";

const LoginForm: React.FC = () => {
  const { setToken } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const token = await login(email, senha);
      setToken(token);
    } catch (err) {
      setError(err.message || "E-mail ou senha inválidos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Entrar</h2>
      <div>
        <label htmlFor="email" className="block mb-1 font-medium">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          className="input w-full"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoFocus
        />
      </div>
      <div>
        <label htmlFor="senha" className="block mb-1 font-medium">
          Senha
        </label>
        <input
          id="senha"
          type="password"
          className="input w-full"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={loading}
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
};

export default LoginForm;