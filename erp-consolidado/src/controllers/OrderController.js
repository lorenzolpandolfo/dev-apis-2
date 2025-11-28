/**
 * Controlador de Pedidos
 */

const OrderService = require("../services/OrderService");

class OrderController {
  async getAll(req, res) {
    try {
      const orders = await OrderService.getAllOrders();
      res.status(200).json({
        status: "success",
        data: orders,
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
      const order = await OrderService.getOrderById(id);
      res.status(200).json({
        status: "success",
        data: order,
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
      const { clientId, items, desconto } = req.body;
      const order = await OrderService.createOrder({
        clientId,
        items,
        desconto,
      });
      res.status(201).json({
        status: "success",
        message: "Pedido criado com sucesso",
        data: order,
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
      const order = await OrderService.updateOrder(id, req.body);
      res.status(200).json({
        status: "success",
        message: "Pedido atualizado com sucesso",
        data: order,
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
      await OrderService.deleteOrder(id);
      res.status(200).json({
        status: "success",
        message: "Pedido deletado com sucesso",
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getByClient(req, res) {
    try {
      const { clientId } = req.params;
      const orders = await OrderService.getOrdersByClient(clientId);
      res.status(200).json({
        status: "success",
        data: orders,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const order = await OrderService.updateOrderStatus(id, status);
      res.status(200).json({
        status: "success",
        message: "Status atualizado com sucesso",
        data: order,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = new OrderController();
