/**
 * Controlador de Produtos
 */

const ProductService = require("../services/ProductService");

class ProductController {
  async getAll(req, res) {
    try {
      const { category, active, search, sortBy, sortOrder } = req.query;
      const products = await ProductService.getAllProducts({
        category,
        active,
        search,
        sortBy,
        sortOrder,
      });
      res.status(200).json({
        status: "success",
        data: products,
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
      const product = await ProductService.getProductById(id);
      res.status(200).json({
        status: "success",
        data: product,
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
      const { name, description, code, category, price, stock } = req.body;
      const product = await ProductService.createProduct({
        name,
        description,
        code,
        category,
        price,
        stock,
      });
      res.status(201).json({
        status: "success",
        message: "Produto criado com sucesso",
        data: product,
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
      const product = await ProductService.updateProduct(id, req.body);
      res.status(200).json({
        status: "success",
        message: "Produto atualizado com sucesso",
        data: product,
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
      await ProductService.deleteProduct(id);
      res.status(200).json({
        status: "success",
        message: "Produto deletado com sucesso",
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getByCategory(req, res) {
    try {
      const { category } = req.params;
      const products = await ProductService.getProductsByCategory(category);
      res.status(200).json({
        status: "success",
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = new ProductController();
