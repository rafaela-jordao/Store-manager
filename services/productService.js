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

 /*  async checkIfExists(id) {
    const exists = await productModel.exists(id);
    if (!exists) {
      throw new NotFoundError('Director not found');
    }

    return true;
  },  */

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
};

module.exports = productService;
