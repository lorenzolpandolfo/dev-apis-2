/**
 * Controlador de Matrizes Curriculares
 */

const MatrizCurricularService = require("../services/MatrizCurricularService");

class MatrizCurricularController {
  async getAll(req, res) {
    try {
      const matrizes = await MatrizCurricularService.getAllMatrizes();
      res.status(200).json({
        status: "success",
        data: matrizes,
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
      const matriz = await MatrizCurricularService.getMatrizById(id);
      res.status(200).json({
        status: "success",
        data: matriz,
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getByCurso(req, res) {
    try {
      const { cursoId } = req.params;
      const matrizes = await MatrizCurricularService.getMatrizesByCurso(
        cursoId
      );
      res.status(200).json({
        status: "success",
        data: matrizes,
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
      const { cursoId, ano, disciplinas } = req.body;

      const matriz = await MatrizCurricularService.createMatriz({
        cursoId,
        ano,
        disciplinas,
      });

      res.status(201).json({
        status: "success",
        data: matriz,
        message: "Matriz curricular criada com sucesso",
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async addDisciplina(req, res) {
    try {
      const { matrizId, disciplinaId } = req.body;

      await MatrizCurricularService.addDisciplinaToMatriz(
        matrizId,
        disciplinaId
      );
      const matriz = await MatrizCurricularService.getMatrizById(matrizId);

      res.status(200).json({
        status: "success",
        data: matriz,
        message: "Disciplina adicionada à matriz com sucesso",
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async removeDisciplina(req, res) {
    try {
      const { matrizId, disciplinaId } = req.params;

      await MatrizCurricularService.removeDisciplinaFromMatriz(
        matrizId,
        disciplinaId
      );
      const matriz = await MatrizCurricularService.getMatrizById(matrizId);

      res.status(200).json({
        status: "success",
        data: matriz,
        message: "Disciplina removida da matriz com sucesso",
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
      const matriz = await MatrizCurricularService.updateMatriz(id, req.body);

      res.status(200).json({
        status: "success",
        data: matriz,
        message: "Matriz curricular atualizada com sucesso",
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
      await MatrizCurricularService.deleteMatriz(id);

      res.status(200).json({
        status: "success",
        message: "Matriz curricular deletada com sucesso",
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = new MatrizCurricularController();
