## Decisões Técnicas - Backend

### 1. Models

Criei os models para representar uma conversa, pensei no chats que já utilizei para falar com algum atendente ou admin de algum sistema para reporta um problema ou tirar dúvidas.

A lógica que pensei foi a seguinte

1. "Beleza, um usuário vai poder abrir um chat com determinado título (isso vai ajudar o admin a ter um conhecimento prévio sobre o que vai abordado naquela sala)
2. Eu tenho que disparar um trigger de mensagem automática assim que o usuário manda a primeira mensagem para ele não ficar no vácuo.
3. O admin responderá assim que tiver tempo aquele chat, e ele poderá ter acesso a todas as conversas que os usuários criarem. (Então existe 2 tipos de usuário [admin, usuario])

### Conversa

Representa um chat iniciado por um usuário comum.

- Cada conversa pertence a usuário em específico.
- Guarda título, status (fechada ou não) e data de criação.
- O fechamento seria o Admin encerrar aquele chat como (problema resolvido).

### Mensagem

Armazena cada mensagem enviada no chat:

- FK para Conversa
- FK para User
- Campo opcional para imagem (Se o usuário quiser mandar um print do problema que está relatando ou de algo que tenha dúvida)
- Flag `bot` para mensagens automáticas criada pelo próprio usuário mas com uma assinatura diferente que é mandada assim que é verificado se é a primeira mensagem do chat enviada. (99% dos casos o usuário que vai iniciar uma conversa, então assim que ele mandar a primeira mensagem, dispara a mensagem de "entraremos em retorno")

### 2. Permissão baseada no usuário

Defini as permissõoes

- Usuário comum: só pode ver e enviar mensagens das suas próprias conversas.
- Admin (is_staff=True): vê e responde TODAS as conversas.

---

### 3. SimplesJWT para autenticação

Usado autentição para buscar no banco as conversas e mensagens específicas de cada usuário.

### 4. Serializers com campo tipo para o frontend

Para facilitar um pouco no backend foi definido a assinatura/tipo da mensagem para destinguir a diferença de cada mensagem:

- `"meu_usuario"`
- `"outro_usuario"`
- `"bot"`

## Alguns campos foram colocados como read_only apenas para que não sejam alterados pois quero a proteção deles e não interferê

### 5. Organização de pastas:

Tive uma experiência melhor na faculdade, meu professor que ministrou a matéria de Desenvolvimento Web informou boas condutas na aplicação backend com django (ele é senior nisso e passa vários bizu na aula)
Uma delas foi a organização de diretórios e rotas por versão, para não acabar prejudicando usuários que utilizam uma versão antiga quando uma nova surgir, visando isso criei uma pasta para guardar todas as versões da API ("backend/chat/api/") aqui estará as pastas com todas as versões que o sistema vier a atualiz

---

- Uma melhoria a se colocar realmente seria a implementação de um websocket, não sabia muito como funciona mas pesquisei sobre, se chama django channels, uma boa melhoria seria aplicar futuramente nesse projeto para que ele se torne um chat realtime
- Com a melhoria passada poderia ser implementada mais coisas como notificações de mensagens novas, mensagens visualizadas, e por ai vai.
- Aberto a ouvir mais melhorias

---
