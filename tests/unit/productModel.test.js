const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../models/connection');
const productModel = require('../../models/productModel');
const { listMock, mockObj } = require('../../mocks/product.mock');

describe('ProductModel', function () {
  beforeEach(function () {
    sinon.restore();
  });

  describe('#list', function () {
    const mockData = listMock;

    it('deve retornar um array com todos os produtos', async function () {
      sinon.stub(connection, 'execute').resolves([mockData]);
      const list = await productModel.list();
      expect(list).to.be.eq(mockData);
    }); 
  });

  describe('#findById', function () {
    const mockData = mockObj;

    it('deve retornar um objeto ao informar o id', async function () {
      sinon.stub(connection, 'execute').resolves([[mockObj]]);
      const findById = await productModel.findById(2);
      expect(findById).to.be.deep.eq(mockObj);
    });
  });
});
