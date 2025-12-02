/**
 * Serviço de Alunos (Módulo Cursos)
 */

const AlunoRepository = require("../repositories/AlunoRepository");
const MatriculaRepository = require("../repositories/MatriculaRepository");

class AlunoService {
  async getAllStudents() {
    return await AlunoRepository.findAll();
  }

  async getStudentById(id) {
    const aluno = await AlunoRepository.findById(id);
    if (!aluno) {
      throw new Error("Aluno não encontrado");
    }
    return aluno;
  }

  async getStudentByEmail(email) {
    return await AlunoRepository.findByEmail(email);
  }

  async getStudentByMatricula(matricula) {
    return await AlunoRepository.findByMatricula(matricula);
  }

  async createStudent(alunoData) {
    const { matricula, nome, email, telefone } = alunoData;

    if (!matricula || !nome || !email) {
      throw new Error("Matrícula, nome e email são obrigatórios");
    }

    const existingByEmail = await AlunoRepository.findByEmail(email);
    if (existingByEmail) {
      throw new Error("Já existe um aluno com este email");
    }

    const existingByMatricula =
      await AlunoRepository.findByMatricula(matricula);
    if (existingByMatricula) {
      throw new Error("Já existe um aluno com esta matrícula");
    }

    return await AlunoRepository.create({
      matricula,
      nome,
      email,
      telefone,
    });
  }

  async updateStudent(id, alunoData) {
    const aluno = await this.getStudentById(id);

    if (alunoData.email && alunoData.email !== aluno.email) {
      const existing = await AlunoRepository.findByEmail(alunoData.email);
      if (existing) {
        throw new Error("Email já cadastrado");
      }
    }

    if (alunoData.matricula && alunoData.matricula !== aluno.matricula) {
      const existing = await AlunoRepository.findByMatricula(
        alunoData.matricula,
      );
      if (existing) {
        throw new Error("Matrícula já cadastrada");
      }
    }

    return await AlunoRepository.update(id, alunoData);
  }

  async deleteStudent(id) {
    const aluno = await this.getStudentById(id);
    const deleted = await AlunoRepository.delete(id);

    // Remover todas as matrículas do aluno
    const matriculas = await MatriculaRepository.findByAluno(id);
    for (const matricula of matriculas) {
      await MatriculaRepository.delete(matricula.id);
    }

    return deleted;
  }

  async getStudentClasses(alunoId) {
    const matriculas = await MatriculaRepository.findByAluno(alunoId);
    return matriculas;
  }
}

module.exports = new AlunoService();
