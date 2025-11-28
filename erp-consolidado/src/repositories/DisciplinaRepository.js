/**
 * Repositório de Disciplinas
 */

const BaseRepository = require("./BaseRepository");
const { Disciplina } = require("../models/models");

class DisciplinaRepository extends BaseRepository {
  constructor() {
    super(Disciplina);
  }

  async findBySemestre(semestre) {
    return this.findManyBy("semestre", semestre);
  }

  async findByNome(nome) {
    return this.findOneBy("nome", nome);
  }
}

module.exports = new DisciplinaRepository();
