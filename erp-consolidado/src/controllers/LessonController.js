/**
 * Controlador de Aulas
 */

const LessonService = require("../services/LessonService");

class LessonController {
  async getAll(req, res) {
    try {
      const lessons = await LessonService.getAllLessons();
      res.status(200).json({
        status: "success",
        data: lessons,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const lesson = await LessonService.getLessonById(id);
      res.status(200).json({
        status: "success",
        data: lesson,
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async create(req, res) {
    try {
      const { classId, teacherId, title, date, duration, content } = req.body;
      const lesson = await LessonService.createLesson({
        classId,
        teacherId,
        title,
        date,
        duration,
        content,
      });
      res.status(201).json({
        status: "success",
        message: "Aula criada com sucesso",
        data: lesson,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const lesson = await LessonService.updateLesson(id, req.body);
      res.status(200).json({
        status: "success",
        message: "Aula atualizada com sucesso",
        data: lesson,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await LessonService.deleteLesson(id);
      res.status(200).json({
        status: "success",
        message: "Aula deletada com sucesso",
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getByClass(req, res) {
    try {
      const { classId } = req.params;
      const lessons = await LessonService.getLessonsByClass(classId);
      res.status(200).json({
        status: "success",
        data: lessons,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getByTeacher(req, res) {
    try {
      const { teacherId } = req.params;
      const lessons = await LessonService.getLessonsByTeacher(teacherId);
      res.status(200).json({
        status: "success",
        data: lessons,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = new LessonController();
