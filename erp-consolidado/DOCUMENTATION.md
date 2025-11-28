# 📖 Documentação Técnica - ERP Consolidado

## 🏗️ Arquitetura da Aplicação

### Padrão MVC + Repository

A aplicação segue o padrão de arquitetura em camadas:

```
Request (Cliente)
    ↓
Routes (Rotas)
    ↓
Controllers (Controladores)
    ↓
Services (Serviços)
    ↓
Repositories (Repositórios)
    ↓
Models (Dados/DataStore)
    ↓
Response (Resposta JSON)
```

### Fluxo de uma Requisição

1. **Requisição chega** nas rotas
2. **Middlewares** processam (autenticação, logs, etc)
3. **Controlador** recebe e valida básico
4. **Serviço** executa lógica de negócio
5. **Repositório** acessa os dados
6. **Resposta** é retornada em JSON

---

## 📁 Estrutura de Diretórios

```
src/
├── controllers/        # Tratam requisições HTTP
├── services/          # Contêm lógica de negócio
├── repositories/      # Gerenciam acesso a dados
├── middlewares/       # Processam requisições
├── routes/           # Definem endpoints
├── models/           # Estrutura de dados
├── utils/            # Funções utilitárias
├── server.js         # Arquivo principal
└── index.js          # Exports dos módulos
```

---

## 🎛️ Componentes Principais

### Controllers (Controladores)

**Responsabilidades:**

- Receber requisições HTTP
- Validar dados básicos
- Chamar serviços
- Formatar e retornar respostas

**Exemplo:**

```javascript
class AlunoController {
  async create(req, res) {
    try {
      const { matricula, nome, email } = req.body;
      const aluno = await AlunoService.createStudent({
        matricula,
        nome,
        email,
      });
      res.status(201).json({
        status: "success",
        data: aluno,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }
}
```

### Services (Serviços)

**Responsabilidades:**

- Implementar lógica de negócio
- Validações complexas
- Chamar repositórios
- Tratamento de regras de negócio

**Exemplo:**

```javascript
class AlunoService {
  async createStudent(alunoData) {
    const { matricula, nome, email } = alunoData;

    // Validações
    if (!matricula || !nome || !email) {
      throw new Error("Matrícula, nome e email são obrigatórios");
    }

    // Verificar duplicatas
    const existing = await AlunoRepository.findByEmail(email);
    if (existing) {
      throw new Error("Email já cadastrado");
    }

    // Criar e retornar
    return await AlunoRepository.create(alunoData);
  }
}
```

### Repositories (Repositórios)

**Responsabilidades:**

- Acessar dados
- Operações CRUD
- Consultas específicas
- Abstração da camada de dados

**Exemplo:**

```javascript
class AlunoRepository extends BaseRepository {
  constructor() {
    super("alunos");
  }

  async findByEmail(email) {
    return this.findOneBy("email", email);
  }

  async findByMatricula(matricula) {
    return this.findOneBy("matricula", matricula);
  }
}
```

### BaseRepository

Fornece operações CRUD genéricas:

- `create(data)` - Criar registro
- `findAll()` - Listar todos
- `findById(id)` - Obter por ID
- `findOneBy(key, value)` - Busca única
- `findManyBy(key, value)` - Busca múltipla
- `update(id, updates)` - Atualizar
- `delete(id)` - Deletar

### Middlewares (Middlewares)

**Tipos:**

1. **authMiddleware** - Validar JWT
2. **authorizationMiddleware** - Verificar permissões
3. **requestLogger** - Registrar requisições
4. **errorHandler** - Tratamento de erros global

---

## 🔐 Fluxo de Autenticação

### 1. Registro

```
POST /api/auth/register
→ AuthService.register()
→ Hash senha com bcryptjs
→ Salvar usuário
→ Retornar usuário (sem senha)
```

### 2. Login

```
POST /api/auth/login
→ AuthService.login()
→ Buscar usuário por email
→ Verificar senha com bcryptjs
→ Gerar JWT token
→ Retornar token
```

### 3. Requisição Protegida

```
GET /api/alunos (com header Authorization)
→ authMiddleware (valida JWT)
→ req.user é preenchido
→ Controller é executado
```

---

## 📊 Modelos de Dados

### Usuário

```javascript
{
  id: Number,
  email: String (unique),
  password: String (hashed),
  nome: String,
  role: String ('admin', 'user', 'professor', 'student')
}
```

### Aluno

```javascript
{
  id: Number,
  matricula: String (unique),
  nome: String,
  email: String (unique),
  telefone: String
}
```

### Professor

```javascript
{
  id: Number,
  matricula: String (unique),
  nome: String,
  email: String (unique),
  telefone: String,
  especialidade: String
}
```

### Turma

```javascript
{
  id: Number,
  nome: String,
  professorId: Number,
  areaDeConhecimentoId: Number,
  descricao: String,
  horario: String,
  dataCriacao: String
}
```

### Matrícula

```javascript
{
  id: Number,
  alunoId: Number,
  turmaId: Number,
  dataEnrollment: String,
  status: String ('ativa', 'concluída', 'cancelada')
}
```

### Produto

```javascript
{
  id: Number,
  name: String,
  description: String,
  code: String (unique),
  category: String,
  price: Number,
  stock: Number,
  active: Boolean,
  createdAt: String
}
```

### Cliente

```javascript
{
  id: Number,
  nome: String,
  email: String (unique),
  cpf: String (unique),
  telefone: String,
  endereco: String,
  cidade: String,
  active: Boolean,
  createdAt: String
}
```

### Pedido

```javascript
{
  id: Number,
  clientId: Number,
  items: Array[{
    productId: Number,
    quantidade: Number,
    precoUnitario: Number,
    subtotal: Number
  }],
  valorTotal: Number,
  desconto: Number,
  valorFinal: Number,
  status: String ('pendente', 'enviado', 'entregue'),
  createdAt: String
}
```

### Área de Conhecimento

```javascript
{
  id: Number,
  nome: String,
  descricao: String
}
```

### Estudante

```javascript
{
  id: Number,
  registration: String (unique),
  name: String,
  email: String (unique),
  phone: String
}
```

### Class

```javascript
{
  id: Number,
  name: String,
  teacherId: Number,
  description: String,
  startDate: String,
  endDate: String,
  createdAt: String
}
```

### Aula

```javascript
{
  id: Number,
  classId: Number,
  teacherId: Number,
  title: String,
  date: String,
  duration: Number,
  content: String,
  createdAt: String
}
```

---

## 🔄 Padrões de Resposta

### Sucesso

```json
{
  "status": "success",
  "message": "Descrição da ação",
  "data": {
    /* conteúdo */
  }
}
```

### Erro

```json
{
  "status": "error",
  "message": "Descrição do erro"
}
```

### Lista

```json
{
  "status": "success",
  "data": [
    /* array de objetos */
  ]
}
```

---

## 🧪 Injeção de Dependência

A aplicação usa um padrão simplificado de DI:

```javascript
// Repositório é instanciado como singleton
class AlunoRepository extends BaseRepository {
  constructor() {
    super("alunos");
  }
}
module.exports = new AlunoRepository();

// Serviço injeta repositório
class AlunoService {
  async createStudent(data) {
    return await AlunoRepository.create(data);
  }
}
module.exports = new AlunoService();

// Controlador injeta serviço
class AlunoController {
  async create(req, res) {
    const aluno = await AlunoService.createStudent(req.body);
    // ...
  }
}
```

---

## 🛡️ Segurança

### 1. Autenticação JWT

- Tokens gerados com `jsonwebtoken`
- Expiração configurável (padrão: 7 dias)
- Validação em middlewares

### 2. Hash de Senhas

- Bcryptjs com salt rounds 10
- Senhas nunca são retornadas
- Comparação segura ao login

### 3. CORS

- Configurado com `cors`
- Aceita requisições de qualquer origem (customizável)

### 4. Headers de Segurança

- `helmet` adiciona headers de segurança
- Protection contra XSS, clickjacking, etc

### 5. Validação de Dados

- Validação básica em controllers
- Validação de negócio em services
- Joi disponível para schemas complexos

---

## 🔍 Tratamento de Erros

### Hierarquia de Tratamento

1. **Validação em Controller** (400)
2. **Lógica de Negócio em Service** (400/404)
3. **Erro Genérico em Middleware** (500)

### Exemplo

```javascript
// Service
if (!email || !password) {
  throw new Error("Email e senha são obrigatórios"); // 400
}

// Controller
try {
  const user = await AuthService.login(email, password);
  res.json(user);
} catch (error) {
  res.status(400).json({
    status: "error",
    message: error.message,
  });
}

// Middleware
app.use(errorHandler); // Para erros não capturados
```

---

## 📝 Logging

### Padrão

```
[ISO_DATE] METHOD ENDPOINT - Status: CODE - DURATIONms
```

### Exemplo

```
[2024-01-15T10:30:45.123Z] POST /api/auth/login - Status: 200 - 45ms
[2024-01-15T10:30:50.456Z] GET /api/alunos - Status: 200 - 12ms
[2024-01-15T10:31:00.789Z] POST /api/products - Status: 201 - 23ms
```

---

## 🚀 Performance

### Otimizações

- Campos sem validação em Repositories
- Queries simplificadas (em memória)
- Headers de compressão (helmet)
- Limit em JSON uploads (10MB)

### Para Produção

- Implementar cache com Redis
- Usar banco de dados real (PostgreSQL/MongoDB)
- Implementar rate limiting
- Usar CDN para assets
- Implementar paginação

---

## 🧪 Testes

### Estrutura Recomendada

```
tests/
├── unit/
│   ├── services/
│   ├── repositories/
│   └── middlewares/
├── integration/
│   └── routes/
└── setup.js
```

### Exemplo

```javascript
describe("AlunoService", () => {
  it("deve criar um aluno válido", async () => {
    const aluno = await AlunoService.createStudent({
      matricula: "2024001",
      nome: "João",
      email: "joao@test.com",
    });
    expect(aluno.id).toBeDefined();
  });
});
```

---

## 📚 Dependências

| Pacote       | Versão   | Uso                |
| ------------ | -------- | ------------------ |
| express      | ^4.19.2  | Framework web      |
| cors         | ^2.8.5   | CORS               |
| helmet       | ^7.1.0   | Segurança HTTP     |
| bcryptjs     | ^2.4.3   | Hash de senhas     |
| jsonwebtoken | ^9.0.2   | JWT                |
| joi          | ^17.11.0 | Validação          |
| uuid         | ^9.0.1   | ID único           |
| dotenv       | ^16.4.5  | Variáveis ambiente |
| nodemon      | ^3.1.10  | Dev only           |
| jest         | ^29.7.0  | Testing            |

---

## 🚀 Deploy

### Heroku

```bash
heroku create seu-app-erp
git push heroku main
heroku config:set JWT_SECRET=sua_chave
heroku open
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Render/Railway

1. Connect GitHub repo
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables
5. Deploy

---

## 📞 Suporte e Contribuição

Para contribuir:

1. Fork o repositório
2. Crie uma branch `feature/sua-feature`
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

---

**Versão:** 1.0.0  
**Última Atualização:** 27 de Novembro de 2024  
**Autor:** Lorenzo Pandolfo
