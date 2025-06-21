// src/services/authService.ts

// Função de login: retorna o token JWT
export const login = async (email: string, senha: string): Promise<string> => {
  const response = await fetch("http://localhost:3000/api/company/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || "E-mail ou senha inválidos");
  }

  const data = await response.json();
  return data.token;
};

// (Opcional) Função de registro: para cadastro de empresa
export const register = async (
  nome: string,
  cnpj: string,
  email: string,
  senha: string
): Promise<void> => {
  const response = await fetch("http://localhost:3000/api/company/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, cnpj, email, senha }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || "Erro ao registrar empresa");
  }
};