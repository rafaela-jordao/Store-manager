const productService = require('../services/productService');

const productController = {
  async list(req, res) {
    const products = await productService.list();

    if (!products) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json(products);
  },

  async findById(req, res) {
    const { id } = await productService.validateParamsId(req.params);
    const products = await productService.findById(id);

    if (!products) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json(products);
  }, 
  
  async createProduct(req, res) {
    const value = productService.validateBody(req.body);
    const id = await productService.createProduct(value);

    const result = { id, ...value };

    res.status(201).json(result);
  },
};

module.exports = productController;
