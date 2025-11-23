import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/useAuth";
import api from "../../services/api";
import "./styles.css";

function Chat() {
  const { logout } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeConversation, setActiveConversation] = useState(null);
  const [newMessage, setNewMessage] = useState(""); // Estado para a nova mensagem

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
  }, []); // o array vazio faz com que isso rode apenas uma vez, quando o componente é montado

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversation) return;

    const messageData = {
      conteudo: newMessage,
      conversa: activeConversation.id,
    };

    try {
      // Envia a msg para a API
      const response = await api.post("/api/mensagens/", messageData);
      const sentMessage = response.data;

      // Atualiza o estado para mostrar a nova mensagem instantaneamente
      const updatedConversations = conversations.map((conv) => {
        if (conv.id === activeConversation.id) {
          return { ...conv, mensagens: [...conv.mensagens, sentMessage] };
        }
        return conv;
      });
      setConversations(updatedConversations);
      setActiveConversation(
        updatedConversations.find((c) => c.id === activeConversation.id)
      );
      setNewMessage(""); // Limpa o input
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
    }
  };

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
          {conversations.map((conv) => {
            const isActive = activeConversation?.id === conv.id;
            return (
              <div
                key={conv.id}
                className={`conversation-item ${isActive ? "active" : ""}`}
                onClick={() => setActiveConversation(conv)}
              >
                {conv.titulo
                  ? `${conv.titulo} - ${conv.id}`
                  : `Conversa ${conv.id}`}
              </div>
            );
          })}
        </div>
      </aside>
      <main className="chat-main">
        {activeConversation ? (
          <>
            <div className="messages-list">
              {activeConversation.mensagens.map((msg) => (
                <div key={msg.id} className={`message-item ${msg.tipo}`}>
                  <div className="message-content">
                    <p>{msg.conteudo}</p>
                    <span className="message-time">
                      {new Date(msg.data_envio).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <form className="chat-input-form" onSubmit={handleSendMessage}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
              />
              <button type="submit" disabled={!newMessage.trim()}>
                Enviar
              </button>
            </form>
          </>
        ) : (
          <h1>Selecione uma conversa para começar</h1>
        )}
      </main>
    </div>
  );
}

export default Chat;
