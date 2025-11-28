/**
 * Rotas de Autenticação
 */

const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const AuthController = require("../controllers/AuthController");

const router = express.Router();

// Rotas públicas
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

// Rotas protegidas
router.get("/profile", authMiddleware, AuthController.getProfile);

module.exports = router;
