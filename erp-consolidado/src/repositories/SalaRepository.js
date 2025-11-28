/**
 * Repositório de Salas
 */

const BaseRepository = require("./BaseRepository");
const { Sala } = require("../models/models");

class SalaRepository extends BaseRepository {
  constructor() {
    super(Sala);
  }

  async findByNumero(numero) {
    return this.findOneBy({ numero });
  }
}

module.exports = new SalaRepository();
