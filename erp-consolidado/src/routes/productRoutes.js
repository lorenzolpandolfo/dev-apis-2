/**
 * Rotas de Produtos
 */

const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const ProductController = require("../controllers/ProductController");

const router = express.Router();

// Rotas públicas (listar)
router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getById);
router.get("/category/:category", ProductController.getByCategory);

// Rotas protegidas (criar, atualizar, deletar)
router.post("/", authMiddleware, ProductController.create);
router.put("/:id", authMiddleware, ProductController.update);
router.delete("/:id", authMiddleware, ProductController.delete);

module.exports = router;
