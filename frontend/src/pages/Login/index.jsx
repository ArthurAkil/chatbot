import React, { useState } from "react";
import "./styles.css";
import api from "../../services/api"; // axios
import { useAuth } from "../../contexts/useAuth"; // hook

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); //função de login do contexto

  const handleSubmit = async (event) => {
    event.preventDefault(); // impede o recarregamento da página

    try {
      const response = await api.post("/auth/", {
        username: username,
        password: password,
      });

      login(response.data.token);
    } catch (error) {
      console.error("Falha no login:", error);
      alert("Erro ao fazer login. Verifique seu usuário e senha.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
