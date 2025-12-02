const TurmaController = require("../src/controllers/TurmaController");
const TurmaService = require("../src/services/TurmaService");

jest.mock("../src/services/TurmaService");

describe("TurmaController", () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it("deve retornar todas as turmas", async () => {
    const mockTurmas = [
      { id: 1, semestre: 1, professorId: 1, disciplinaId: 1 },
      { id: 2, semestre: 2, professorId: 2, disciplinaId: 2 },
    ];
    TurmaService.getAllClasses.mockResolvedValue(mockTurmas);

    await TurmaController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: mockTurmas,
    });
  });

  it("deve retornar uma turma por ID", async () => {
    const mockTurma = { id: 1, semestre: 1, professorId: 1, disciplinaId: 1 };
    req.params.id = 1;
    TurmaService.getClassById.mockResolvedValue(mockTurma);

    await TurmaController.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: mockTurma,
    });
  });

  it("deve criar uma nova turma", async () => {
    const newTurma = { id: 3, semestre: 1, professorId: 1, disciplinaId: 1 };
    req.body = { semestre: 1, professorId: 1, disciplinaId: 1 };
    TurmaService.createClass.mockResolvedValue(newTurma);

    await TurmaController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Turma criada com sucesso",
      data: newTurma,
    });
  });

  it("deve atualizar uma turma", async () => {
    const updatedTurma = {
      id: 1,
      semestre: 2,
      professorId: 2,
      disciplinaId: 1,
    };
    req.params.id = 1;
    req.body = { semestre: 2, professorId: 2 };
    TurmaService.updateClass.mockResolvedValue(updatedTurma);

    await TurmaController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Turma atualizada com sucesso",
      data: updatedTurma,
    });
  });

  it("deve deletar uma turma", async () => {
    req.params.id = 1;
    TurmaService.deleteClass.mockResolvedValue(true);

    await TurmaController.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Turma deletada com sucesso",
    });
  });

  it("deve retornar erro 404 quando turma não encontrada", async () => {
    req.params.id = 999;
    TurmaService.getClassById.mockRejectedValue(
      new Error("Turma não encontrada"),
    );

    await TurmaController.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});
