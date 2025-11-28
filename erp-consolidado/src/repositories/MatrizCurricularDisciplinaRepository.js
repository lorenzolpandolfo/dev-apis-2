/**
 * Repositório de Matrizes Curriculares - Disciplinas
 */

const BaseRepository = require("./BaseRepository");
const { MatrizCurricularDisciplina, Disciplina } = require("../models/models");

class MatrizCurricularDisciplinaRepository extends BaseRepository {
  constructor() {
    super(MatrizCurricularDisciplina);
  }

  async findByMatrizId(matrizCurricularId) {
    return this.model.findAll({
      where: { matrizCurricularId },
      include: [Disciplina],
      order: [["createdAt", "ASC"]],
    });
  }

  async findByMatrizIdOrderedBySemestre(matrizCurricularId) {
    return this.model.findAll({
      where: { matrizCurricularId },
      include: [
        {
          model: Disciplina,
          order: [["semestre", "ASC"]],
        },
      ],
    });
  }

  async findByMatrizAndDisciplina(matrizCurricularId, disciplinaId) {
    return this.model.findOne({
      where: { matrizCurricularId, disciplinaId },
    });
  }

  async deleteByMatrizId(matrizCurricularId) {
    return this.model.destroy({
      where: { matrizCurricularId },
    });
  }
}

module.exports = new MatrizCurricularDisciplinaRepository();
