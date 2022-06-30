const { Router } = require('express');
const productController = require('../controllers/productController');

const productRoute = Router();

productRoute.get('/', productController.listProducts);
productRoute.get('/:id', productController.findById);

module.exports = productRoute;
