const { Router } = require('express');
const productController = require('../controllers/productController');
const validationProduct = require('../middlewares/validationProduct');

const productRoute = Router();

productRoute.get('/', productController.list);
productRoute.get('/:id', productController.findById);
productRoute.post('/', validationProduct, productController.createProduct);

module.exports = productRoute;
