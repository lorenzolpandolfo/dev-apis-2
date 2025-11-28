/**
 * Repositório de Aulas (Módulo Classes)
 */

const BaseRepository = require("./BaseRepository");
const { Lesson } = require("../models/models");

class LessonRepository extends BaseRepository {
  constructor() {
    super(Lesson);
  }

  async findByClass(classId) {
    return this.findManyBy({ classId });
  }

  async findByDate(dataAula) {
    return this.findManyBy({ dataAula });
  }
}

module.exports = new LessonRepository();
