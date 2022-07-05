const chaiAsPromised = require('chai-as-promised');
const { expect, use } = require('chai');
const sinon = require('sinon');
const { listMock, mockObj } = require('../../mocks/product.mock');
const productModel = require('../../models/productModel');
const productService = require('../../services/productService');

use(chaiAsPromised);

describe('ProductService', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('#validateParamsId', () => {
    it('se mandar um id válido deve retornar um objeto válido', () => {
      const object = productService.validateParamsId({ id: 1 });
      expect(object).to.be.deep.eq({ id: 1 });
    });

    it('se mandar um id inválido deve disparar um erro', () => {
      expect(() => productService.validateParamsId({ id: 'teste' })).to
        .throws('"id" must be a number');
    });

    describe('#list', () => {
      it('deve retornar um array se o model retornar um array', () => {
        sinon.stub(productModel, 'list').resolves(listMock);
        expect(productService.list()).to.eventually.deep.equal(listMock);
      });
    });
  });

  describe('#findById', () => {
    it('deve retornar um objeto se o model retornar esse objeto', () => {
      sinon.stub(productModel, 'findById').resolves(mockObj);
      expect(productService.findById(2)).to.eventually.deep.equal(mockObj);
    });
  });

  describe('#validateBody', () => {
    it('se mandar um objeto válido deve retonar um objeto válido', () => {
      const object = productService.validateBody({ name: 'laço da mulher maravilha' });
      expect(object).to.be.deep.eq({ name: 'laço da mulher maravilha' });
    });

    it('se mandar um nome vazio no body deve disparar um erro', () => {
      expect(() => productService.validateBody({ name: '' })).to
        .throws('"name" is not allowed to be empty');
    });

    it('se mandar um objeto sem nome no body deve disparar um erro', () => {
      expect(() => productService.validateBody({ })).to
        .throws('"name" is required');
    });
  });

  describe('#createProduct', () => {
    it('Ao mandar um dado válido deve salvar no banco', async () => {
      sinon.stub(productModel, 'createProduct').resolves(4);
      const id = await productService.createProduct({ name: 'laço da mulher maravilha' });
      expect(id).to.be.eq(4);
    });
  });

  describe('#editProduct', () => {
    it('ao tentar editar um produto mandando um objeto deve editar', async () => {
      sinon.stub(productModel, 'editProduct').resolves(true);
      const result = await productService.editProduct(1, 'Martelo do Batman');
      expect(result).to.be.deep.eq({ id: 1, name: 'Martelo do Batman'});
      
    });

    it('ao tentar editar um produto com id inválido', async () => {
      sinon.stub(productModel, 'editProduct').resolves(false);
      const result = await productService.editProduct('teste', 'Martelo do Batman');
      expect(result).to.be.deep.eq(false);
    });
    it('ao tentar editar um produto com "name" inválido', async () => {
      sinon.stub(productModel, 'editProduct').resolves(true);
      const result = await productService.editProduct(1, {});
      expect(result).to.be.deep.eq(false);
    })
  });

})
