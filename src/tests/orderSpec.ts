import supertest from 'supertest';
import Client from '../database';
import Orders from '../models/orders';
import app from '../server';
import { product_uuid } from './productsSpec';
import { token, user_uuid } from './usersSpec';

const request = supertest(app);
const store = new Orders();

describe('orders model', () => {
  beforeAll(async () => {
    const conn = await Client.connect();
    const sql = 'ALTER SEQUENCE orders_id_seq RESTART WITH 1;';
    await conn.query(sql);
    conn.release();
  });
  describe('do models exist', () => {
    it('create', () => {
      expect(store.create).toBeDefined();
    });
    it('index', () => {
      expect(store.index).toBeDefined();
    });
    it('show', () => {
      expect(store.show).toBeDefined();
    });
    it('update', () => {
      expect(store.update).toBeDefined();
    });
    it('delete', () => {
      expect(store.delete).toBeDefined();
    });
  });

  describe('do method work correctly', () => {
    it('test create an order', async () => {
      const res = await store.create({
        status: 'active',
        quantity: 100,
        product_id: product_uuid,
        user_id: user_uuid,
      });
      expect(res).toEqual(
        jasmine.objectContaining({
          status: 'active',
          quantity: 100,
          product_id: product_uuid,
          user_id: user_uuid,
        })
      );
    });
  });

  it('test update an order', async () => {
    const res = await store.update({
      status: 'complete',
      quantity: 100,
      product_id: product_uuid,
      user_id: user_uuid,
    });
    expect(res).toEqual(
      jasmine.objectContaining({
        status: 'complete',
        quantity: 100,
        product_id: product_uuid,
        user_id: user_uuid,
      })
    );
  });

  it('test index an order', async () => {
    const res = await store.index();

    expect(res).toEqual([
      jasmine.objectContaining({
        id: 1,
        status: 'complete',
        quantity: 100,
        product_id: product_uuid,
        user_id: user_uuid,
      }),
    ]);
  });

  it('test show an order', async () => {
    const res = await store.show(1);

    expect(res).toEqual(
      jasmine.objectContaining({
        status: 'complete',
        quantity: 100,
        product_id: product_uuid,
        user_id: user_uuid,
      })
    );
  });

  it('test delete an order', async () => {
    const res = await store.delete(1);

    expect(res).toEqual(jasmine.objectContaining({}));
  });

  describe('test orders EndPoints', () => {
    it('create', async () => {
      const res = await request
        .post('/order')
        .send({
          status: 'active',
          quantity: 100,
          product_id: product_uuid,
          user_id: user_uuid,
        })
        .set('Authorization', 'Bearer ' + token);
      expect(res.status).toBe(200);
    });

    it('update', async () => {
      const res = await request
        .patch(`/order/1`)
        .send({
          status: 'complete',
          quantity: 100,
          product_id: product_uuid,
          user_id: user_uuid,
        })
        .set('Authorization', 'Bearer ' + token);
      expect(res.status).toBe(200);
    });

    it('index', async () => {
      const res = await request
        .get(`/orders`)
        .set('Authorization', 'Bearer ' + token);
      expect(res.status).toBe(200);
    });

    it('show', async () => {
      const res = await request
        .get(`/order/1`)
        .send({
          id: 1,
        })
        .set('Authorization', 'Bearer ' + token);
      expect(res.status).toBe(200);
    });

    it('delete', async () => {
      const res = await request
        .delete(`/order/1`)
        .send({
          id: 1,
        })
        .set('Authorization', 'Bearer ' + token);
      expect(res.status).toBe(200);
    });
  });
});
