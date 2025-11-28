/**
 * Repositório de Produtos (Módulo Produtos)
 */

const BaseRepository = require("./BaseRepository");
const { Product } = require("../models/models");

class ProductRepository extends BaseRepository {
  constructor() {
    super(Product);
  }

  async findByCode(codigo) {
    return this.findOneBy({ codigo });
  }

  async findActive() {
    return this.findManyBy({ ativo: true });
  }

  async findBySearch(searchTerm) {
    const { Op } = require("sequelize");
    return this.model.findAll({
      where: {
        [Op.or]: [
          { nome: { [Op.iLike]: `%${searchTerm}%` } },
          { descricao: { [Op.iLike]: `%${searchTerm}%` } },
          { codigo: { [Op.iLike]: `%${searchTerm}%` } },
        ],
      },
    });
  }
}

module.exports = new ProductRepository();
