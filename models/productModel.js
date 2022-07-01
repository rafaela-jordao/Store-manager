const connection = require('./connection');

const productsModel = {
  async list() {
    const sql = 'SELECT * FROM StoreManager.products';

    const [products] = await connection.execute(sql);

    return products;
  },

  async findById(id) {
    const sql = 'SELECT * FROM StoreManager.products WHERE id = ?';
    
    const [[products]] = await connection.execute(sql, [id]);
    return products;
  },
  
};

module.exports = productsModel;