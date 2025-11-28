/**
 * Rotas de Clientes
 */

const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const ClientController = require("../controllers/ClientController");

const router = express.Router();

// Rotas públicas (listar)
router.get("/", ClientController.getAll);
router.get("/active", ClientController.getActive);
router.get("/:id", ClientController.getById);

// Rotas protegidas (criar, atualizar, deletar)
router.post("/", authMiddleware, ClientController.create);
router.put("/:id", authMiddleware, ClientController.update);
router.delete("/:id", authMiddleware, ClientController.delete);

module.exports = router;
