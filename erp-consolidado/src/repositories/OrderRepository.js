/**
 * Repositório de Pedidos (Módulo Produtos)
 */

const BaseRepository = require("./BaseRepository");
const { Order } = require("../models/models");

class OrderRepository extends BaseRepository {
  constructor() {
    super(Order);
  }

  async findByClient(clienteId) {
    return this.findManyBy({ clienteId });
  }

  async findByStatus(status) {
    return this.findManyBy({ status });
  }

  async findByNumero(numero) {
    return this.findOneBy({ numero });
  }
}

module.exports = new OrderRepository();
