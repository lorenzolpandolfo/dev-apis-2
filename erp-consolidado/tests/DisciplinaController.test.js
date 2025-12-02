const DisciplinaController = require("../src/controllers/DisciplinaController");
const DisciplinaService = require("../src/services/DisciplinaService");

jest.mock("../src/services/DisciplinaService");

describe("DisciplinaController", () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it("deve retornar todas as disciplinas", async () => {
    const mockDisciplinas = [
      { id: 1, nome: "Matemática", semestre: 1 },
      { id: 2, nome: "Programação", semestre: 1 },
    ];
    DisciplinaService.getAllDisciplines.mockResolvedValue(mockDisciplinas);

    await DisciplinaController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: mockDisciplinas,
    });
  });

  it("deve retornar uma disciplina por ID", async () => {
    const mockDisciplina = { id: 1, nome: "Matemática", semestre: 1 };
    req.params.id = 1;
    DisciplinaService.getDisciplineById.mockResolvedValue(mockDisciplina);

    await DisciplinaController.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: mockDisciplina,
    });
  });

  it("deve retornar disciplinas por semestre", async () => {
    const mockDisciplinas = [
      { id: 1, nome: "Matemática", semestre: 1 },
      { id: 2, nome: "Programação", semestre: 1 },
    ];
    req.params.semestre = "1";
    DisciplinaService.getDisciplinesBySemestre.mockResolvedValue(
      mockDisciplinas,
    );

    await DisciplinaController.getBySemestre(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: mockDisciplinas,
    });
  });

  it("deve criar uma nova disciplina", async () => {
    const newDisciplina = { id: 3, nome: "Banco de Dados", semestre: 2 };
    req.body = { nome: "Banco de Dados", semestre: 2, cargaHoraria: 60 };
    DisciplinaService.createDiscipline.mockResolvedValue(newDisciplina);

    await DisciplinaController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: newDisciplina,
      message: "Disciplina criada com sucesso",
    });
  });

  it("deve atualizar uma disciplina", async () => {
    const updatedDisciplina = {
      id: 1,
      nome: "Matemática Aplicada",
      semestre: 1,
    };
    req.params.id = 1;
    req.body = { nome: "Matemática Aplicada" };
    DisciplinaService.updateDiscipline.mockResolvedValue(updatedDisciplina);

    await DisciplinaController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: updatedDisciplina,
      message: "Disciplina atualizada com sucesso",
    });
  });

  it("deve deletar uma disciplina", async () => {
    req.params.id = 1;
    DisciplinaService.deleteDiscipline.mockResolvedValue(true);

    await DisciplinaController.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Disciplina deletada com sucesso",
    });
  });

  it("deve retornar erro 500 ao buscar disciplinas", async () => {
    DisciplinaService.getAllDisciplines.mockRejectedValue(
      new Error("Erro ao buscar"),
    );

    await DisciplinaController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
