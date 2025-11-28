/**
 * Rotas de Classes
 */

const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const ClassController = require("../controllers/ClassController");

const router = express.Router();

// Rotas protegidas
router.get("/", authMiddleware, ClassController.getAll);
router.post("/", authMiddleware, ClassController.create);
router.get("/:id", authMiddleware, ClassController.getById);
router.put("/:id", authMiddleware, ClassController.update);
router.delete("/:id", authMiddleware, ClassController.delete);
router.get("/teacher/:teacherId", authMiddleware, ClassController.getByTeacher);

module.exports = router;
