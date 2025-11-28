const MatrizCurricularController = require("../src/controllers/MatrizCurricularController");
const MatrizCurricularService = require("../src/services/MatrizCurricularService");

jest.mock("../src/services/MatrizCurricularService");

describe("MatrizCurricularController", () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it("deve retornar todas as matrizes curriculares", async () => {
    const mockMatrizes = [
      { id: 1, cursoId: 1, ano: 2023 },
      { id: 2, cursoId: 2, ano: 2023 },
    ];
    MatrizCurricularService.getAllMatrizes.mockResolvedValue(mockMatrizes);

    await MatrizCurricularController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: mockMatrizes,
    });
  });

  it("deve retornar uma matriz curricular por ID", async () => {
    const mockMatriz = { id: 1, cursoId: 1, ano: 2023 };
    req.params.id = 1;
    MatrizCurricularService.getMatrizById.mockResolvedValue(mockMatriz);

    await MatrizCurricularController.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: mockMatriz,
    });
  });

  it("deve retornar matrizes por curso", async () => {
    const mockMatrizes = [
      { id: 1, cursoId: 1, ano: 2023 },
      { id: 2, cursoId: 1, ano: 2024 },
    ];
    req.params.cursoId = 1;
    MatrizCurricularService.getMatrizesByCurso.mockResolvedValue(mockMatrizes);

    await MatrizCurricularController.getByCurso(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: mockMatrizes,
    });
  });

  it("deve criar uma nova matriz curricular", async () => {
    const newMatriz = { id: 3, cursoId: 1, ano: 2024 };
    req.body = { cursoId: 1, ano: 2024, disciplinas: [1, 2, 3] };
    MatrizCurricularService.createMatriz.mockResolvedValue(newMatriz);

    await MatrizCurricularController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: newMatriz,
      message: "Matriz curricular criada com sucesso",
    });
  });

  it("deve deletar uma matriz curricular", async () => {
    req.params.id = 1;
    MatrizCurricularService.deleteMatriz.mockResolvedValue(true);

    await MatrizCurricularController.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Matriz curricular deletada com sucesso",
    });
  });

  it("deve retornar erro 404 quando matriz não encontrada", async () => {
    req.params.id = 999;
    MatrizCurricularService.getMatrizById.mockRejectedValue(
      new Error("Matriz não encontrada")
    );

    await MatrizCurricularController.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});
