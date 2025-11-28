/**
 * Serviço de Aulas (Módulo Classes)
 */

const LessonRepository = require("../repositories/LessonRepository");
const ClassRepository = require("../repositories/ClassRepository");

class LessonService {
  async getAllLessons() {
    return await LessonRepository.findAll();
  }

  async getLessonById(id) {
    const lesson = await LessonRepository.findById(id);
    if (!lesson) {
      throw new Error("Aula não encontrada");
    }
    return lesson;
  }

  async createLesson(lessonData) {
    const { classId, teacherId, title, date, duration, content } = lessonData;

    if (!classId || !teacherId || !title || !date) {
      throw new Error("Classe, professor, título e data são obrigatórios");
    }

    const classObj = await ClassRepository.findById(classId);
    if (!classObj) {
      throw new Error("Classe não encontrada");
    }

    return await LessonRepository.create({
      classId,
      teacherId,
      title,
      date,
      duration,
      content,
      createdAt: new Date().toISOString(),
    });
  }

  async updateLesson(id, lessonData) {
    const lesson = await this.getLessonById(id);
    return await LessonRepository.update(id, lessonData);
  }

  async deleteLesson(id) {
    const lesson = await this.getLessonById(id);
    return await LessonRepository.delete(id);
  }

  async getLessonsByClass(classId) {
    return await LessonRepository.findByClass(classId);
  }

  async getLessonsByTeacher(teacherId) {
    return await LessonRepository.findByTeacher(teacherId);
  }

  async getLessonsByDate(date) {
    return await LessonRepository.findByDate(date);
  }
}

module.exports = new LessonService();
