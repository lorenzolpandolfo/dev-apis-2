/**
 * Serviço de Salas
 */

const SalaRepository = require("../repositories/SalaRepository");

class SalaService {
  async getAllSalas() {
    return await SalaRepository.findAll();
  }

  async getSalaById(id) {
    const sala = await SalaRepository.findById(id);
    if (!sala) throw new Error("Sala não encontrada");
    return sala;
  }

  async createSala(data) {
    const { numero, descricao, lotacao } = data;
    if (!numero) throw new Error("Número da sala é obrigatório");
    if (lotacao == null || isNaN(lotacao))
      throw new Error("Lotação válida é obrigatória");

    const existing = await SalaRepository.findByNumero(numero);
    if (existing) throw new Error("Já existe uma sala com este número");

    return await SalaRepository.create({ numero, descricao, lotacao });
  }

  async updateSala(id, updates) {
    const sala = await this.getSalaById(id);
    if (updates.numero && updates.numero !== sala.numero) {
      const exist = await SalaRepository.findByNumero(updates.numero);
      if (exist) throw new Error("Já existe uma sala com este número");
    }
    return await SalaRepository.update(id, updates);
  }

  async deleteSala(id) {
    await this.getSalaById(id);
    return await SalaRepository.delete(id);
  }
}

module.exports = new SalaService();
