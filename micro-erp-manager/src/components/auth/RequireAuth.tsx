import React, { ReactNode, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { token } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        {showRegister ? (
          <>
            <RegisterForm />
            <button
              className="mt-4 text-blue-600 underline"
              onClick={() => setShowRegister(false)}
            >
              Já tem conta? Entrar
            </button>
          </>
        ) : (
          <>
            <LoginForm />
            <button
              className="mt-4 text-blue-600 underline"
              onClick={() => setShowRegister(true)}
            >
              Não tem conta? Cadastre-se
            </button>
          </>
        )}
      </div>
    );
  }

  return <>{children}</>;
};

export default RequireAuth;