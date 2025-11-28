/**
 * Serviço de Matrículas (Módulo Cursos)
 */

const MatriculaRepository = require("../repositories/MatriculaRepository");
const AlunoRepository = require("../repositories/AlunoRepository");
const TurmaRepository = require("../repositories/TurmaRepository");

class MatriculaService {
  async getAllEnrollments() {
    return await MatriculaRepository.findAll();
  }

  async getEnrollmentById(id) {
    const matricula = await MatriculaRepository.findById(id);
    if (!matricula) {
      throw new Error("Matrícula não encontrada");
    }
    return matricula;
  }

  async createEnrollment(matriculaData) {
    const { alunoId, turmaId, dataEnrollment } = matriculaData;

    if (!alunoId || !turmaId) {
      throw new Error("Aluno e turma são obrigatórios");
    }

    const aluno = await AlunoRepository.findById(alunoId);
    if (!aluno) {
      throw new Error("Aluno não encontrado");
    }

    const turma = await TurmaRepository.findById(turmaId);
    if (!turma) {
      throw new Error("Turma não encontrada");
    }

    const existing = await MatriculaRepository.findByAlunoAndTurma(
      alunoId,
      turmaId
    );
    if (existing) {
      throw new Error("Aluno já matriculado nesta turma");
    }

    return await MatriculaRepository.create({
      alunoId,
      turmaId,
      dataEnrollment: dataEnrollment || new Date().toISOString(),
      status: "ativa",
    });
  }

  async updateEnrollment(id, matriculaData) {
    const matricula = await this.getEnrollmentById(id);
    return await MatriculaRepository.update(id, matriculaData);
  }

  async deleteEnrollment(id) {
    const matricula = await this.getEnrollmentById(id);
    return await MatriculaRepository.delete(id);
  }

  async getStudentEnrollments(alunoId) {
    return await MatriculaRepository.findByAluno(alunoId);
  }

  async getClassEnrollments(turmaId) {
    return await MatriculaRepository.findByTurma(turmaId);
  }
}

module.exports = new MatriculaService();
