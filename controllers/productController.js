const productService = require('../services/productService');

const productController = {
  async listProducts(req, res) {
    const products = await productService.list();

    if (!products) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json(products);
  },

  async findById(req, res) {
    const { id } = await productService.validateParamsId(req.params);
    const products = await productService.findById(id);

    if (products.error) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(products);
  },
};

module.exports = productController;
