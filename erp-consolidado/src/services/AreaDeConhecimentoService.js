/**
 * Serviço de Áreas de Conhecimento (Módulo Áreas)
 */

const AreaDeConhecimentoRepository = require("../repositories/AreaDeConhecimentoRepository");

class AreaDeConhecimentoService {
  async getAllAreas() {
    return await AreaDeConhecimentoRepository.findAll();
  }

  async getAreaById(id) {
    const area = await AreaDeConhecimentoRepository.findById(id);
    if (!area) {
      throw new Error("Área de conhecimento não encontrada");
    }
    return area;
  }

  async createArea(areaData) {
    const { nome, descricao } = areaData;

    if (!nome || !descricao) {
      throw new Error("Nome e descrição são obrigatórios");
    }

    const existing = await AreaDeConhecimentoRepository.findByName(nome);
    if (existing) {
      throw new Error("Área com este nome já existe");
    }

    return await AreaDeConhecimentoRepository.create({
      nome,
      descricao,
    });
  }

  async updateArea(id, areaData) {
    const area = await this.getAreaById(id);

    if (areaData.nome && areaData.nome !== area.nome) {
      const existing = await AreaDeConhecimentoRepository.findByName(
        areaData.nome
      );
      if (existing) {
        throw new Error("Área com este nome já existe");
      }
    }

    return await AreaDeConhecimentoRepository.update(id, areaData);
  }

  async deleteArea(id) {
    const area = await this.getAreaById(id);
    return await AreaDeConhecimentoRepository.delete(id);
  }
}

module.exports = new AreaDeConhecimentoService();
