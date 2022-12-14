const productController = require('../../controllers/productController');
const productService = require('../../services/productService');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { listMock, mockObj } = require('../../mocks/product.mock');
const { expect, use } = require('chai');
const { ValidationError } = require('joi');

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

  describe('#createProduct', () => {
    it('ao mandar um req.body válido', async () => {
      const data = { id: 4, name: 'laço da mulher maravilha' };
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.body = { name: 'laço da mulher maravilha' };

      sinon.stub(productService, 'createProduct').resolves(true);

      await productController.createProduct(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith(data)).to.be.equal(false);
    });

    it('ao mandar um req.body inválido', () => {
      const req = {};
      const res = {};

      req.body = { name: '' };

      expect(productController.createProduct(req, res))
        .to.rejectedWith(ValidationError)
    });
  }); 

  describe('#editProduct', () => {
    it('ao tentar editar um id inválido', async () => {
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();

      req.params = { id: '5' };
      req.body = { name: 'Martelo de Thor'}
    
    sinon.stub(productService, 'editProduct').resolves(false);

      await productController.editProduct(req, res);
      expect(res.status.calledWith(404)).to.be.eq(true);
      expect(res.json.calledWith({ message: 'Product not found' })).to.be.eq(true);
  });

  it('ao tentar editar com um body inválido', async () => {
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();

    req.params = { id: 1 };
    req.body = { name: 'Mart'};

    sinon.stub(productService, 'editProduct').resolves(false);

      await productController.editProduct(req, res);
      expect(res.status.calledWith(404)).to.be.eq(true);
      expect(res.json.calledWith({ message: 'Product not found' })).to.be.eq(true);
  });

  it('ao tentar editar com um id e um body válido', async () => {
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();
    
    req.params = { id: 1 };
    req.body = { name: 'Martelo do Batman' };

    sinon.stub(productService, 'editProduct').resolves(1);

    await productController.editProduct(req, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
  }); 
  });

   describe('#delete', () => {
    it('ao deletar um produto com id válido', async () => {
      const req = {};
      const res = {};

      res.sendStatus = sinon.stub().returns(res);

      req.params = { id: 1 }

      sinon.stub(productService, 'delete').resolves(1);

      await productController.delete(req, res);
      expect(res.sendStatus.calledWith(204)).to.be.equal(true);
    });

    it('ao tentar deletar um produto com id inválido', async () => {
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();

      req.params = { id: 1001 };
      req.body = { name: 'Martelo de Thor'}
    
    sinon.stub(productService, 'delete').resolves(false);

      await productController.delete(req, res);
      expect(res.status.calledWith(404)).to.be.eq(true);
  });
  });
})
  
