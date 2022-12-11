import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import Client from '../database';

const { SALT_ROUNDS, BCRYPT_PASSWORD } = process.env;

const hashPassword = (password: string): string => {
  const salt = parseInt(SALT_ROUNDS as string);
  return bcrypt.hashSync(password + BCRYPT_PASSWORD, salt);
};

dotenv.config();

export type User = {
  id?: string;
  first: string;
  last: string;
  password: string;
};

export class Users {
  async create(user: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO users (first,last,password) VALUES($1,$2,$3) RETURNING id,first,last;';
      const result = await conn.query(sql, [
        user.first,
        user.last,
        hashPassword(user.password),
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error('failed to create');
    }
  }

  async update(user: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql =
        'UPDATE users set first= ($1),last=($2),password=($3) RETURNING id,first,last;';
      const result = await conn.query(sql, [
        user.first,
        user.last,
        hashPassword(user.password),
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error('failed to update');
    }
  }

  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT id,first,last FROM users;';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error('failed');
    }
  }

  async show(id: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT id,first,last FROM users WHERE id=($1);';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error('failed');
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM users WHERE id=($1) RETURNING id,first,last;';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error('failed');
    }
  }

  async authenticate(
    first: string,
    last: string,
    password: string
  ): Promise<User | null> {
    const sql = 'SELECT password FROM users WHERE first=($1) AND last =($2) ;';
    const conn = await Client.connect();
    const result = await conn.query(sql, [first, last]);
    if (result.rows.length) {
      const user = result.rows[0];

      const check = bcrypt.compareSync(
        password + BCRYPT_PASSWORD,
        user.password
      );
      if (check) {
        return user;
      }
    }
    return null;
  }
}
