const Joi = require('joi');
const productModel = require('../models/productModel');

const productService = {
  validateParamsId: (params) => {
    const schema = Joi.object({
      id: Joi.number().required().positive().integer(),
    });

    const { error, value } = schema.validate(params);

    if (error) throw error;

    return value;
  }, 

  // chama a função productModel
  async list() {
    const products = await productModel.list();
    return products;
  },

  async findById(id) {
    const products = await productModel.findById(id);
    return products;
  }, 
};

module.exports = productService;
