/**
 * Repositório de Alunos (Módulo Cursos)
 */

const BaseRepository = require("./BaseRepository");

class AlunoRepository extends BaseRepository {
  constructor() {
    super("alunos");
  }

  async findByEmail(email) {
    return this.findOneBy("email", email);
  }

  async findByMatricula(matricula) {
    return this.findOneBy("matricula", matricula);
  }

  async findByTurma(turmaId) {
    return this.findManyBy("turmaId", turmaId);
  }
}

module.exports = new AlunoRepository();
