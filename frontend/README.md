## Decisões Técnicas - Frontend

Este documento detalha as principais decisões de arquitetura e tecnologia tomadas durante o desenvolvimento da interface do chatbot.

### 1. Gerenciamento de Estado com Hooks

Optei por usar os Hooks nativos do React.

- `useState`: É o principal hook utilizado para gerenciar o estado local dos componentes, como a lista de conversas(conversations), a conversa ativa (activeConversation), o conteúdo de novas mensagens(newMessage), e o estado de carregamento(loading) e erros(error).

- `useEffect`: usei para:

  1.  Buscar os dados conversas da API.
  2.  Acionar a rolagem automática da tela sempre que uma nova mensagem.

- `useRef`: Criar um ponto de referência direta do final da página, serve para ajudar diretamente a rolagem automática.

---

### 2. Autenticação e Context API

- `AuthContext`: Controlar as informações do usuário, se está logado ou não, e servir para os componentes que precisem saber dessa info.

- `useAuth` (Hook Customizado): Achei essa estrátegia em um fórum como uma forma mais limpa para o acesso ao contexto.

---

### 3. Comunicação com a API e Experiência do Usuário

- Axios: A biblioteca `axios` foi escolhida para fazer as requisições HTTP para o backend Django. Uma instância do axios foi configurada para incluir automaticamente a URL base da API e o token de autenticação JWT nos cabeçalhos, centralizando e simplificando as chamadas em toda a aplicação.

---

### 4. Melhorias Futuras

- Real-Time com WebSockets

- Paginação ou "Scroll Infinito"

- Testes Unitários

---
