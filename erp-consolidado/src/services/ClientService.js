/**
 * Serviço de Clientes (Módulo Produtos)
 */

const ClientRepository = require("../repositories/ClientRepository");

class ClientService {
  async getAllClients() {
    return await ClientRepository.findAll();
  }

  async getClientById(id) {
    const client = await ClientRepository.findById(id);
    if (!client) {
      throw new Error("Cliente não encontrado");
    }
    return client;
  }

  async getClientByEmail(email) {
    const client = await ClientRepository.findByEmail(email);
    if (!client) {
      throw new Error("Cliente não encontrado");
    }
    return client;
  }

  async getClientByCpf(cpf) {
    const client = await ClientRepository.findByCpf(cpf);
    if (!client) {
      throw new Error("Cliente não encontrado");
    }
    return client;
  }

  async createClient(clientData) {
    const { nome, email, cpf, telefone, endereco, cidade } = clientData;

    if (!nome || !email || !cpf) {
      throw new Error("Nome, email e CPF são obrigatórios");
    }

    const existingEmail = await ClientRepository.findByEmail(email);
    if (existingEmail) {
      throw new Error("Email já cadastrado");
    }

    const existingCpf = await ClientRepository.findByCpf(cpf);
    if (existingCpf) {
      throw new Error("CPF já cadastrado");
    }

    return await ClientRepository.create({
      nome,
      email,
      cpf,
      telefone,
      endereco,
      cidade,
      active: true,
      createdAt: new Date().toISOString(),
    });
  }

  async updateClient(id, clientData) {
    const client = await this.getClientById(id);

    if (clientData.email && clientData.email !== client.email) {
      const existing = await ClientRepository.findByEmail(clientData.email);
      if (existing) {
        throw new Error("Email já cadastrado");
      }
    }

    if (clientData.cpf && clientData.cpf !== client.cpf) {
      const existing = await ClientRepository.findByCpf(clientData.cpf);
      if (existing) {
        throw new Error("CPF já cadastrado");
      }
    }

    return await ClientRepository.update(id, clientData);
  }

  async deleteClient(id) {
    const client = await this.getClientById(id);
    return await ClientRepository.delete(id);
  }

  async getClientsByCity(city) {
    return await ClientRepository.findByCity(city);
  }

  async getActiveClients() {
    return await ClientRepository.findActive();
  }
}

module.exports = new ClientService();
