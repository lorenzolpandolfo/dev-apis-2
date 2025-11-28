/**
 * Serviço de Disciplinas
 */

const DisciplinaRepository = require("../repositories/DisciplinaRepository");

class DisciplinaService {
  async getAllDisciplines() {
    return await DisciplinaRepository.findAll({
      order: [
        ["semestre", "ASC"],
        ["nome", "ASC"],
      ],
    });
  }

  async getDisciplineById(id) {
    const disciplina = await DisciplinaRepository.findById(id);
    if (!disciplina) {
      throw new Error("Disciplina não encontrada");
    }
    return disciplina;
  }

  async getDisciplineByName(nome) {
    return await DisciplinaRepository.findByNome(nome);
  }

  async getDisciplinesBySemestre(semestre) {
    return await DisciplinaRepository.findBySemestre(semestre);
  }

  async createDiscipline(disciplineData) {
    const { nome, descricao, cargaHoraria, semestre } = disciplineData;

    if (!nome || !cargaHoraria || !semestre) {
      throw new Error("Nome, carga horária e semestre são obrigatórios");
    }

    const existingDiscipline = await DisciplinaRepository.findByNome(nome);
    if (existingDiscipline) {
      throw new Error("Já existe uma disciplina com este nome");
    }

    if (cargaHoraria <= 0) {
      throw new Error("Carga horária deve ser maior que zero");
    }

    if (semestre <= 0) {
      throw new Error("Semestre deve ser maior que zero");
    }

    return await DisciplinaRepository.create({
      nome,
      descricao,
      cargaHoraria,
      semestre,
    });
  }

  async updateDiscipline(id, disciplineData) {
    const disciplina = await this.getDisciplineById(id);

    if (disciplineData.nome && disciplineData.nome !== disciplina.nome) {
      const existing = await DisciplinaRepository.findByNome(
        disciplineData.nome
      );
      if (existing) {
        throw new Error("Já existe uma disciplina com este nome");
      }
    }

    if (disciplineData.cargaHoraria && disciplineData.cargaHoraria <= 0) {
      throw new Error("Carga horária deve ser maior que zero");
    }

    if (disciplineData.semestre && disciplineData.semestre <= 0) {
      throw new Error("Semestre deve ser maior que zero");
    }

    return await DisciplinaRepository.update(id, disciplineData);
  }

  async deleteDiscipline(id) {
    const disciplina = await this.getDisciplineById(id);
    const deleted = await DisciplinaRepository.delete(id);

    if (!deleted) {
      throw new Error("Erro ao deletar disciplina");
    }

    return { message: "Disciplina deletada com sucesso" };
  }
}

module.exports = new DisciplinaService();
