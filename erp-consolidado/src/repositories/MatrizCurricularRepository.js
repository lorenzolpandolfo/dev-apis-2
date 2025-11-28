/**
 * Repositório de Matrizes Curriculares
 */

const BaseRepository = require("./BaseRepository");
const {
  MatrizCurricular,
  Curso,
  AreaDeConhecimento,
  MatrizCurricularDisciplina,
  Disciplina,
} = require("../models/models");

class MatrizCurricularRepository extends BaseRepository {
  constructor() {
    super(MatrizCurricular);
  }

  async findByCursoAndAno(cursoId, ano) {
    return this.model.findOne({
      where: { cursoId, ano },
    });
  }

  async findByCursoId(cursoId) {
    return this.model.findAll({
      where: { cursoId },
      include: ["Curso"],
    });
  }

  async findByIdWithDisciplinas(id) {
    return this.model.findByPk(id, {
      include: [
        {
          model: Curso,
          include: [AreaDeConhecimento],
        },
        {
          model: MatrizCurricularDisciplina,
          include: [Disciplina],
        },
      ],
    });
  }

  async findAllWithCurso() {
    return this.model.findAll({
      include: [
        {
          model: Curso,
          include: [AreaDeConhecimento],
        },
        {
          model: MatrizCurricularDisciplina,
          include: [Disciplina],
        },
      ],
    });
  }
}

module.exports = new MatrizCurricularRepository();
