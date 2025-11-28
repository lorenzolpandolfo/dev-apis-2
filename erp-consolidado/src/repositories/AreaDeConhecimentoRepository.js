/**
 * Repositório de Áreas de Conhecimento (Módulo Áreas)
 */

const BaseRepository = require("./BaseRepository");
const { AreaDeConhecimento } = require("../models/models");

class AreaDeConhecimentoRepository extends BaseRepository {
  constructor() {
    super(AreaDeConhecimento);
  }

  async findByNome(nome) {
    return this.findOneBy({ nome });
  }
}

module.exports = new AreaDeConhecimentoRepository();
