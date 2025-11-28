/**
 * Controlador de Disciplinas
 */

const DisciplinaService = require("../services/DisciplinaService");

class DisciplinaController {
  async getAll(req, res) {
    try {
      const disciplinas = await DisciplinaService.getAllDisciplines();
      res.status(200).json({
        status: "success",
        data: disciplinas,
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
      const disciplina = await DisciplinaService.getDisciplineById(id);
      res.status(200).json({
        status: "success",
        data: disciplina,
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getBySemestre(req, res) {
    try {
      const { semestre } = req.params;
      const disciplinas = await DisciplinaService.getDisciplinesBySemestre(
        parseInt(semestre)
      );
      res.status(200).json({
        status: "success",
        data: disciplinas,
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
      const { nome, descricao, cargaHoraria, semestre } = req.body;

      const disciplina = await DisciplinaService.createDiscipline({
        nome,
        descricao,
        cargaHoraria,
        semestre,
      });

      res.status(201).json({
        status: "success",
        data: disciplina,
        message: "Disciplina criada com sucesso",
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
      const disciplina = await DisciplinaService.updateDiscipline(id, req.body);

      res.status(200).json({
        status: "success",
        data: disciplina,
        message: "Disciplina atualizada com sucesso",
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
      await DisciplinaService.deleteDiscipline(id);

      res.status(200).json({
        status: "success",
        message: "Disciplina deletada com sucesso",
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = new DisciplinaController();
