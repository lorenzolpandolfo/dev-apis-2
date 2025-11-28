/**
 * Controlador de Turmas
 */

const TurmaService = require("../services/TurmaService");

class TurmaController {
  async getAll(req, res) {
    try {
      const turmas = await TurmaService.getAllClasses();
      res.status(200).json({
        status: "success",
        data: turmas,
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
      const turma = await TurmaService.getClassById(id);
      res.status(200).json({
        status: "success",
        data: turma,
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
      const { nome, professorId, areaDeConhecimentoId, descricao, horario } =
        req.body;
      const turma = await TurmaService.createClass({
        nome,
        professorId,
        areaDeConhecimentoId,
        descricao,
        horario,
      });
      res.status(201).json({
        status: "success",
        message: "Turma criada com sucesso",
        data: turma,
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
      const turma = await TurmaService.updateClass(id, req.body);
      res.status(200).json({
        status: "success",
        message: "Turma atualizada com sucesso",
        data: turma,
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
      await TurmaService.deleteClass(id);
      res.status(200).json({
        status: "success",
        message: "Turma deletada com sucesso",
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getStudents(req, res) {
    try {
      const { id } = req.params;
      const students = await TurmaService.getClassStudents(id);
      res.status(200).json({
        status: "success",
        data: students,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = new TurmaController();
