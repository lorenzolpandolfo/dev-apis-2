/**
 * Middleware de Autorização
 * Verifica permissões de roles de usuários
 */

const adminMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      status: "error",
      message: "Usuário não autenticado",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      status: "error",
      message: "Acesso negado. Necessário privilégios de administrador.",
    });
  }

  next();
};

const professorMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      status: "error",
      message: "Usuário não autenticado",
    });
  }

  if (req.user.role !== "professor" && req.user.role !== "admin") {
    return res.status(403).json({
      status: "error",
      message: "Acesso negado. Necessário ser professor ou administrador.",
    });
  }

  next();
};

const studentMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      status: "error",
      message: "Usuário não autenticado",
    });
  }

  if (req.user.role !== "student" && req.user.role !== "admin") {
    return res.status(403).json({
      status: "error",
      message: "Acesso negado. Necessário ser estudante ou administrador.",
    });
  }

  next();
};

module.exports = {
  adminMiddleware,
  professorMiddleware,
  studentMiddleware,
};
