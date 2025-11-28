/**
 * Controlador de Professores
 */

const ProfessorService = require("../services/ProfessorService");

class ProfessorController {
  async getAll(req, res) {
    try {
      const professors = await ProfessorService.getAllProfessors();
      res.status(200).json({
        status: "success",
        data: professors,
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
      const professor = await ProfessorService.getProfessorById(id);
      res.status(200).json({
        status: "success",
        data: professor,
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
      const { matricula, nome, email, telefone, especialidade } = req.body;
      const professor = await ProfessorService.createProfessor({
        matricula,
        nome,
        email,
        telefone,
        especialidade,
      });
      res.status(201).json({
        status: "success",
        message: "Professor criado com sucesso",
        data: professor,
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
      const professor = await ProfessorService.updateProfessor(id, req.body);
      res.status(200).json({
        status: "success",
        message: "Professor atualizado com sucesso",
        data: professor,
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
      await ProfessorService.deleteProfessor(id);
      res.status(200).json({
        status: "success",
        message: "Professor deletado com sucesso",
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getClasses(req, res) {
    try {
      const { id } = req.params;
      const classes = await ProfessorService.getProfessorClasses(id);
      res.status(200).json({
        status: "success",
        data: classes,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = new ProfessorController();
