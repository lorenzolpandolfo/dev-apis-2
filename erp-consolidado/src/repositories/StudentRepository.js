/**
 * Repositório de Estudantes/Classes (Módulo Classes)
 */

const BaseRepository = require("./BaseRepository");
const { Student } = require("../models/models");

class StudentRepository extends BaseRepository {
  constructor() {
    super(Student);
  }

  async findByEmail(email) {
    return this.findOneBy({ email });
  }

  async findByMatricula(matricula) {
    return this.findOneBy({ matricula });
  }

  async findByAtivos() {
    return this.findManyBy({ ativo: true });
  }
}

module.exports = new StudentRepository();
