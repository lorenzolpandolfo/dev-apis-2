/**
 * Controlador de Classes
 */

const ClassService = require("../services/ClassService");

class ClassController {
  async getAll(req, res) {
    try {
      const classes = await ClassService.getAllClasses();
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

  async getById(req, res) {
    try {
      const { id } = req.params;
      const classData = await ClassService.getClassById(id);
      res.status(200).json({
        status: "success",
        data: classData,
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
      const { nome, professorId, descricao, comeco, fim } = req.body;
      const classData = await ClassService.createClass({
        nome,
        professorId,
        descricao,
        comeco,
        fim,
      });
      res.status(201).json({
        status: "success",
        message: "Classe criada com sucesso",
        data: classData,
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
      const classData = await ClassService.updateClass(id, req.body);
      res.status(200).json({
        status: "success",
        message: "Classe atualizada com sucesso",
        data: classData,
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
      await ClassService.deleteClass(id);
      res.status(200).json({
        status: "success",
        message: "Classe deletada com sucesso",
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getByTeacher(req, res) {
    try {
      const { teacherId } = req.params;
      const classes = await ClassService.getClassesByTeacher(teacherId);
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

module.exports = new ClassController();
