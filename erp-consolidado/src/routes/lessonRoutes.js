/**
 * Rotas de Aulas
 */

const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const LessonController = require("../controllers/LessonController");

const router = express.Router();

// Rotas protegidas
router.get("/", authMiddleware, LessonController.getAll);
router.post("/", authMiddleware, LessonController.create);
router.get("/:id", authMiddleware, LessonController.getById);
router.put("/:id", authMiddleware, LessonController.update);
router.delete("/:id", authMiddleware, LessonController.delete);
router.get("/class/:classId", authMiddleware, LessonController.getByClass);
router.get(
  "/teacher/:teacherId",
  authMiddleware,
  LessonController.getByTeacher
);

module.exports = router;
