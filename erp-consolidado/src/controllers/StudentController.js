/**
 * Controlador de Estudantes
 */

const StudentService = require("../services/StudentService");

class StudentController {
  async getAll(req, res) {
    try {
      const students = await StudentService.getAllStudents();
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

  async getById(req, res) {
    try {
      const { id } = req.params;
      const student = await StudentService.getStudentById(id);
      res.status(200).json({
        status: "success",
        data: student,
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
      const { registration, name, email, phone } = req.body;
      const student = await StudentService.createStudent({
        registration,
        name,
        email,
        phone,
      });
      res.status(201).json({
        status: "success",
        message: "Estudante criado com sucesso",
        data: student,
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
      const student = await StudentService.updateStudent(id, req.body);
      res.status(200).json({
        status: "success",
        message: "Estudante atualizado com sucesso",
        data: student,
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
      await StudentService.deleteStudent(id);
      res.status(200).json({
        status: "success",
        message: "Estudante deletado com sucesso",
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
      const classes = await StudentService.getStudentClasses(id);
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

module.exports = new StudentController();
