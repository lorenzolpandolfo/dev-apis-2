/**
 * Repositório Base
 * Fornece operações CRUD genéricas usando Sequelize
 */

class BaseRepository {
  constructor(model) {
    if (!model) throw new Error("Model é obrigatório");
    this.model = model;
  }

  async create(data) {
    return this.model.create(data);
  }

  async findAll(options = {}) {
    return this.model.findAll(options);
  }

  async findById(id) {
    return this.model.findByPk(id);
  }

  async findOneBy(keyOrObj, value) {
    const where =
      typeof keyOrObj === "object" ? keyOrObj : { [keyOrObj]: value };
    return this.model.findOne({ where });
  }

  async findManyBy(keyOrObj, value) {
    const where =
      typeof keyOrObj === "object" ? keyOrObj : { [keyOrObj]: value };
    return this.model.findAll({ where });
  }

  async update(id, updates) {
    await this.model.update(updates, { where: { id }, returning: true });
    return this.findById(id);
  }

  async delete(id) {
    const deleted = await this.model.destroy({ where: { id } });
    return deleted > 0;
  }
}

module.exports = BaseRepository;
