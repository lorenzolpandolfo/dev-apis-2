/**
 * Rotas de Estudantes
 */

const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const StudentController = require("../controllers/StudentController");

const router = express.Router();

// Rotas protegidas
router.get("/", authMiddleware, StudentController.getAll);
router.post("/", authMiddleware, StudentController.create);
router.get("/:id", authMiddleware, StudentController.getById);
router.put("/:id", authMiddleware, StudentController.update);
router.delete("/:id", authMiddleware, StudentController.delete);
router.get("/:id/classes", authMiddleware, StudentController.getClasses);

module.exports = router;
