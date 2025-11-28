/**
 * Controlador de Clientes
 */

const ClientService = require("../services/ClientService");

class ClientController {
  async getAll(req, res) {
    try {
      const clients = await ClientService.getAllClients();
      res.status(200).json({
        status: "success",
        data: clients,
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
      const client = await ClientService.getClientById(id);
      res.status(200).json({
        status: "success",
        data: client,
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
      const { nome, email, cpf, telefone, endereco, cidade } = req.body;
      const client = await ClientService.createClient({
        nome,
        email,
        cpf,
        telefone,
        endereco,
        cidade,
      });
      res.status(201).json({
        status: "success",
        message: "Cliente criado com sucesso",
        data: client,
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
      const client = await ClientService.updateClient(id, req.body);
      res.status(200).json({
        status: "success",
        message: "Cliente atualizado com sucesso",
        data: client,
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
      await ClientService.deleteClient(id);
      res.status(200).json({
        status: "success",
        message: "Cliente deletado com sucesso",
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getActive(req, res) {
    try {
      const clients = await ClientService.getActiveClients();
      res.status(200).json({
        status: "success",
        data: clients,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = new ClientController();
