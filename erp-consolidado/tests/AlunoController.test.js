const AlunoController = require("../src/controllers/AlunoController");
const AlunoService = require("../src/services/AlunoService");

jest.mock("../src/services/AlunoService");

describe("AlunoController", () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it("deve retornar todos os alunos", async () => {
    const mockAlunos = [
      { id: 1, nome: "João", matricula: "2023001" },
      { id: 2, nome: "Maria", matricula: "2023002" },
    ];
    AlunoService.getAllStudents.mockResolvedValue(mockAlunos);

    await AlunoController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: mockAlunos,
    });
  });

  it("deve retornar um aluno por ID", async () => {
    const mockAluno = { id: 1, nome: "João", matricula: "2023001" };
    req.params.id = 1;
    AlunoService.getStudentById.mockResolvedValue(mockAluno);

    await AlunoController.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: mockAluno,
    });
  });

  it("deve criar um novo aluno", async () => {
    const newAluno = { id: 3, nome: "Pedro", matricula: "2023003" };
    req.body = {
      nome: "Pedro",
      matricula: "2023003",
      email: "pedro@example.com",
      telefone: "11999999999",
    };
    AlunoService.createStudent.mockResolvedValue(newAluno);

    await AlunoController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Aluno criado com sucesso",
      data: newAluno,
    });
  });

  it("deve atualizar um aluno", async () => {
    const updatedAluno = { id: 1, nome: "João Silva", matricula: "2023001" };
    req.params.id = 1;
    req.body = { nome: "João Silva" };
    AlunoService.updateStudent.mockResolvedValue(updatedAluno);

    await AlunoController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Aluno atualizado com sucesso",
      data: updatedAluno,
    });
  });

  it("deve deletar um aluno", async () => {
    req.params.id = 1;
    AlunoService.deleteStudent.mockResolvedValue(true);

    await AlunoController.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Aluno deletado com sucesso",
    });
  });

  it("deve retornar erro 500 ao buscar alunos", async () => {
    AlunoService.getAllStudents.mockRejectedValue(new Error("Erro no banco"));

    await AlunoController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: "error",
      message: "Erro no banco",
    });
  });
});
