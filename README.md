# Chatbot - Sistema CRUD de atendimento simulado.

Antes de tudo é necessário informar que esse sistema não utiliza websockets, não oferecendo um sistema de chat REAL TIME aplicado em sistemas atuais e sim uma representação com meu conhecimento em como ele funciona. A atualização de mensagens deve ser feita recarregando a página ou apertando F5.

#### Esse README está com informações do backend e frontend e como iniciar o Projeto na sua maquina. Explicações sobre as decisões feitas sobre o projeto estão no readme de cada diretório.

## Backend (Django + DRF + JWT)

Este é o backend de um sistema de chat simples, desenvolvido com **Django**, **Django REST Framework** e **JWT** para autenticação.
O objetivo é fornecer uma API limpa para ser consumida pelo frontend, com foco em conversas entre usuários e administradores.

### Tecnologias Utilizadas

- Python 3
- Django
- Django REST Framework
- SimpleJWT (autenticação por token)
- python-dotenv para variáveis de ambiente

### 📁 Estrutura Geral

A API possui:

- Rotas de login (JWT)
- CRUD de Conversas
- CRUD de Mensagens
- Filtro automático:
  - Usuário comum vê apenas suas conversas.
  - Admin (is_staff=True) vê todas e pode mandar mensagem para todas.

### 🔐 Autenticação

A autenticação usa JWT e é verificado no front o usuário e senha criado.

### 📦 Como Rodar o Projeto

### 1. Clonar

```
git clone https://github.com/ArthurAkil/chatbot.git
cd chatbot
cd backend
```

### 2. Ambiente Virtual

```
python -m venv venv
source venv/bin/activate      # Linux/Mac
. venv/Scripts/activate       # Windows (VSCODE)
.venv\Scripts\activate.bat    # Windows (CMD)
```

### 3. Instalar Dependências

```
pip install -r requirements.txt
```

### 🔧 Configuração do .env

O projeto inclui `dotenv`. Renomeie para `.env` e altere a chave:

```
SECRET_KEY="ME MUDE"
```

### 🗄️ Banco de Dados

Para garantir que tudo está setado, realize:

```
python manage.py makemigrations
python manage.py migrate
```

### 👤 Crie os usuários

Existe um script próprio para criar dois usuários. Um usuário teste e um admin

#### Esse comando funciona pelo terminal do vscode.

```
python manage.py shell

exec(open("utils/criar_perfis.py").read())
```

Agora existe dois perfis no banco:

```
usuario 1: user=UsuarioTeste, password=userpassword123

superuser: user=admin, password=admin
```

#### Obs.: Caso não funcione crie o superuser utilizando "python manage.py createsuperuser" e crie um usuário normal no http://127.0.0.1:8000/admin

### ▶️ Rodar Servidor

```
python manage.py runserver
```

## Frontend

## Pré-requisitos

Antes de começar, certifique-se de que você tem o seguinte software instalado em sua máquina:

- [Node.js](https://nodejs.org/en/) (versão 16.x ou superior)
- [npm](https://www.npmjs.com/) (geralmente vem instalado com o Node.js) ou [Yarn](https://yarnpkg.com/)

## ⚙️ Configuração do Ambiente

**Importante:** A URL `http://127.0.0.1:8000` é o endereço padrão do servidor Django (backend). Se o seu backend estiver rodando em uma porta ou endereço diferente, ajuste esta linha de acordo.

```
Altere em services/api.js
baseURL: "http://127.0.0.1:8000/"
```

## 🚀 Instalação e Execução

Siga os passos abaixo para instalar as dependências e rodar o projeto em modo de desenvolvimento.

1.  **Navegue até o diretório do frontend:**

    ```bash
    cd frontend
    ```

2.  **Instale as dependências do projeto:**

    ```bash
    npm install
    ```

    _(ou `yarn install` se você utiliza o Yarn)_

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

Após executar o comando, abra em seu navegador com a aplicação rodando em `http://localhost:5173/`.

---
