import { createContext, useState } from "react";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return {
      id_usuario: localStorage.getItem("sessionId"),
      nome: localStorage.getItem("sessionNome"),
      email: localStorage.getItem("sessionEmail"),
    };
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}