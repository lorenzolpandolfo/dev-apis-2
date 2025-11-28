/**
 * Serviço de Pedidos (Módulo Produtos)
 */

const OrderRepository = require("../repositories/OrderRepository");
const ClientRepository = require("../repositories/ClientRepository");
const ProductService = require("./ProductService");

class OrderService {
  async getAllOrders() {
    return await OrderRepository.findAll();
  }

  async getOrderById(id) {
    const order = await OrderRepository.findById(id);
    if (!order) {
      throw new Error("Pedido não encontrado");
    }
    return order;
  }

  async createOrder(orderData) {
    const { clientId, items, desconto = 0 } = orderData;

    if (!clientId || !items || items.length === 0) {
      throw new Error("Cliente e itens são obrigatórios");
    }

    const client = await ClientRepository.findById(clientId);
    if (!client) {
      throw new Error("Cliente não encontrado");
    }

    let totalValue = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await ProductService.getProductById(item.productId);
      await ProductService.decrementStock(item.productId, item.quantidade);

      const itemTotal = product.price * item.quantidade;
      totalValue += itemTotal;
      orderItems.push({
        productId: item.productId,
        quantidade: item.quantidade,
        precoUnitario: product.price,
        subtotal: itemTotal,
      });
    }

    const finalValue = totalValue - (desconto || 0);

    return await OrderRepository.create({
      clientId,
      items: orderItems,
      valorTotal: totalValue,
      desconto: desconto || 0,
      valorFinal: finalValue,
      status: "pendente",
      createdAt: new Date().toISOString(),
    });
  }

  async updateOrder(id, orderData) {
    const order = await this.getOrderById(id);
    return await OrderRepository.update(id, orderData);
  }

  async deleteOrder(id) {
    const order = await this.getOrderById(id);
    return await OrderRepository.delete(id);
  }

  async getOrdersByClient(clientId) {
    return await OrderRepository.findByClient(clientId);
  }

  async getOrdersByStatus(status) {
    return await OrderRepository.findByStatus(status);
  }

  async updateOrderStatus(id, status) {
    const order = await this.getOrderById(id);
    return await OrderRepository.update(id, { status });
  }
}

module.exports = new OrderService();
