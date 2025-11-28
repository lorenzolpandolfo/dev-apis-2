/**
 * Repositório de Turmas (Módulo Cursos)
 */

const BaseRepository = require("./BaseRepository");
const { Turma } = require("../models/models");

class TurmaRepository extends BaseRepository {
  constructor() {
    super(Turma);
  }

  async findByProfessor(professorId) {
    return this.findManyBy({ professorId });
  }

  async findByArea(areaId) {
    return this.findManyBy({ areaDeConhecimentoId: areaId });
  }
}

module.exports = new TurmaRepository();
