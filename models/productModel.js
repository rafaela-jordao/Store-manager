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

  async createProduct({ name }) {
    if (!name) return null;
    
    const sql = 'INSERT INTO StoreManager.products (name) VALUES (?)';
    const [{ insertId }] = await connection.execute(sql, [name]);
    return insertId;
  },

  async editProduct(id, name) {
    const sql = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
    const [{ affectedRows }] = await connection.execute(sql, [name, id]);
    return affectedRows;
  },

  async delete(id) {
    const sql = 'DELETE FROM StoreManager.products WHERE id = ?';
    const [{ affectedRows }] = await connection.execute(sql, [id]);
    return affectedRows;
  }, 
};

module.exports = productsModel;
