/**
 * Repositório de Clientes (Módulo Produtos)
 */

const BaseRepository = require("./BaseRepository");
const { Client } = require("../models/models");

class ClientRepository extends BaseRepository {
  constructor() {
    super(Client);
  }

  async findByEmail(email) {
    return this.findOneBy({ email });
  }

  async findByCnpj(cnpj) {
    return this.findOneBy({ cnpj });
  }

  async findActive() {
    return this.findManyBy({ ativo: true });
  }
}

module.exports = new ClientRepository();
