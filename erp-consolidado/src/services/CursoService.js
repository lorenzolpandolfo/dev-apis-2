/**
 * Serviço de Cursos
 */

const CursoRepository = require("../repositories/CursoRepository");
const AreaDeConhecimentoRepository = require("../repositories/AreaDeConhecimentoRepository");

class CursoService {
  async getAllCourses() {
    return await CursoRepository.findAllWithArea();
  }

  async getCourseById(id) {
    const curso = await CursoRepository.findByIdWithArea(id);
    if (!curso) {
      throw new Error("Curso não encontrado");
    }
    return curso;
  }

  async getCourseByName(nome) {
    return await CursoRepository.findByNome(nome);
  }

  async createCourse(courseData) {
    const {
      nome,
      descricao,
      areaDeConhecimentoId,
      cargaHoraria,
      numeroSemestres,
      modalidade,
    } = courseData;

    if (
      !nome ||
      !areaDeConhecimentoId ||
      !cargaHoraria ||
      !numeroSemestres ||
      !modalidade
    ) {
      throw new Error(
        "Nome, área de conhecimento, carga horária, número de semestres e modalidade são obrigatórios"
      );
    }

    const existingCourse = await CursoRepository.findByNome(nome);
    if (existingCourse) {
      throw new Error("Já existe um curso com este nome");
    }

    const area = await AreaDeConhecimentoRepository.findById(
      areaDeConhecimentoId
    );
    if (!area) {
      throw new Error("Área de conhecimento não encontrada");
    }

    if (cargaHoraria <= 0) {
      throw new Error("Carga horária deve ser maior que zero");
    }

    if (numeroSemestres <= 0) {
      throw new Error("Número de semestres deve ser maior que zero");
    }

    return await CursoRepository.create({
      nome,
      descricao,
      areaDeConhecimentoId,
      cargaHoraria,
      numeroSemestres,
      modalidade,
    });
  }

  async updateCourse(id, courseData) {
    const curso = await this.getCourseById(id);

    if (courseData.nome && courseData.nome !== curso.nome) {
      const existing = await CursoRepository.findByNome(courseData.nome);
      if (existing) {
        throw new Error("Já existe um curso com este nome");
      }
    }

    if (
      courseData.areaDeConhecimentoId &&
      courseData.areaDeConhecimentoId !== curso.areaDeConhecimentoId
    ) {
      const area = await AreaDeConhecimentoRepository.findById(
        courseData.areaDeConhecimentoId
      );
      if (!area) {
        throw new Error("Área de conhecimento não encontrada");
      }
    }

    if (courseData.cargaHoraria && courseData.cargaHoraria <= 0) {
      throw new Error("Carga horária deve ser maior que zero");
    }

    if (courseData.numeroSemestres && courseData.numeroSemestres <= 0) {
      throw new Error("Número de semestres deve ser maior que zero");
    }

    return await CursoRepository.update(id, courseData);
  }

  async deleteCourse(id) {
    const curso = await this.getCourseById(id);
    const deleted = await CursoRepository.delete(id);

    if (!deleted) {
      throw new Error("Erro ao deletar curso");
    }

    return { message: "Curso deletado com sucesso" };
  }
}

module.exports = new CursoService();
