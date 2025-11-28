# 🚀 ERP Consolidado - API REST

API REST consolidada que integra 4 APIs em uma única aplicação, seguindo a arquitetura de **Controller → Service → Repository** com **PostgreSQL** como banco de dados.

## 📊 Banco de Dados

**PostgreSQL** com ORM **Sequelize** - Totalmente configurado e pronto para produção.

## 📋 Módulos Integrados

### 1. **Módulo Cursos** (erp-curso-1)

- ✅ Alunos
- ✅ Professores
- ✅ Turmas
- ✅ Matrículas

### 2. **Módulo Produtos** (erp-curso-2)

- ✅ Produtos
- ✅ Clientes
- ✅ Pedidos

### 3. **Módulo Áreas de Conhecimento** (erp-curso-3)

- ✅ Áreas de Conhecimento

### 4. **Módulo Classes** (erp-curso-4)

- ✅ Estudantes
- ✅ Classes
- ✅ Aulas

## 🏗️ Arquitetura

```
src/
├── config/            # Configuração do banco de dados
├── controllers/        # Controladores (tratamento de requisições)
├── services/           # Serviços (lógica de negócio)
├── repositories/       # Repositórios (acesso a dados - Sequelize)
├── middlewares/        # Middlewares (autenticação, logs, tratamento de erros)
├── routes/            # Rotas (definição de endpoints)
├── models/            # Modelos (Sequelize ORM)
├── seeds/             # Seeds para popular banco
├── utils/             # Utilitários
└── server.js          # Servidor principal
```

## 🚀 Como Iniciar

### Pré-requisitos

- Node.js >= 14.x
- npm ou yarn
- **PostgreSQL >= 12.x** instalado e rodando

### Instalação

1. **Clonar o repositório**

```bash
git clone <repo-url>
cd erp-consolidado
```

2. **Criar banco de dados PostgreSQL**

```bash
# Via pgAdmin ou linha de comando
createdb -U postgres erp_consolidado

# Ou via psql
psql -U postgres -c "CREATE DATABASE erp_consolidado;"
```

3. **Instalar dependências**

```bash
npm install
```

4. **Configurar variáveis de ambiente**

```bash
cp .env.example .env
```

Edite `.env` e configure as credenciais do PostgreSQL:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=sua_chave_secreta_muito_segura_aqui
JWT_EXPIRATION=7d

# Database PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=erp_consolidado
DB_USER=postgres
DB_PASSWORD=postgres
```

5. **Iniciar o servidor**

**Modo desenvolvimento:**

```bash
npm run dev
```

O servidor vai:

- ✅ Sincronizar os modelos com PostgreSQL
- ✅ Autenticar com o banco de dados
- ✅ Estar pronto para requisições

**Modo produção:**

```bash
npm start
```

### ✨ Populando o Banco com Dados Iniciais

Após a primeira inicialização, execute os seeds:

```bash
npm run seed
```

Isso vai criar dados de exemplo para testar todos os endpoints.

### 🔧 Scripts Disponíveis

```bash
npm run dev          # Inicia em modo desenvolvimento (com hot reload)
npm start            # Inicia em modo produção
npm run seed         # Popula banco com dados de teste
npm run db:sync      # Sincroniza modelos com PostgreSQL
npm run test         # Executa testes
npm run lint         # Valida e formata código
npm run setup        # Setup completo (bash script)
```

O servidor estará disponível em: `http://localhost:3000`

## 📚 Endpoints da API

### Health Check

```http
GET /health
```

### Autenticação

```
POST   /api/auth/register       # Registrar novo usuário
POST   /api/auth/login          # Login
GET    /api/auth/profile        # Obter perfil (requer token)
```

### Alunos (Módulo Cursos)

```
GET    /api/alunos              # Listar todos os alunos
POST   /api/alunos              # Criar novo aluno
GET    /api/alunos/:id          # Obter aluno por ID
PUT    /api/alunos/:id          # Atualizar aluno
DELETE /api/alunos/:id          # Deletar aluno
GET    /api/alunos/:id/classes  # Obter classes do aluno
```

### Professores (Módulo Cursos)

```
GET    /api/professores         # Listar todos os professores
POST   /api/professores         # Criar novo professor
GET    /api/professores/:id     # Obter professor por ID
PUT    /api/professores/:id     # Atualizar professor
DELETE /api/professores/:id     # Deletar professor
GET    /api/professores/:id/classes  # Obter classes do professor
```

### Turmas (Módulo Cursos)

```
GET    /api/turmas              # Listar todas as turmas
POST   /api/turmas              # Criar nova turma
GET    /api/turmas/:id          # Obter turma por ID
PUT    /api/turmas/:id          # Atualizar turma
DELETE /api/turmas/:id          # Deletar turma
GET    /api/turmas/:id/students # Obter estudantes da turma
```

### Matrículas (Módulo Cursos)

```
GET    /api/matriculas          # Listar todas as matrículas
POST   /api/matriculas          # Criar nova matrícula
GET    /api/matriculas/:id      # Obter matrícula por ID
PUT    /api/matriculas/:id      # Atualizar matrícula
DELETE /api/matriculas/:id      # Deletar matrícula
GET    /api/matriculas/aluno/:alunoId     # Matrículas do aluno
GET    /api/matriculas/turma/:turmaId     # Matrículas da turma
```

### Produtos (Módulo Produtos)

```
GET    /api/products            # Listar todos os produtos
POST   /api/products            # Criar novo produto
GET    /api/products/:id        # Obter produto por ID
PUT    /api/products/:id        # Atualizar produto
DELETE /api/products/:id        # Deletar produto
GET    /api/products/category/:category  # Produtos por categoria
```

### Clientes (Módulo Produtos)

```
GET    /api/clients             # Listar todos os clientes
POST   /api/clients             # Criar novo cliente
GET    /api/clients/:id         # Obter cliente por ID
PUT    /api/clients/:id         # Atualizar cliente
DELETE /api/clients/:id         # Deletar cliente
GET    /api/clients/active      # Listar clientes ativos
```

### Pedidos (Módulo Produtos)

```
GET    /api/orders              # Listar todos os pedidos
POST   /api/orders              # Criar novo pedido
GET    /api/orders/:id          # Obter pedido por ID
PUT    /api/orders/:id          # Atualizar pedido
DELETE /api/orders/:id          # Deletar pedido
GET    /api/orders/client/:clientId  # Pedidos do cliente
PATCH  /api/orders/:id/status   # Atualizar status do pedido
```

### Áreas de Conhecimento

```
GET    /api/areas               # Listar todas as áreas
POST   /api/areas               # Criar nova área
GET    /api/areas/:id           # Obter área por ID
PUT    /api/areas/:id           # Atualizar área
DELETE /api/areas/:id           # Deletar área
```

### Estudantes (Módulo Classes)

```
GET    /api/students            # Listar todos os estudantes
POST   /api/students            # Criar novo estudante
GET    /api/students/:id        # Obter estudante por ID
PUT    /api/students/:id        # Atualizar estudante
DELETE /api/students/:id        # Deletar estudante
GET    /api/students/:id/classes # Classes do estudante
```

### Classes (Módulo Classes)

```
GET    /api/classes             # Listar todas as classes
POST   /api/classes             # Criar nova classe
GET    /api/classes/:id         # Obter classe por ID
PUT    /api/classes/:id         # Atualizar classe
DELETE /api/classes/:id         # Deletar classe
GET    /api/classes/teacher/:teacherId # Classes do professor
```

### Aulas (Módulo Classes)

```
GET    /api/lessons             # Listar todas as aulas
POST   /api/lessons             # Criar nova aula
GET    /api/lessons/:id         # Obter aula por ID
PUT    /api/lessons/:id         # Atualizar aula
DELETE /api/lessons/:id         # Deletar aula
GET    /api/lessons/class/:classId      # Aulas da classe
GET    /api/lessons/teacher/:teacherId  # Aulas do professor
```

## 🔐 Autenticação

A API utiliza **JWT (JSON Web Tokens)** para autenticação. Para usar endpoints protegidos:

1. **Faça login:**

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "sua_senha"
}
```

2. **Use o token retornado:**

```bash
Authorization: Bearer <seu_token_aqui>
```

## 📦 Dependências

- **express**: Framework web
- **cors**: Habilitador de CORS
- **helmet**: Segurança HTTP
- **bcryptjs**: Hash de senhas
- **jsonwebtoken**: Autenticação JWT
- **joi**: Validação de dados
- **uuid**: Geração de IDs
- **dotenv**: Variáveis de ambiente

## 🧪 Testes

```bash
npm test
```

## 🔄 Scripts Disponíveis

```bash
npm start           # Iniciar servidor em produção
npm run dev         # Iniciar servidor em desenvolvimento (com nodemon)
npm test            # Executar testes
npm run lint        # Verificar linting
npm run lint:fix    # Corrigir problemas de linting
```

## 📝 Estrutura de Dados

### Usuário (Autenticação)

```json
{
  "id": 1,
  "email": "usuario@example.com",
  "nome": "Nome do Usuário",
  "role": "admin|user|professor|student"
}
```

### Aluno

```json
{
  "id": 1,
  "matricula": "2024001",
  "nome": "João Silva",
  "email": "joao@example.com",
  "telefone": "11999999999"
}
```

### Professor

```json
{
  "id": 1,
  "matricula": "PROF001",
  "nome": "Dr. Carlos",
  "email": "carlos@example.com",
  "telefone": "11988888888",
  "especialidade": "Matemática"
}
```

### Produto

```json
{
  "id": 1,
  "name": "Produto X",
  "description": "Descrição do produto",
  "code": "PROD001",
  "category": "Eletrônicos",
  "price": 99.99,
  "stock": 10,
  "active": true
}
```

### Cliente

```json
{
  "id": 1,
  "nome": "Cliente Ltda",
  "email": "cliente@example.com",
  "cpf": "12345678900",
  "telefone": "1133333333",
  "endereco": "Rua Principal, 123",
  "cidade": "São Paulo",
  "active": true
}
```

## 🚨 Tratamento de Erros

Todos os erros seguem este padrão:

```json
{
  "status": "error",
  "message": "Descrição do erro"
}
```

## 📄 Licença

MIT

## 👨‍💻 Autor

Lorenzo Pandolfo

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, siga os padrões de código estabelecidos.
