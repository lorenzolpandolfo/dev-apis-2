/**
 * Rotas de Professores
 */

const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const ProfessorController = require("../controllers/ProfessorController");

const router = express.Router();

// Rotas protegidas
router.get("/", authMiddleware, ProfessorController.getAll);
router.post("/", authMiddleware, ProfessorController.create);
router.get("/:id", authMiddleware, ProfessorController.getById);
router.put("/:id", authMiddleware, ProfessorController.update);
router.delete("/:id", authMiddleware, ProfessorController.delete);
router.get("/:id/classes", authMiddleware, ProfessorController.getClasses);

module.exports = router;
