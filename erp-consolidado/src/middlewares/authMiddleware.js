/**
 * Middleware de Autenticação
 * Valida tokens JWT nas requisições
 */

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        status: "error",
        message: "Token de acesso requerido",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Token de acesso inválido",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "sua_chave_secreta"
    );

    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        status: "error",
        message: "Token inválido",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "error",
        message: "Token expirado",
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Erro interno do servidor",
    });
  }
};

module.exports = authMiddleware;
