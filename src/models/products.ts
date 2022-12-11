import Client from '../database';

export type Product = {
  id?: string;
  name: string;
  price: number;
  category: string;
};

export class Products {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products;';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error('unable to display all products');
    }
  }

  async create(product: Product): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO products(name,price,category) VALUES($1,$2,$3) RETURNING * ;';
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error('unable to create a new product');
    }
  }

  async show(id: string): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products WHERE id=($1) ;';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error('unable to display the product');
    }
  }

  async delete(id: string): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE  FROM products WHERE id=($1) RETURNING *;';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error('unable to delete the  product');
    }
  }

  async update(product: Product): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql =
        'UPDATE products set name=($1) ,price=($2),category=($3) RETURNING *;';
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error('unable to display all products');
    }
  }
}
