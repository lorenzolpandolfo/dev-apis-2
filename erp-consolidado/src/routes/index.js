/**
 * Arquivo Principal de Rotas
 * Consolida todas as rotas da API
 */

const express = require("express");
const router = express.Router();

// Importar rotas
const authRoutes = require("./authRoutes");
const alunoRoutes = require("./alunoRoutes");
const professorRoutes = require("./professorRoutes");
const turmaRoutes = require("./turmaRoutes");
const matriculaRoutes = require("./matriculaRoutes");
const productRoutes = require("./productRoutes");
const clientRoutes = require("./clientRoutes");
const orderRoutes = require("./orderRoutes");
const areaRoutes = require("./areaRoutes");
const classRoutes = require("./classRoutes");
const lessonRoutes = require("./lessonRoutes");

// Registrar rotas
router.use("/auth", authRoutes);

// Módulo Cursos
router.use("/alunos", alunoRoutes);
router.use("/professores", professorRoutes);
router.use("/turmas", turmaRoutes);
router.use("/matriculas", matriculaRoutes);

// Módulo Produtos
router.use("/products", productRoutes);
router.use("/clients", clientRoutes);
router.use("/orders", orderRoutes);

// Módulo Áreas de Conhecimento
router.use("/areas", areaRoutes);

// Módulo Classes
router.use("/classes", classRoutes); // turmas
router.use("/lessons", lessonRoutes); // aulas

module.exports = router;
