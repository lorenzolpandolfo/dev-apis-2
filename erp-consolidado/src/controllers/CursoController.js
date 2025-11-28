/**
 * Controlador de Cursos
 */

const CursoService = require("../services/CursoService");

class CursoController {
  async getAll(req, res) {
    try {
      const cursos = await CursoService.getAllCourses();
      res.status(200).json({
        status: "success",
        data: cursos,
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
      const curso = await CursoService.getCourseById(id);
      res.status(200).json({
        status: "success",
        data: curso,
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
      const {
        nome,
        descricao,
        areaDeConhecimentoId,
        cargaHoraria,
        numeroSemestres,
        modalidade,
      } = req.body;

      const curso = await CursoService.createCourse({
        nome,
        descricao,
        areaDeConhecimentoId,
        cargaHoraria,
        numeroSemestres,
        modalidade,
      });

      res.status(201).json({
        status: "success",
        data: curso,
        message: "Curso criado com sucesso",
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
      const curso = await CursoService.updateCourse(id, req.body);

      res.status(200).json({
        status: "success",
        data: curso,
        message: "Curso atualizado com sucesso",
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
      await CursoService.deleteCourse(id);

      res.status(200).json({
        status: "success",
        message: "Curso deletado com sucesso",
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = new CursoController();
