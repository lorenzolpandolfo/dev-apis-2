/**
 * Controlador de Alunos
 */

const AlunoService = require("../services/AlunoService");

class AlunoController {
  async getAll(req, res) {
    try {
      const alunos = await AlunoService.getAllStudents();
      res.status(200).json({
        status: "success",
        data: alunos,
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
      const aluno = await AlunoService.getStudentById(id);
      res.status(200).json({
        status: "success",
        data: aluno,
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
      const { matricula, nome, email, telefone } = req.body;
      const aluno = await AlunoService.createStudent({
        matricula,
        nome,
        email,
        telefone,
      });
      res.status(201).json({
        status: "success",
        message: "Aluno criado com sucesso",
        data: aluno,
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
      const aluno = await AlunoService.updateStudent(id, req.body);
      res.status(200).json({
        status: "success",
        message: "Aluno atualizado com sucesso",
        data: aluno,
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
      await AlunoService.deleteStudent(id);
      res.status(200).json({
        status: "success",
        message: "Aluno deletado com sucesso",
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
      const classes = await AlunoService.getStudentClasses(id);
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

module.exports = new AlunoController();
