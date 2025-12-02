const CursoController = require("../src/controllers/CursoController");
const CursoService = require("../src/services/CursoService");

jest.mock("../src/services/CursoService");

describe("CursoController", () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it("deve retornar todos os cursos", async () => {
    const mockCursos = [
      { id: 1, nome: "Engenharia", descricao: "Curso de Engenharia" },
      { id: 2, nome: "Administração", descricao: "Curso de Administração" },
    ];
    CursoService.getAllCourses.mockResolvedValue(mockCursos);

    await CursoController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: mockCursos,
    });
  });

  it("deve retornar um curso por ID", async () => {
    const mockCurso = {
      id: 1,
      nome: "Engenharia",
      descricao: "Curso de Engenharia",
    };
    req.params.id = 1;
    CursoService.getCourseById.mockResolvedValue(mockCurso);

    await CursoController.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: mockCurso,
    });
  });

  it("deve criar um novo curso", async () => {
    const newCurso = {
      id: 3,
      nome: "Medicina",
      descricao: "Curso de Medicina",
    };
    req.body = {
      nome: "Medicina",
      descricao: "Curso de Medicina",
      areaDeConhecimentoId: 1,
    };
    CursoService.createCourse.mockResolvedValue(newCurso);

    await CursoController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: newCurso,
      message: "Curso criado com sucesso",
    });
  });

  it("deve atualizar um curso", async () => {
    const updatedCurso = {
      id: 1,
      nome: "Engenharia Atualizada",
      descricao: "Novo descrição",
    };
    req.params.id = 1;
    req.body = { descricao: "Novo descrição" };
    CursoService.updateCourse.mockResolvedValue(updatedCurso);

    await CursoController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: updatedCurso,
      message: "Curso atualizado com sucesso",
    });
  });

  it("deve deletar um curso", async () => {
    req.params.id = 1;
    CursoService.deleteCourse.mockResolvedValue(true);

    await CursoController.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Curso deletado com sucesso",
    });
  });

  it("deve retornar erro 404 quando curso não encontrado", async () => {
    req.params.id = 999;
    CursoService.getCourseById.mockRejectedValue(
      new Error("Curso não encontrado"),
    );

    await CursoController.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});
