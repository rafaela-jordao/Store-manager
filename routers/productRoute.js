const { Router } = require('express');
const productController = require('../controllers/productController');
const validationProduct = require('../middlewares/validationProduct');

const productRoute = Router();

productRoute.get('/', productController.list);
productRoute.get('/:id', productController.findById);
productRoute.post('/', validationProduct, productController.createProduct);
productRoute.put('/:id', validationProduct, productController.editProduct);
productRoute.delete('/:id', productController.delete);

module.exports = productRoute;
