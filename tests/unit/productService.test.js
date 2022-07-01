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

})
