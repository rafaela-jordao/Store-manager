const productController = require('../../controllers/productController');
const productService = require('../../services/productService');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { listMock, mockObj } = require('../../mocks/product.mock');
const { expect, use } = require('chai');

use(chaiAsPromised);

describe('ProductController', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('#list', () => {
    it('se o service devolve um array deve chamar res.status(200) e res.json([])', async () => {
      
      sinon.stub(productService, 'list').resolves(listMock);
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      await productController.list(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true); //calledwith retorna um valor boleano
      expect(res.json.calledWith(listMock)).to.be.equal(true);
    });
    
    it('caso o service não devolva o esperado deve retornar res.status(404) e json({message: Product not found }}))', async () => {
      const response = false
      sinon.stub(productService, 'list').resolves(false);
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      await productController.list(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true); //calledwith retorna um valor boleano
      expect(res.json.calledWith(response)).to.be.equal(false);
    });
  });

  describe('#findById', () => {
    it('deve chamar res.status(200) e res.json({}) qdo o service retornar o objeto procurado', async () => {
      sinon.stub(productService, 'findById').resolves(mockObj);

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 2 };

      await productController.findById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(mockObj)).to.be.equal(true);
    });

    it('ao inserir um id inválido deve retornar res.status(404) e json({ message: Product not found })', async () => {
      sinon.stub(productService, 'findById').resolves(false);

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 1001 };

      await productController.findById(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
    });
  });
})
