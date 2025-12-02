const AreaDeConhecimentoController = require("../src/controllers/AreaDeConhecimentoController");
const AreaDeConhecimentoService = require("../src/services/AreaDeConhecimentoService");

jest.mock("../src/services/AreaDeConhecimentoService");

describe("AreaDeConhecimentoController", () => {
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
    it("deve retornar todas as áreas de conhecimento com status 200", async () => {
      const mockAreas = [
        { id: 1, nome: "Exatas", descricao: "Área de ciências exatas" },
        { id: 2, nome: "Humanas", descricao: "Área de ciências humanas" },
      ];

      AreaDeConhecimentoService.getAllAreas.mockResolvedValue(mockAreas);

      await AreaDeConhecimentoController.getAll(req, res);

      expect(AreaDeConhecimentoService.getAllAreas).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: mockAreas,
      });
    });

    it("deve retornar erro 500 quando ocorrer uma exceção", async () => {
      const errorMessage = "Erro ao buscar áreas";
      AreaDeConhecimentoService.getAllAreas.mockRejectedValue(
        new Error(errorMessage),
      );

      await AreaDeConhecimentoController.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: "error",
        message: errorMessage,
      });
    });
  });

  describe("getById", () => {
    it("deve retornar uma área de conhecimento pelo ID com status 200", async () => {
      const mockArea = {
        id: 1,
        nome: "Exatas",
        descricao: "Área de ciências exatas",
      };

      req.params.id = 1;
      AreaDeConhecimentoService.getAreaById.mockResolvedValue(mockArea);

      await AreaDeConhecimentoController.getById(req, res);

      expect(AreaDeConhecimentoService.getAreaById).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: mockArea,
      });
    });

    it("deve retornar erro 404 quando área não existe", async () => {
      const errorMessage = "Área não encontrada";
      req.params.id = 999;
      AreaDeConhecimentoService.getAreaById.mockRejectedValue(
        new Error(errorMessage),
      );

      await AreaDeConhecimentoController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: "error",
        message: errorMessage,
      });
    });
  });

  describe("create", () => {
    it("deve criar uma nova área de conhecimento com status 201", async () => {
      const newArea = {
        id: 3,
        nome: "Saúde",
        descricao: "Área de ciências da saúde",
      };

      req.body = {
        nome: "Saúde",
        descricao: "Área de ciências da saúde",
      };

      AreaDeConhecimentoService.createArea.mockResolvedValue(newArea);

      await AreaDeConhecimentoController.create(req, res);

      expect(AreaDeConhecimentoService.createArea).toHaveBeenCalledWith({
        nome: "Saúde",
        descricao: "Área de ciências da saúde",
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        message: "Área de conhecimento criada com sucesso",
        data: newArea,
      });
    });

    it("deve retornar erro 400 ao tentar criar área com dados inválidos", async () => {
      const errorMessage = "Nome é obrigatório";
      req.body = { descricao: "Alguma descrição" };

      AreaDeConhecimentoService.createArea.mockRejectedValue(
        new Error(errorMessage),
      );

      await AreaDeConhecimentoController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: "error",
        message: errorMessage,
      });
    });
  });

  describe("update", () => {
    it("deve atualizar uma área de conhecimento com status 200", async () => {
      const updatedArea = {
        id: 1,
        nome: "Exatas",
        descricao: "Área de ciências exatas e engenharias",
      };

      req.params.id = 1;
      req.body = { descricao: "Área de ciências exatas e engenharias" };

      AreaDeConhecimentoService.updateArea.mockResolvedValue(updatedArea);

      await AreaDeConhecimentoController.update(req, res);

      expect(AreaDeConhecimentoService.updateArea).toHaveBeenCalledWith(
        1,
        req.body,
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        message: "Área de conhecimento atualizada com sucesso",
        data: updatedArea,
      });
    });
  });

  describe("delete", () => {
    it("deve deletar uma área de conhecimento com status 200", async () => {
      req.params.id = 1;
      AreaDeConhecimentoService.deleteArea.mockResolvedValue(true);

      await AreaDeConhecimentoController.delete(req, res);

      expect(AreaDeConhecimentoService.deleteArea).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        message: "Área de conhecimento deletada com sucesso",
      });
    });
  });
});
