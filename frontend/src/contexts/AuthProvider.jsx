import React, { useState, useEffect } from "react";
import api from "../services/api";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Roda uma única vez quando o componente é montado
  useEffect(() => {
    async function loadStorageData() {
      const storedToken = localStorage.getItem("@App:token");

      if (storedToken) {
        // aloca o token
        api.defaults.headers.Authorization = `Token ${storedToken}`;
        setUser({ token: storedToken });
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  const login = (token) => {
    localStorage.setItem("@App:token", token);
    api.defaults.headers.Authorization = `Token ${token}`;
    // atualiza o estado para indicar que o usuário está logado
    setUser({ token });
  };

  const logout = () => {
    // limpa localStorage (token)
    localStorage.removeItem("@App:token");
    api.defaults.headers.Authorization = undefined;
    setUser(null);
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
