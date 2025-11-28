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
const areaRoutes = require("./areaRoutes");
const lessonRoutes = require("./lessonRoutes");
const cursoRoutes = require("./cursoRoutes");
const disciplinaRoutes = require("./disciplinaRoutes");
const matrizCurricularRoutes = require("./matrizCurricularRoutes");

// Registrar rotas
router.use("/auth", authRoutes);

// Módulo Cursos
router.use("/alunos", alunoRoutes);
router.use("/professores", professorRoutes);
router.use("/turmas", turmaRoutes);
router.use("/matriculas", matriculaRoutes);
router.use("/cursos", cursoRoutes);
router.use("/disciplinas", disciplinaRoutes);
router.use("/matrizes-curriculares", matrizCurricularRoutes);

// Módulo Áreas de Conhecimento
router.use("/areas", areaRoutes);

// Módulo Classes
router.use("/lessons", lessonRoutes); // aulas

module.exports = router;
