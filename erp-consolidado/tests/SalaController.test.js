const SalaController = require("../src/controllers/SalaController");
const SalaService = require("../src/services/SalaService");

jest.mock("../src/services/SalaService");

describe("SalaController", () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    req = {
      params: {},
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  describe("getAll", () => {
    it("deve retornar todas as salas com status 200", async () => {
      const mockSalas = [
        { id: 1, numero: "101", descricao: "Sala de Aula A", lotacao: 30 },
        { id: 2, numero: "102", descricao: "Sala de Aula B", lotacao: 35 },
      ];

      SalaService.getAllSalas.mockResolvedValue(mockSalas);

      await SalaController.getAll(req, res);

      expect(SalaService.getAllSalas).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: mockSalas,
      });
    });

    it("deve retornar erro 500 quando ocorrer uma exceção", async () => {
      const errorMessage = "Erro ao buscar salas";
      SalaService.getAllSalas.mockRejectedValue(new Error(errorMessage));

      await SalaController.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: "error",
        message: errorMessage,
      });
    });
  });

  describe("getById", () => {
    it("deve retornar uma sala pelo ID com status 200", async () => {
      const mockSala = {
        id: 1,
        numero: "101",
        descricao: "Sala de Aula A",
        lotacao: 30,
      };

      req.params.id = 1;
      SalaService.getSalaById.mockResolvedValue(mockSala);

      await SalaController.getById(req, res);

      expect(SalaService.getSalaById).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: mockSala,
      });
    });

    it("deve retornar erro 404 quando sala não existe", async () => {
      const errorMessage = "Sala não encontrada";
      req.params.id = 999;
      SalaService.getSalaById.mockRejectedValue(new Error(errorMessage));

      await SalaController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: "error",
        message: errorMessage,
      });
    });
  });

  describe("create", () => {
    it("deve criar uma nova sala com status 201", async () => {
      const newSala = {
        id: 3,
        numero: "103",
        descricao: "Sala de Aula C",
        lotacao: 40,
      };

      req.body = {
        numero: "103",
        descricao: "Sala de Aula C",
        lotacao: 40,
      };

      SalaService.createSala.mockResolvedValue(newSala);

      await SalaController.create(req, res);

      expect(SalaService.createSala).toHaveBeenCalledWith({
        numero: "103",
        descricao: "Sala de Aula C",
        lotacao: 40,
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        message: "Sala criada",
        data: newSala,
      });
    });

    it("deve retornar erro 400 ao tentar criar sala com dados inválidos", async () => {
      const errorMessage = "Dados inválidos";
      req.body = { numero: "104" };

      SalaService.createSala.mockRejectedValue(new Error(errorMessage));

      await SalaController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: "error",
        message: errorMessage,
      });
    });
  });

  describe("update", () => {
    it("deve atualizar uma sala com status 200", async () => {
      const updatedSala = {
        id: 1,
        numero: "101",
        descricao: "Sala de Aula A Atualizada",
        lotacao: 35,
      };

      req.params.id = 1;
      req.body = { descricao: "Sala de Aula A Atualizada", lotacao: 35 };

      SalaService.updateSala.mockResolvedValue(updatedSala);

      await SalaController.update(req, res);

      expect(SalaService.updateSala).toHaveBeenCalledWith(1, req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        message: "Sala atualizada",
        data: updatedSala,
      });
    });
  });

  describe("delete", () => {
    it("deve deletar uma sala com status 200", async () => {
      req.params.id = 1;
      SalaService.deleteSala.mockResolvedValue(true);

      await SalaController.delete(req, res);

      expect(SalaService.deleteSala).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        message: "Sala deletada",
      });
    });
  });
});
