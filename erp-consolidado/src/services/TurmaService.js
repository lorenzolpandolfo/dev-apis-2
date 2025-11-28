/**
 * Serviço de Turmas (Módulo Cursos)
 */

const TurmaRepository = require("../repositories/TurmaRepository");
const MatriculaRepository = require("../repositories/MatriculaRepository");
const ProfessorRepository = require("../repositories/ProfessorRepository");

class TurmaService {
  async getAllClasses() {
    return await TurmaRepository.findAll();
  }

  async getClassById(id) {
    const turma = await TurmaRepository.findById(id);
    if (!turma) {
      throw new Error("Turma não encontrada");
    }
    return turma;
  }

  async createClass(turmaData) {
    const { nome, professorId, areaDeConhecimentoId, descricao, horario } =
      turmaData;

    if (!nome || !professorId) {
      throw new Error("Nome e professor são obrigatórios");
    }

    const professor = await ProfessorRepository.findById(professorId);
    if (!professor) {
      throw new Error("Professor não encontrado");
    }

    return await TurmaRepository.create({
      nome,
      professorId,
      areaDeConhecimentoId,
      descricao,
      horario,
      dataCriacao: new Date().toISOString(),
    });
  }

  async updateClass(id, turmaData) {
    const turma = await this.getClassById(id);

    if (turmaData.professorId && turmaData.professorId !== turma.professorId) {
      const professor = await ProfessorRepository.findById(
        turmaData.professorId
      );
      if (!professor) {
        throw new Error("Professor não encontrado");
      }
    }

    return await TurmaRepository.update(id, turmaData);
  }

  async deleteClass(id) {
    const turma = await this.getClassById(id);

    // Remover todas as matrículas da turma
    const matriculas = await MatriculaRepository.findByTurma(id);
    for (const matricula of matriculas) {
      await MatriculaRepository.delete(matricula.id);
    }

    return await TurmaRepository.delete(id);
  }

  async getClassStudents(turmaId) {
    const matriculas = await MatriculaRepository.findByTurma(turmaId);
    return matriculas;
  }

  async getClassesByProfessor(professorId) {
    return await TurmaRepository.findByProfessor(professorId);
  }

  async getClassesByArea(areaId) {
    return await TurmaRepository.findByArea(areaId);
  }
}

module.exports = new TurmaService();
