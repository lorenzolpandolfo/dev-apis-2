/**
 * Rotas de Áreas de Conhecimento
 */

const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const AreaDeConhecimentoController = require("../controllers/AreaDeConhecimentoController");

const router = express.Router();

// Rotas públicas (listar)
router.get("/", AreaDeConhecimentoController.getAll);
router.get("/:id", AreaDeConhecimentoController.getById);

// Rotas protegidas (criar, atualizar, deletar)
router.post("/", authMiddleware, AreaDeConhecimentoController.create);
router.put("/:id", authMiddleware, AreaDeConhecimentoController.update);
router.delete("/:id", authMiddleware, AreaDeConhecimentoController.delete);

module.exports = router;
