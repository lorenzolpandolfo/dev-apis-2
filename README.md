# API Trabalho 2

## Setup

Instalação das dependências e iniciando banco de dados Postgresql

```bash
cd erp-consolidado
npm install
docker compose up -d
```

## Rodando

Iniciando projeto

```bash
cd src
node server.js
```

Agora, a API estará online no endereço `localhost:3000`

## 📊 Banco de Dados

**PostgreSQL** com ORM **Sequelize** - Totalmente configurado e pronto para produção.

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

## 🔄 Fluxo da API - MVC + Repository

A API segue um padrão em camadas bem definido. Cada requisição passa por todas essas camadas:

```
┌─ Request HTTP (Cliente)
│
├─ Routes (Definem endpoints)
│
├─ Middlewares (Autenticação, logs, erros)
│
├─ Controllers (Recebem requisição, chamam serviços)
│        ↓
│   Validação básica
│
├─ Services (Lógica de negócio)
│        ↓
│   Validações complexas
│   Regras de negócio
│   Orquestração de dados
│
├─ Repositories (Acesso a dados)
│        ↓
│   Operações de CRUD
│   Queries customizadas
│
├─ Models (Sequelize ORM)
│        ↓
│   Estrutura e relacionamentos
│
└─ Response JSON (Volta ao Cliente)
```

## 🎛️ Controllers

**Responsabilidade:** Receber requisições HTTP e coordenar a resposta.

- Extraem dados de `req.body`, `req.params` e `req.query`
- Fazem validações básicas (campos obrigatórios)
- Chamam os services
- Formatam e retornam respostas JSON
- Definem status HTTP apropriados

**Controllers disponíveis:**

| Controller                     | Módulo       | Responsável Por                     |
| ------------------------------ | ------------ | ----------------------------------- |
| `AuthController`               | Autenticação | Login, Registro, Validação de token |
| `AlunoController`              | Cursos       | Alunos (CRUD)                       |
| `ProfessorController`          | Cursos       | Professores (CRUD)                  |
| `TurmaController`              | Cursos       | Turmas (CRUD)                       |
| `MatriculaController`          | Cursos       | Matrículas (CRUD e relacionamentos) |
| `AreaDeConhecimentoController` | Áreas        | Áreas de Conhecimento (CRUD)        |
| `StudentController`            | Classes      | Estudantes (CRUD)                   |
| `ClassController`              | Classes      | Classes (CRUD)                      |
| `LessonController`             | Classes      | Aulas (CRUD)                        |

## 💼 Services - Lógica de Negócio

**Responsabilidade:** Implementar regras de negócio e validações complexas.

Cada service contém a inteligência da aplicação. Algumas regras implementadas:

### 📋 Regras de Negócio por Módulo

#### Módulo Cursos

- **Alunos**: Matrícula e email únicos; validação de dados obrigatórios
- **Professores**: Matrícula e email únicos; apenas um professor por email
- **Turmas**: Necessita de professor responsável
- **Matrículas**:
  - Aluno e turma devem existir
  - Um aluno não pode ser matriculado duas vezes na mesma turma
  - Data da matrícula é registrada automaticamente
  - Status padrão é "ativa"

#### Módulo Áreas

- **Áreas de Conhecimento**:
  - Nome e descrição obrigatórios
  - Nomes únicos na base de dados

#### Módulo Classes

- **Estudantes**:
  - Matrícula, nome, email e telefone obrigatórios
  - Email e matrícula únicos
- **Classes**:
  - Nome e professor obrigatórios
  - Datas de início e fim opcionais
- **Aulas**:
  - Vinculadas a uma classe
  - Relacionadas com professores

## 📊 Validation & Error Handling

### Validações em Camadas

```
1️⃣ Controllers: Validações básicas (campos obrigatórios)
   ↓
2️⃣ Services: Lógica complexa (duplicação, relacionamentos)
   ↓
3️⃣ Middlewares: Erro genérico capturado
```

### Exemplo de Erro Tratado

```javascript
// Service lança erro com mensagem clara
if (existing) {
  throw new Error("Email já cadastrado");
}

// Controller captura e retorna com status apropriado
catch (error) {
  res.status(400).json({
    status: "error",
    message: error.message
  });
}
```

## 📚 Endpoints da API

### Health Check

```http
GET /health
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

## 🚨 Tratamento de Erros

Todos os erros seguem este padrão:

```json
{
  "status": "error",
  "message": "Descrição do erro"
}
```
