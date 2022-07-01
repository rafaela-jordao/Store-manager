const Joi = require('joi');
const { runSchema } = require('./validators');
const productModel = require('../models/productModel');

const productService = {
  validateParamsId: runSchema(Joi.object({
    id: Joi.number().required().positive().integer(),
  })),

  async list() {
    const products = await productModel.list();
    return products;
  },

  async findById(id) {
    const products = await productModel.findById(id);
    if (!products) return { error: { status: 404, message: 'Product not found' } };
    return products;
  },
};

module.exports = productService;
