/**
 * Rotas de Salas
 */

const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const SalaController = require("../controllers/SalaController");

const router = express.Router();

router.get("/", authMiddleware, SalaController.getAll);
router.post("/", authMiddleware, SalaController.create);
router.get("/:id", authMiddleware, SalaController.getById);
router.put("/:id", authMiddleware, SalaController.update);
router.delete("/:id", authMiddleware, SalaController.delete);

module.exports = router;
