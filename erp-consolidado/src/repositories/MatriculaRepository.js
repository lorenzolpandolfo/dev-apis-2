/**
 * Repositório de Matrículas (Módulo Cursos)
 */

const BaseRepository = require("./BaseRepository");
const { Matricula } = require("../models/models");

class MatriculaRepository extends BaseRepository {
  constructor() {
    super(Matricula);
  }

  async findByAluno(alunoId) {
    return this.findManyBy({ alunoId });
  }

  async findByTurma(turmaId) {
    return this.findManyBy({ turmaId });
  }

  async findByAlunoAndTurma(alunoId, turmaId) {
    return this.findOneBy({ alunoId, turmaId });
  }
}

module.exports = new MatriculaRepository();
