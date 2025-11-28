# 📚 Exemplos de Uso - API ERP Consolidada

## 🔐 Autenticação

### 1. Registrar Novo Usuário

```http
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "senha123",
  "nome": "João Silva",
  "role": "admin"
}
```

**Resposta (201):**

```json
{
  "status": "success",
  "message": "Usuário registrado com sucesso",
  "user": {
    "id": 1,
    "email": "usuario@example.com",
    "nome": "João Silva",
    "role": "admin"
  }
}
```

### 2. Fazer Login

```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "senha123"
}
```

**Resposta (200):**

```json
{
  "status": "success",
  "message": "Login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "usuario@example.com",
    "nome": "João Silva",
    "role": "admin"
  }
}
```

---

## 👨‍🎓 Módulo Cursos

### 3. Criar Aluno

```http
POST http://localhost:3000/api/alunos
Content-Type: application/json
Authorization: Bearer {token}

{
  "matricula": "2024001",
  "nome": "Maria Santos",
  "email": "maria@example.com",
  "telefone": "11987654321"
}
```

**Resposta (201):**

```json
{
  "status": "success",
  "message": "Aluno criado com sucesso",
  "data": {
    "id": 1,
    "matricula": "2024001",
    "nome": "Maria Santos",
    "email": "maria@example.com",
    "telefone": "11987654321"
  }
}
```

### 4. Listar Todos os Alunos

```http
GET http://localhost:3000/api/alunos
Authorization: Bearer {token}
```

**Resposta (200):**

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "matricula": "2024001",
      "nome": "Maria Santos",
      "email": "maria@example.com",
      "telefone": "11987654321"
    }
  ]
}
```

### 5. Obter Aluno por ID

```http
GET http://localhost:3000/api/alunos/1
Authorization: Bearer {token}
```

### 6. Atualizar Aluno

```http
PUT http://localhost:3000/api/alunos/1
Content-Type: application/json
Authorization: Bearer {token}

{
  "telefone": "11988888888"
}
```

### 7. Deletar Aluno

```http
DELETE http://localhost:3000/api/alunos/1
Authorization: Bearer {token}
```

---

### 8. Criar Professor

```http
POST http://localhost:3000/api/professores
Content-Type: application/json
Authorization: Bearer {token}

{
  "matricula": "PROF001",
  "nome": "Dr. Carlos Mendes",
  "email": "carlos@example.com",
  "telefone": "11985555555",
  "especialidade": "Matemática"
}
```

### 9. Listar Professores

```http
GET http://localhost:3000/api/professores
Authorization: Bearer {token}
```

---

### 10. Criar Turma

```http
POST http://localhost:3000/api/turmas
Content-Type: application/json
Authorization: Bearer {token}

{
  "nome": "Turma A - 2024",
  "professorId": 1,
  "areaDeConhecimentoId": 1,
  "descricao": "Turma de matemática avançada",
  "horario": "14:00 - 15:30"
}
```

### 11. Listar Turmas

```http
GET http://localhost:3000/api/turmas
Authorization: Bearer {token}
```

---

### 12. Criar Matrícula

```http
POST http://localhost:3000/api/matriculas
Content-Type: application/json
Authorization: Bearer {token}

{
  "alunoId": 1,
  "turmaId": 1,
  "dataEnrollment": "2024-01-15"
}
```

### 13. Listar Matrículas de um Aluno

```http
GET http://localhost:3000/api/matriculas/aluno/1
Authorization: Bearer {token}
```

---

## 🛍️ Módulo Produtos

### 14. Criar Produto

```http
POST http://localhost:3000/api/products
Content-Type: application/json
Authorization: Bearer {token}

{
  "name": "Notebook Dell",
  "description": "Notebook com processador Intel i7",
  "code": "PROD001",
  "category": "Eletrônicos",
  "price": 3500.00,
  "stock": 15
}
```

### 15. Listar Produtos

```http
GET http://localhost:3000/api/products
```

### 16. Listar Produtos por Categoria

```http
GET http://localhost:3000/api/products/category/Eletrônicos
```

### 17. Buscar Produtos com Filtros

```http
GET http://localhost:3000/api/products?search=notebook&sortBy=price&sortOrder=asc
```

---

### 18. Criar Cliente

```http
POST http://localhost:3000/api/clients
Content-Type: application/json
Authorization: Bearer {token}

{
  "nome": "Empresa XYZ Ltda",
  "email": "contato@empresaxyz.com",
  "cpf": "12345678000190",
  "telefone": "1133333333",
  "endereco": "Av. Paulista, 1000",
  "cidade": "São Paulo"
}
```

### 19. Listar Clientes

```http
GET http://localhost:3000/api/clients
```

### 20. Listar Clientes Ativos

```http
GET http://localhost:3000/api/clients/active
```

---

### 21. Criar Pedido

```http
POST http://localhost:3000/api/orders
Content-Type: application/json
Authorization: Bearer {token}

{
  "clientId": 1,
  "items": [
    {
      "productId": 1,
      "quantidade": 2
    },
    {
      "productId": 2,
      "quantidade": 1
    }
  ],
  "desconto": 100.00
}
```

### 22. Listar Pedidos

```http
GET http://localhost:3000/api/orders
Authorization: Bearer {token}
```

### 23. Listar Pedidos de um Cliente

```http
GET http://localhost:3000/api/orders/client/1
Authorization: Bearer {token}
```

### 24. Atualizar Status de Pedido

```http
PATCH http://localhost:3000/api/orders/1/status
Content-Type: application/json
Authorization: Bearer {token}

{
  "status": "entregue"
}
```

---

## 📚 Módulo Áreas de Conhecimento

### 25. Criar Área de Conhecimento

```http
POST http://localhost:3000/api/areas
Content-Type: application/json
Authorization: Bearer {token}

{
  "nome": "Ciências da Computação",
  "descricao": "Área focada em programação e sistemas computacionais"
}
```

### 26. Listar Áreas

```http
GET http://localhost:3000/api/areas
```

---

## 🏫 Módulo Classes

### 27. Criar Estudante

```http
POST http://localhost:3000/api/students
Content-Type: application/json
Authorization: Bearer {token}

{
  "registration": "EST2024001",
  "name": "Ana Costa",
  "email": "ana@example.com",
  "phone": "11999999999"
}
```

### 28. Listar Estudantes

```http
GET http://localhost:3000/api/students
Authorization: Bearer {token}
```

---

### 29. Criar Classe

```http
POST http://localhost:3000/api/classes
Content-Type: application/json
Authorization: Bearer {token}

{
  "name": "Intro to Programming",
  "teacherId": 1,
  "description": "Introdução à programação com JavaScript",
  "startDate": "2024-02-01",
  "endDate": "2024-06-30"
}
```

### 30. Listar Classes

```http
GET http://localhost:3000/api/classes
Authorization: Bearer {token}
```

### 31. Listar Classes de um Professor

```http
GET http://localhost:3000/api/classes/teacher/1
Authorization: Bearer {token}
```

---

### 32. Criar Aula

```http
POST http://localhost:3000/api/lessons
Content-Type: application/json
Authorization: Bearer {token}

{
  "classId": 1,
  "teacherId": 1,
  "title": "Variáveis e Tipos de Dados",
  "date": "2024-02-05",
  "duration": "90",
  "content": "Aula sobre variáveis e tipos de dados em JavaScript"
}
```

### 33. Listar Aulas

```http
GET http://localhost:3000/api/lessons
Authorization: Bearer {token}
```

### 34. Listar Aulas de uma Classe

```http
GET http://localhost:3000/api/lessons/class/1
Authorization: Bearer {token}
```

### 35. Listar Aulas de um Professor

```http
GET http://localhost:3000/api/lessons/teacher/1
Authorization: Bearer {token}
```

---

## ✅ Health Check

```http
GET http://localhost:3000/health
```

**Resposta:**

```json
{
  "status": "success",
  "message": "API ERP Consolidada funcionando corretamente!",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "development"
}
```

---

## 🐛 Códigos de Erro Comuns

| Código | Significado                                 |
| ------ | ------------------------------------------- |
| 400    | Requisição inválida                         |
| 401    | Não autenticado (token ausente ou inválido) |
| 403    | Acesso negado (privilégios insuficientes)   |
| 404    | Recurso não encontrado                      |
| 500    | Erro interno do servidor                    |

---

## 💡 Dicas

1. **Sempre use o token JWT** retornado ao fazer login para requisições autenticadas
2. **Adicione o header** `Authorization: Bearer {token}` em requisições protegidas
3. **Verifique o Content-Type** - sempre use `application/json`
4. **Valide os dados** antes de enviar para a API
5. **Use IDs corretos** ao fazer referências entre recursos

---

## 🔍 Testando com cURL

```bash
# Registrar
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@example.com","password":"123456","nome":"Teste"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@example.com","password":"123456"}'

# Listar alunos (com token)
curl -X GET http://localhost:3000/api/alunos \
  -H "Authorization: Bearer {seu_token_aqui}"
```

---

## 🧪 Testando com Postman

1. Importe as coleções fornecidas
2. Configure a variável de ambiente `base_url` com `http://localhost:3000`
3. Configure a variável `token` com o token obtido após login
4. Execute os testes em sequência
