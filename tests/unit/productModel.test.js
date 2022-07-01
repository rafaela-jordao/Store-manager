const { expect, use } = require('chai');
const sinon = require('sinon');
const connection = require('../../models/connection');
const chaiAsPromised = require('chai-as-promised');
const productModel = require('../../models/productModel');
const { listMock, mockObj } = require('../../mocks/product.mock');

use(chaiAsPromised);

describe('ProductModel', () => {
  beforeEach(function () {
    sinon.restore();
  });

  describe('#list', ()=> {
    const mockData = listMock;
// forma usando chaiAsPromised
    it('deve retornar um array com todos os produtos', () => {
      sinon.stub(connection, 'execute').resolves([mockData]);
      expect(productModel.list()).to.eventually.deep.eq(mockData);  // com o eventually posso apenas chamar a função productModel sem o uso do async/await.  
    });
  });

  describe('#findById', () => {
    it('deve retornar um objeto ao informar o id', async () => {
      sinon.stub(connection, 'execute').resolves([[mockObj]]);
      expect(productModel.findById(2)).to.eventually.be.deep.equal(mockObj);
    });
  }); 
});
