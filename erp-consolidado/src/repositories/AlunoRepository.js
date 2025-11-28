/**
 * Repositório de Alunos (Módulo Cursos)
 */

const BaseRepository = require("./BaseRepository");
const { Aluno } = require("../models/models");

class AlunoRepository extends BaseRepository {
  constructor() {
    super(Aluno);
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

module.exports = new AlunoRepository();
