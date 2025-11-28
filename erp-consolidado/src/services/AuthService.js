/**
 * Serviço de Autenticação
 * Gerencia login, registro e validação de tokens
 */

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserRepository = require("../repositories/UserRepository");

class AuthService {
  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || "sua_chave_secreta";
    this.jwtExpiration = process.env.JWT_EXPIRATION || "7d";
  }

  async register(userData) {
    console.log("UserData: ", userData);
    const { email, password, name, role = "user" } = userData;

    if (!email || !password || !name) {
      throw new Error("Email, senha e nome são obrigatórios");
    }

    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Email já cadastrado");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserRepository.create({
      email,
      password: hashedPassword,
      name,
      role,
    });

    delete newUser.password;
    return newUser;
  }

  async login(email, password) {
    if (!email || !password) {
      throw new Error("Email e senha são obrigatórios");
    }

    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error("Senha incorreta");
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      this.jwtSecret,
      { expiresIn: this.jwtExpiration }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        nome: user.nome,
        role: user.role,
      },
    };
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (error) {
      throw new Error("Token inválido ou expirado");
    }
  }

  async getUserProfile(userId) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    delete user.password;
    return user;
  }
}

module.exports = new AuthService();
