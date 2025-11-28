const AuthController = require("../src/controllers/AuthController");
const AuthService = require("../src/services/AuthService");

jest.mock("../src/services/AuthService");

describe("AuthController", () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    req = { params: {}, body: {}, user: { userId: 1 } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it("deve registrar um novo usuário", async () => {
    const newUser = { id: 1, email: "test@example.com", name: "Test User" };
    req.body = {
      email: "test@example.com",
      password: "123456",
      name: "Test User",
      role: "user",
    };
    AuthService.register.mockResolvedValue(newUser);

    await AuthController.register(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Usuário registrado com sucesso",
      user: newUser,
    });
  });

  it("deve fazer login com credenciais válidas", async () => {
    const loginResult = {
      token: "jwt_token",
      user: { id: 1, email: "test@example.com" },
    };
    req.body = { email: "test@example.com", password: "123456" };
    AuthService.login.mockResolvedValue(loginResult);

    await AuthController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Login realizado com sucesso",
      token: "jwt_token",
      user: { id: 1, email: "test@example.com" },
    });
  });

  it("deve retornar erro quando email ou senha não fornecidos", async () => {
    req.body = { email: "test@example.com" };

    await AuthController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "error",
      message: "Email e senha são obrigatórios",
    });
  });

  it("deve retornar erro 401 com credenciais inválidas", async () => {
    req.body = { email: "test@example.com", password: "wrongpassword" };
    AuthService.login.mockRejectedValue(new Error("Email ou senha inválidos"));

    await AuthController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  it("deve retornar perfil do usuário", async () => {
    const userProfile = {
      id: 1,
      email: "test@example.com",
      name: "Test User",
      role: "user",
    };
    AuthService.getUserProfile.mockResolvedValue(userProfile);

    await AuthController.getProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      user: userProfile,
    });
  });

  it("deve retornar erro 400 ao registrar com email duplicado", async () => {
    req.body = {
      email: "existing@example.com",
      password: "123456",
      name: "Test",
      role: "user",
    };
    AuthService.register.mockRejectedValue(new Error("Email já cadastrado"));

    await AuthController.register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});
