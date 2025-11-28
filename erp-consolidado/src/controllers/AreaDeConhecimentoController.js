/**
 * Controlador de Áreas de Conhecimento
 */

const AreaDeConhecimentoService = require("../services/AreaDeConhecimentoService");

class AreaDeConhecimentoController {
  async getAll(req, res) {
    try {
      const areas = await AreaDeConhecimentoService.getAllAreas();
      res.status(200).json({
        status: "success",
        data: areas,
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
      const area = await AreaDeConhecimentoService.getAreaById(id);
      res.status(200).json({
        status: "success",
        data: area,
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
      const { nome, descricao } = req.body;
      const area = await AreaDeConhecimentoService.createArea({
        nome,
        descricao,
      });
      res.status(201).json({
        status: "success",
        message: "Área de conhecimento criada com sucesso",
        data: area,
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
      const area = await AreaDeConhecimentoService.updateArea(id, req.body);
      res.status(200).json({
        status: "success",
        message: "Área de conhecimento atualizada com sucesso",
        data: area,
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
      await AreaDeConhecimentoService.deleteArea(id);
      res.status(200).json({
        status: "success",
        message: "Área de conhecimento deletada com sucesso",
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = new AreaDeConhecimentoController();
