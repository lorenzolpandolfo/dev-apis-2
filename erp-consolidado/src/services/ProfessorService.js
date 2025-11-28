/**
 * Serviço de Professores (Módulo Cursos)
 */

const ProfessorRepository = require("../repositories/ProfessorRepository");
const TurmaRepository = require("../repositories/TurmaRepository");

class ProfessorService {
  async getAllProfessors() {
    return await ProfessorRepository.findAll();
  }

  async getProfessorById(id) {
    const professor = await ProfessorRepository.findById(id);
    if (!professor) {
      throw new Error("Professor não encontrado");
    }
    return professor;
  }

  async getProfessorByEmail(email) {
    return await ProfessorRepository.findByEmail(email);
  }

  async getProfessorByMatricula(matricula) {
    return await ProfessorRepository.findByMatricula(matricula);
  }

  async createProfessor(professorData) {
    const { matricula, nome, email, telefone, especialidade } = professorData;

    if (!matricula || !nome || !email) {
      throw new Error("Matrícula, nome e email são obrigatórios");
    }

    const existingByEmail = await ProfessorRepository.findByEmail(email);
    if (existingByEmail) {
      throw new Error("Já existe um professor com este email");
    }

    const existingByMatricula = await ProfessorRepository.findByMatricula(
      matricula
    );
    if (existingByMatricula) {
      throw new Error("Já existe um professor com esta matrícula");
    }

    return await ProfessorRepository.create({
      matricula,
      nome,
      email,
      telefone,
      especialidade,
    });
  }

  async updateProfessor(id, professorData) {
    const professor = await this.getProfessorById(id);

    if (professorData.email && professorData.email !== professor.email) {
      const existing = await ProfessorRepository.findByEmail(
        professorData.email
      );
      if (existing) {
        throw new Error("Email já cadastrado");
      }
    }

    if (
      professorData.matricula &&
      professorData.matricula !== professor.matricula
    ) {
      const existing = await ProfessorRepository.findByMatricula(
        professorData.matricula
      );
      if (existing) {
        throw new Error("Matrícula já cadastrada");
      }
    }

    return await ProfessorRepository.update(id, professorData);
  }

  async deleteProfessor(id) {
    const professor = await this.getProfessorById(id);
    return await ProfessorRepository.delete(id);
  }

  async getProfessorClasses(professorId) {
    return await TurmaRepository.findByProfessor(professorId);
  }
}

module.exports = new ProfessorService();
