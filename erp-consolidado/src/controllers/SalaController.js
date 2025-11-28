/**
 * Controlador de Salas
 */

const SalaService = require("../services/SalaService");

class SalaController {
  async getAll(req, res) {
    try {
      const salas = await SalaService.getAllSalas();
      res.status(200).json({ status: "success", data: salas });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const sala = await SalaService.getSalaById(id);
      res.status(200).json({ status: "success", data: sala });
    } catch (error) {
      res.status(404).json({ status: "error", message: error.message });
    }
  }

  async create(req, res) {
    try {
      const { numero, descricao, lotacao } = req.body;
      const sala = await SalaService.createSala({ numero, descricao, lotacao });
      res
        .status(201)
        .json({ status: "success", message: "Sala criada", data: sala });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const sala = await SalaService.updateSala(id, req.body);
      res
        .status(200)
        .json({ status: "success", message: "Sala atualizada", data: sala });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await SalaService.deleteSala(id);
      res.status(200).json({ status: "success", message: "Sala deletada" });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  }
}

module.exports = new SalaController();
