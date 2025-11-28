/**
 * Repositório Base
 * Fornece operações CRUD genéricas para todos os modelos Sequelize
 */

class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findAll(options = {}) {
    return await this.model.findAll(options);
  }

  async findById(id) {
    return await this.model.findByPk(id);
  }

  async findOneBy(where) {
    return await this.model.findOne({ where });
  }

  async findManyBy(where, options = {}) {
    return await this.model.findAll({ where, ...options });
  }

  async update(id, updates) {
    const record = await this.model.findByPk(id);
    if (!record) return null;
    return await record.update(updates);
  }

  async delete(id) {
    const record = await this.model.findByPk(id);
    if (!record) return false;
    await record.destroy();
    return true;
  }
}

module.exports = BaseRepository;
