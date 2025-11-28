/**
 * Repositório de Cursos
 */

const BaseRepository = require("./BaseRepository");
const { Curso } = require("../models/models");

class CursoRepository extends BaseRepository {
  constructor() {
    super(Curso);
  }

  async findByNome(nome) {
    return this.findOneBy("nome", nome);
  }

  async findAllWithArea() {
    return this.model.findAll({
      include: ["AreaDeConhecimento"],
    });
  }

  async findByIdWithArea(id) {
    return this.model.findByPk(id, {
      include: ["AreaDeConhecimento"],
    });
  }
}

module.exports = new CursoRepository();
