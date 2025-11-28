/**
 * Controlador de Matrículas
 */

const MatriculaService = require("../services/MatriculaService");

class MatriculaController {
  async getAll(req, res) {
    try {
      const matriculas = await MatriculaService.getAllEnrollments();
      res.status(200).json({
        status: "success",
        data: matriculas,
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
      const matricula = await MatriculaService.getEnrollmentById(id);
      res.status(200).json({
        status: "success",
        data: matricula,
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
      const { alunoId, turmaId, dataMatricula } = req.body;
      const matricula = await MatriculaService.createEnrollment({
        alunoId,
        turmaId,
        dataMatricula,
      });
      res.status(201).json({
        status: "success",
        message: "Matrícula criada com sucesso",
        data: matricula,
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
      const matricula = await MatriculaService.updateEnrollment(id, req.body);
      res.status(200).json({
        status: "success",
        message: "Matrícula atualizada com sucesso",
        data: matricula,
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
      await MatriculaService.deleteEnrollment(id);
      res.status(200).json({
        status: "success",
        message: "Matrícula deletada com sucesso",
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getStudentEnrollments(req, res) {
    try {
      const { alunoId } = req.params;
      const enrollments = await MatriculaService.getStudentEnrollments(alunoId);
      res.status(200).json({
        status: "success",
        data: enrollments,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getClassEnrollments(req, res) {
    try {
      const { turmaId } = req.params;
      const enrollments = await MatriculaService.getClassEnrollments(turmaId);
      res.status(200).json({
        status: "success",
        data: enrollments,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = new MatriculaController();
