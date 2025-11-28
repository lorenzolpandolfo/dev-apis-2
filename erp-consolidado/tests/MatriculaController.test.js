const MatriculaController = require("../src/controllers/MatriculaController");
const MatriculaService = require("../src/services/MatriculaService");

jest.mock("../src/services/MatriculaService");

describe("MatriculaController", () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it("deve retornar todas as matrículas", async () => {
    const mockMatriculas = [
      { id: 1, alunoId: 1, turmaId: 1, dataMatricula: "2024-01-15" },
      { id: 2, alunoId: 2, turmaId: 2, dataMatricula: "2024-01-16" },
    ];
    MatriculaService.getAllEnrollments.mockResolvedValue(mockMatriculas);

    await MatriculaController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: mockMatriculas,
    });
  });

  it("deve retornar uma matrícula por ID", async () => {
    const mockMatricula = {
      id: 1,
      alunoId: 1,
      turmaId: 1,
      dataMatricula: "2024-01-15",
    };
    req.params.id = 1;
    MatriculaService.getEnrollmentById.mockResolvedValue(mockMatricula);

    await MatriculaController.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: mockMatricula,
    });
  });

  it("deve criar uma nova matrícula", async () => {
    const newMatricula = {
      id: 3,
      alunoId: 3,
      turmaId: 1,
      dataMatricula: "2024-01-17",
    };
    req.body = { alunoId: 3, turmaId: 1, dataMatricula: "2024-01-17" };
    MatriculaService.createEnrollment.mockResolvedValue(newMatricula);

    await MatriculaController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Matrícula criada com sucesso",
      data: newMatricula,
    });
  });

  it("deve atualizar uma matrícula", async () => {
    const updatedMatricula = {
      id: 1,
      alunoId: 1,
      turmaId: 2,
      dataMatricula: "2024-01-15",
    };
    req.params.id = 1;
    req.body = { turmaId: 2 };
    MatriculaService.updateEnrollment.mockResolvedValue(updatedMatricula);

    await MatriculaController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Matrícula atualizada com sucesso",
      data: updatedMatricula,
    });
  });

  it("deve deletar uma matrícula", async () => {
    req.params.id = 1;
    MatriculaService.deleteEnrollment.mockResolvedValue(true);

    await MatriculaController.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Matrícula deletada com sucesso",
    });
  });

  it("deve retornar erro 500 ao buscar matrículas", async () => {
    MatriculaService.getAllEnrollments.mockRejectedValue(
      new Error("Erro no banco")
    );

    await MatriculaController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
