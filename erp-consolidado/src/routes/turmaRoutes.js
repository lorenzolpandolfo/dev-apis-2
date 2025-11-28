/**
 * Rotas de Turmas
 */

const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const TurmaController = require("../controllers/TurmaController");

const router = express.Router();

// Rotas protegidas
router.get("/", authMiddleware, TurmaController.getAll);
router.post("/", authMiddleware, TurmaController.create);
router.get("/:id", authMiddleware, TurmaController.getById);
router.put("/:id", authMiddleware, TurmaController.update);
router.delete("/:id", authMiddleware, TurmaController.delete);
router.get("/:id/students", authMiddleware, TurmaController.getStudents);

module.exports = router;
