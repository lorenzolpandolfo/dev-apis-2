/**
 * Controlador de Autenticação
 */

const AuthService = require("../services/AuthService");

class AuthController {
  async register(req, res) {
    try {
      const { email, password, name, role } = req.body;
      const user = await AuthService.register({ email, password, name, role });
      res.status(201).json({
        status: "success",
        message: "Usuário registrado com sucesso",
        user,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          status: "error",
          message: "Email e senha são obrigatórios",
        });
      }

      const result = await AuthService.login(email, password);
      res.status(200).json({
        status: "success",
        message: "Login realizado com sucesso",
        ...result,
      });
    } catch (error) {
      res.status(401).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getProfile(req, res) {
    try {
      const userId = req.user.userId;
      const user = await AuthService.getUserProfile(userId);
      res.status(200).json({
        status: "success",
        user,
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = new AuthController();
