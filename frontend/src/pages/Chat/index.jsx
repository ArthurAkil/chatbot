import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/useAuth";
import api from "../../services/api";
import "./styles.css";

function Chat() {
  const { logout } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Função para buscar as conversas na API
    const fetchConversations = async () => {
      try {
        const response = await api.get("/api/conversas/");
        setConversations(response.data);
        setLoading(false);
      } catch (err) {
        setError("Não foi possível carregar as conversas.");
        setLoading(false);
        console.error(err);
      }
    };

    fetchConversations();
  }, []); // O array vazio faz com que isso rode apenas uma vez, quando o componente é montado

  return (
    <div className="chat-container">
      <aside className="sidebar">
        <header className="sidebar-header">
          <h2>Conversas</h2>
          <button onClick={logout} className="logout-button">
            Sair
          </button>
        </header>
        <div className="conversations-list">
          {loading && <p>Carregando...</p>}
          {error && <p className="error-message">{error}</p>}
          {conversations.map((conv) => (
            <div key={conv.id} className="conversation-item">
              {conv.titulo
                ? `${conv.titulo} - ${conv.id}`
                : `Conversa ${conv.id}`}
            </div>
          ))}
        </div>
      </aside>
      <main className="chat-main">
        <h1>Selecione uma conversa para começar</h1>
      </main>
    </div>
  );
}

export default Chat;
