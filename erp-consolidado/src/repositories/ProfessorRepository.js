/**
 * Repositório de Professores (Módulo Cursos)
 */

const BaseRepository = require("./BaseRepository");
const { Professor } = require("../models/models");

class ProfessorRepository extends BaseRepository {
  constructor() {
    super(Professor);
  }

  async findByEmail(email) {
    return this.findOneBy({ email });
  }

  async findByMatricula(matricula) {
    return this.findOneBy({ matricula });
  }

  async findByTurma(turmaId) {
    return this.findManyBy({ turmaId });
  }
}

module.exports = new ProfessorRepository();
