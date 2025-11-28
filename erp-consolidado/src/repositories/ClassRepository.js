/**
 * Repositório de Classes (Módulo Classes)
 */

const BaseRepository = require("./BaseRepository");
const { Class } = require("../models/models");

class ClassRepository extends BaseRepository {
  constructor() {
    super(Class);
  }

  async findByProfessor(professorId) {
    return this.findManyBy({ professorId });
  }

  async findByCodigo(codigo) {
    return this.findOneBy({ codigo });
  }
}

module.exports = new ClassRepository();
