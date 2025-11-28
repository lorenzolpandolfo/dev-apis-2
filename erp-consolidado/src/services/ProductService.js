/**
 * Serviço de Produtos (Módulo Produtos)
 */

const ProductRepository = require("../repositories/ProductRepository");

class ProductService {
  async getAllProducts(filters = {}) {
    const {
      category,
      active,
      search,
      sortBy = "name",
      sortOrder = "asc",
    } = filters;

    let products = await ProductRepository.findAll();

    if (category) {
      products = products.filter((p) =>
        p.category?.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (active !== undefined) {
      products = products.filter(
        (p) => p.active === (active === true || active === "true")
      );
    }

    if (search) {
      products = products.filter(
        (p) =>
          p.name?.toLowerCase().includes(search.toLowerCase()) ||
          p.description?.toLowerCase().includes(search.toLowerCase()) ||
          p.code?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Ordenação
    products.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    });

    return products;
  }

  async getProductById(id) {
    const product = await ProductRepository.findById(id);
    if (!product) {
      throw new Error("Produto não encontrado");
    }
    return product;
  }

  async getProductByCode(code) {
    const product = await ProductRepository.findByCode(code);
    if (!product) {
      throw new Error("Produto com código não encontrado");
    }
    return product;
  }

  async createProduct(productData) {
    const { name, description, code, category, price, stock } = productData;

    if (!name || !code || !price) {
      throw new Error("Nome, código e preço são obrigatórios");
    }

    const existingCode = await ProductRepository.findByCode(code);
    if (existingCode) {
      throw new Error("Produto com este código já existe");
    }

    return await ProductRepository.create({
      name,
      description,
      code,
      category,
      price,
      stock: stock || 0,
      active: true,
      createdAt: new Date().toISOString(),
    });
  }

  async updateProduct(id, productData) {
    const product = await this.getProductById(id);

    if (productData.code && productData.code !== product.code) {
      const existing = await ProductRepository.findByCode(productData.code);
      if (existing) {
        throw new Error("Código de produto já existe");
      }
    }

    return await ProductRepository.update(id, productData);
  }

  async deleteProduct(id) {
    const product = await this.getProductById(id);
    return await ProductRepository.delete(id);
  }

  async getProductsByCategory(category) {
    return await ProductRepository.findByCategory(category);
  }

  async decrementStock(productId, quantity) {
    const product = await this.getProductById(productId);
    const newStock = (product.stock || 0) - quantity;

    if (newStock < 0) {
      throw new Error("Quantidade insuficiente em estoque");
    }

    return await ProductRepository.update(productId, { stock: newStock });
  }
}

module.exports = new ProductService();
