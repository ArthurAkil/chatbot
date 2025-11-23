import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/useAuth";
import api from "../../services/api";
import "./styles.css";

function Chat() {
  const { logout } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeConversation, setActiveConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // visibilidade do modal
  const [newConversationTitle, setNewConversationTitle] = useState("");
  const messagesEndRef = useRef(null); // fazer os scroll ir automaticamente para baixo (msgs atuais)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.mensagens]); // Sempre que há uma mensagem nova roda lá pra baxio

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

  const handleCreateConversation = async (e) => {
    e.preventDefault();
    if (!newConversationTitle.trim()) return;

    try {
      // Envia o título para a API criar a conversa
      const response = await api.post("/api/conversas/", {
        titulo: newConversationTitle,
      });
      const newConversation = response.data;

      // Adiciona a nova conversa no topo da lista e a define como ativa.
      setConversations([newConversation, ...conversations]);
      setActiveConversation(newConversation);

      setIsModalOpen(false);
      setNewConversationTitle("");
    } catch (err) {
      setError(
        "Não foi possível criar uma nova conversa. Tente novamente mais tarde."
      );
      console.error(err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversation) return;

    const messageData = {
      conteudo: newMessage,
      conversa: activeConversation.id,
    };

    try {
      // Envia a nova mensagem para a API
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
      setNewMessage(""); // Limpa input
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
    }
  };

  return (
    <div className="chat-container">
      <aside className="sidebar">
        <header className="sidebar-header">
          <div className="sidebar-title-container">
            <h2>Conversas</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="new-convo-button"
              title="Nova Conversa"
            >
              +
            </button>
          </div>
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
              {/* usado um referencia para mostrar onde é "em baixo" */}
              <div ref={messagesEndRef} />
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

      {/* Modal para criar nova conversa */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Criar Nova Conversa</h2>
            <form onSubmit={handleCreateConversation}>
              <input
                type="text"
                value={newConversationTitle}
                onChange={(e) => setNewConversationTitle(e.target.value)}
                placeholder="Digite o título da conversa..."
                autoFocus
              />
              <div className="modal-actions">
                <button type="button" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </button>
                <button type="submit">Criar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
