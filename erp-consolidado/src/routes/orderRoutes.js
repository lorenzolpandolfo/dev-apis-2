/**
 * Rotas de Pedidos
 */

const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const OrderController = require("../controllers/OrderController");

const router = express.Router();

// Rotas protegidas
router.get("/", authMiddleware, OrderController.getAll);
router.post("/", authMiddleware, OrderController.create);
router.get("/:id", authMiddleware, OrderController.getById);
router.put("/:id", authMiddleware, OrderController.update);
router.delete("/:id", authMiddleware, OrderController.delete);
router.get("/client/:clientId", authMiddleware, OrderController.getByClient);
router.patch("/:id/status", authMiddleware, OrderController.updateStatus);

module.exports = router;
