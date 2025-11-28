/**
 * Servidor Principal da API ERP Consolidada
 * Integra todas as 4 APIs em uma única aplicação
 */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// Database
const { sequelize } = require("./models/models");

// Middlewares
const requestLogger = require("./middlewares/requestLogger");
const errorHandler = require("./middlewares/errorHandler");

// Rotas
const apiRoutes = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 3000;

// ===== Middlewares de Segurança =====
app.use(helmet());
app.use(cors());

// ===== Middlewares de Parsing =====
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ===== Logger de Requisições =====
app.use(requestLogger);

// ===== Health Check =====
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API ERP Consolidada funcionando corretamente!",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    database: "PostgreSQL",
  });
});

// ===== Rota Principal =====
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Bem-vindo à API ERP Consolidada",
    version: "1.0.0",
    description: "Integra Cursos, Produtos, Áreas de Conhecimento e Classes",
    endpoints: {
      auth: "/api/auth",
      cursos: {
        alunos: "/api/alunos",
        professores: "/api/professores",
        turmas: "/api/turmas",
        matriculas: "/api/matriculas",
      },
      produtos: {
        products: "/api/products",
        clients: "/api/clients",
        orders: "/api/orders",
      },
      areas: "/api/areas",
      classes: {
        students: "/api/students",
        classes: "/api/classes",
        lessons: "/api/lessons",
      },
    },
  });
});

// ===== Rotas da API =====
app.use("/api", apiRoutes);

// ===== Tratamento de Rotas Não Encontradas =====
app.use("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint não encontrado",
    path: req.originalUrl,
    method: req.method,
  });
});

// ===== Middleware de Tratamento de Erros =====
app.use(errorHandler);

// ===== Sincronizar Banco de Dados e Iniciar Servidor =====
const startServer = async () => {
  try {
    // Sincronizar modelos com o banco de dados
    console.log("\n🔄 Sincronizando modelos com PostgreSQL...");
    await sequelize.sync({ alter: true });
    console.log("✅ Banco de dados sincronizado!");

    // Testar conexão
    await sequelize.authenticate();
    console.log("✅ Conexão com PostgreSQL estabelecida!");

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log("\n═══════════════════════════════════════════════════════");
      console.log("🚀 API ERP CONSOLIDADA");
      console.log("═══════════════════════════════════════════════════════");
      console.log(`✅ Servidor rodando em: http://localhost:${PORT}`);
      console.log(`📊 Health Check: http://localhost:${PORT}/health`);
      console.log(`📚 Documentação: http://localhost:${PORT}`);
      console.log(`🔧 Ambiente: ${process.env.NODE_ENV || "development"}`);
      console.log(`🗄️  Banco: PostgreSQL - ${process.env.DB_NAME}`);
      console.log("═══════════════════════════════════════════════════════\n");
    });
  } catch (error) {
    console.error("❌ Erro ao iniciar servidor:", error.message);
    console.error(
      "\nVerifique se PostgreSQL está rodando e se as credenciais estão corretas."
    );
    process.exit(1);
  }
};

startServer();

module.exports = app;
