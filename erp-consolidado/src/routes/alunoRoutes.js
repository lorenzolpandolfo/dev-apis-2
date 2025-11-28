/**
 * Rotas de Alunos
 */

const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const AlunoController = require("../controllers/AlunoController");

const router = express.Router();

// Rotas protegidas
router.get("/", authMiddleware, AlunoController.getAll);
router.post("/", authMiddleware, AlunoController.create);
router.get("/:id", authMiddleware, AlunoController.getById);
router.put("/:id", authMiddleware, AlunoController.update);
router.delete("/:id", authMiddleware, AlunoController.delete);
router.get("/:id/classes", authMiddleware, AlunoController.getClasses);

module.exports = router;
