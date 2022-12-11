import Client from '../database';

export type Order = {
  id?: number;
  status: string;
  quantity: number;
  product_id: string;
  user_id: string;
};

export default class Orders {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders;';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error('unable to show orders' + err);
    }
  }

  async show(id: number): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1);';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error('unable to show the required order' + err);
    }
  }

  async delete(id: number): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *;';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error('unable to delete the required order' + err);
    }
  }

  async create(order: Order): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO orders (status,quantity,product_id,user_id) VALUES($1,$2,$3,$4) RETURNING *;';
      const result = await conn.query(sql, [
        order.status,
        order.quantity,
        order.product_id,
        order.user_id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error('unable to create the required order' + err);
    }
  }

  async update(order: Order): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql =
        'UPDATE orders set status=($1),quantity=($2), product_id=($3), user_id=($4) RETURNING * ;';
      const result = await conn.query(sql, [
        order.status,
        order.quantity,
        order.product_id,
        order.user_id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error('unable to create the required order' + err);
    }
  }
}
