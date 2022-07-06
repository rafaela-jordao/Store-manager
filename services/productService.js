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

  validateBody: (params) => {
    const schema = Joi.object({
      name: Joi.string().required(),
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

  async createProduct({ name }) {
    const id = await productModel.createProduct({ name });
    return id;
  },

  async editProduct(id, name) {
    if (!Object.keys(name).length) return false;

    const update = await productModel.editProduct(id, name);

    if (!update) return false;

    return { id, name };
  },

  async delete(id) {
    const productId = await productModel.delete(id);

    if (!productId) return false;

    return { id };
  },

  /* // falta fazer o teste de camada
  async search(name) {
    const result = await productModel.search(name);
    return result;
  }, */
};

module.exports = productService;
