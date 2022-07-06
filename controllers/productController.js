const productService = require('../services/productService');

const NotFound = { message: 'Product not found' };

const productController = {
  async list(req, res) {
    const products = await productService.list();

    if (!products) return res.status(404).json(NotFound);

    res.status(200).json(products);
  },

  async findById(req, res) {
    const { id } = await productService.validateParamsId(req.params);
    const products = await productService.findById(id);

    if (!products) return res.status(404).json(NotFound);

    res.status(200).json(products);
  }, 
  
  async createProduct(req, res) {
    const value = productService.validateBody(req.body);
    const id = await productService.createProduct(value);

    const result = { id, ...value };

    res.status(201).json(result);
  },

  async editProduct(req, res) {
    const { id } = await productService.validateParamsId(req.params);
    const { name } = await productService.validateBody(req.body);

    const update = await productService.editProduct(id, name);

    if (!update) {
      return res.status(404).json(NotFound);
    }
    return res.status(200).json(update);
  },

  async delete(req, res) {
    const { id } = await productService.validateParamsId(req.params);
   
    const productId = await productService.delete(id);

    if (!productId) {
      return res.status(404).json(NotFound);
    }
    return res.sendStatus(204);
  }, 
};

module.exports = productController;
