const ProfessorController = require("../src/controllers/ProfessorController");
const ProfessorService = require("../src/services/ProfessorService");

jest.mock("../src/services/ProfessorService");

describe("ProfessorController", () => {
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
    it("deve retornar todos os professores com status 200", async () => {
      const mockProfessores = [
        {
          id: 1,
          nome: "Prof. João",
          email: "joao@example.com",
          telefone: "11999999999",
          escolaridade: "Mestrado",
        },
        {
          id: 2,
          nome: "Prof. Maria",
          email: "maria@example.com",
          telefone: "11988888888",
          escolaridade: "Doutorado",
        },
      ];

      ProfessorService.getAllProfessors.mockResolvedValue(mockProfessores);

      await ProfessorController.getAll(req, res);

      expect(ProfessorService.getAllProfessors).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: mockProfessores,
      });
    });

    it("deve retornar erro 500 quando ocorrer uma exceção", async () => {
      const errorMessage = "Erro ao buscar professores";
      ProfessorService.getAllProfessors.mockRejectedValue(
        new Error(errorMessage)
      );

      await ProfessorController.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: "error",
        message: errorMessage,
      });
    });
  });

  describe("getById", () => {
    it("deve retornar um professor pelo ID com status 200", async () => {
      const mockProfessor = {
        id: 1,
        nome: "Prof. João",
        email: "joao@example.com",
        telefone: "11999999999",
        escolaridade: "Mestrado",
      };

      req.params.id = 1;
      ProfessorService.getProfessorById.mockResolvedValue(mockProfessor);

      await ProfessorController.getById(req, res);

      expect(ProfessorService.getProfessorById).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: mockProfessor,
      });
    });

    it("deve retornar erro 404 quando professor não existe", async () => {
      const errorMessage = "Professor não encontrado";
      req.params.id = 999;
      ProfessorService.getProfessorById.mockRejectedValue(
        new Error(errorMessage)
      );

      await ProfessorController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: "error",
        message: errorMessage,
      });
    });
  });

  describe("create", () => {
    it("deve criar um novo professor com status 201", async () => {
      const newProfessor = {
        id: 3,
        nome: "Prof. Pedro",
        email: "pedro@example.com",
        telefone: "11977777777",
        escolaridade: "Doutorado",
      };

      req.body = {
        nome: "Prof. Pedro",
        email: "pedro@example.com",
        telefone: "11977777777",
        escolaridade: "Doutorado",
      };

      ProfessorService.createProfessor.mockResolvedValue(newProfessor);

      await ProfessorController.create(req, res);

      expect(ProfessorService.createProfessor).toHaveBeenCalledWith({
        nome: "Prof. Pedro",
        email: "pedro@example.com",
        telefone: "11977777777",
        escolaridade: "Doutorado",
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        message: "Professor criado com sucesso",
        data: newProfessor,
      });
    });

    it("deve retornar erro 400 ao tentar criar professor com email inválido", async () => {
      const errorMessage = "Email inválido";
      req.body = {
        nome: "Prof. Pedro",
        email: "email-invalido",
        telefone: "11977777777",
        escolaridade: "Doutorado",
      };

      ProfessorService.createProfessor.mockRejectedValue(
        new Error(errorMessage)
      );

      await ProfessorController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: "error",
        message: errorMessage,
      });
    });
  });

  describe("update", () => {
    it("deve atualizar um professor com status 200", async () => {
      const updatedProfessor = {
        id: 1,
        nome: "Prof. João Silva",
        email: "joao.silva@example.com",
        telefone: "11999999999",
        escolaridade: "Doutorado",
      };

      req.params.id = 1;
      req.body = {
        nome: "Prof. João Silva",
        email: "joao.silva@example.com",
        escolaridade: "Doutorado",
      };

      ProfessorService.updateProfessor.mockResolvedValue(updatedProfessor);

      await ProfessorController.update(req, res);

      expect(ProfessorService.updateProfessor).toHaveBeenCalledWith(
        1,
        req.body
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        message: "Professor atualizado com sucesso",
        data: updatedProfessor,
      });
    });
  });

  describe("delete", () => {
    it("deve deletar um professor com status 200", async () => {
      req.params.id = 1;
      ProfessorService.deleteProfessor.mockResolvedValue(true);

      await ProfessorController.delete(req, res);

      expect(ProfessorService.deleteProfessor).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        message: "Professor deletado com sucesso",
      });
    });
  });
});
