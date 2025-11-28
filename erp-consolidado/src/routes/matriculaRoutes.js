/**
 * Rotas de Matrículas
 */

const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const MatriculaController = require("../controllers/MatriculaController");

const router = express.Router();

// Rotas protegidas
router.get("/", authMiddleware, MatriculaController.getAll);
router.post("/", authMiddleware, MatriculaController.create);
router.get("/:id", authMiddleware, MatriculaController.getById);
router.put("/:id", authMiddleware, MatriculaController.update);
router.delete("/:id", authMiddleware, MatriculaController.delete);
router.get(
  "/aluno/:alunoId",
  authMiddleware,
  MatriculaController.getStudentEnrollments
);
router.get(
  "/turma/:turmaId",
  authMiddleware,
  MatriculaController.getClassEnrollments
);

module.exports = router;
