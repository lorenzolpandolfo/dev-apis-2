/**
 * Middleware de Tratamento de Erros
 */

const errorHandler = (err, req, res, next) => {
  console.error("Erro:", err);

  const statusCode = err.status || 500;
  const message = err.message || "Erro interno do servidor";

  res.status(statusCode).json({
    status: "error",
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
