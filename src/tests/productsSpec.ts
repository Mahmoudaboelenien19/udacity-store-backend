import supertest from 'supertest';
import { Product, Products } from '../models/products';
import app from '../server';
import { token } from './usersSpec';

const request = supertest(app);
const store = new Products();
export let product_uuid: string;

describe('test product methods', () => {
  it('create method', async () => {
    expect(store.index).toBeDefined();
  });
  it('show method', async () => {
    expect(store.show).toBeDefined();
  });
  it('update method', async () => {
    expect(store.update).toBeDefined();
  });
  it('index method', async () => {
    expect(store.index).toBeDefined();
  });
  it('delete method', async () => {
    expect(store.delete).toBeDefined();
  });

  describe('do method work correctlly', () => {
    it('create method', async () => {
      const res = await store.create({
        name: 'BMW',
        price: 1000_000,
        category: 'cars',
      });
      expect(res).toEqual(
        jasmine.objectContaining({
          name: 'BMW',
          price: 1000_000,
          category: 'cars',
        })
      );
    });

    it('index method', async () => {
      const res = await store.index();
      expect(res).toEqual([
        jasmine.objectContaining({
          name: 'BMW',
          price: 1000_000,
          category: 'cars',
        }),
      ]);
    });

    it('show method', async () => {
      product_uuid = ((await store.index()) as unknown as Product[])[0]
        .id as string;

      const res = await store.show(product_uuid);
      expect(res).toEqual(
        jasmine.objectContaining({
          name: 'BMW',
          price: 1000_000,
          category: 'cars',
        })
      );
    });

    it('update method', async () => {
      const res = await store.update({
        name: 'BMW',
        price: 1200_000,
        category: 'cars',
      });
      expect(res).toEqual(
        jasmine.objectContaining({
          name: 'BMW',
          price: 1200_000,
          category: 'cars',
        })
      );
    });

    it('delete method', async () => {
      product_uuid = ((await store.index()) as unknown as Product[])[0]
        .id as string;

      const res = await store.delete(product_uuid);
      expect(res).toEqual(jasmine.objectContaining({}));
    });
  });

  describe('test product endpoints', () => {
    it('test create product ', async () => {
      const res = await request
        .post('/product')
        .send({
          name: 'BMW',
          price: 1000_000,
          category: 'cars',
        })
        .set('Authorization', 'Bearer ' + token);
      expect(res.status).toBe(200);
    });

    it('show all products', async () => {
      const res = await request.get('/products');
      expect(res.status).toBe(200);
    });

    it('show specific product', async () => {
      product_uuid = ((await store.index()) as unknown as Product[])[0]
        .id as string;

      const res = await request.get(`/product/${product_uuid}`).send({
        id: product_uuid,
      });
      expect(res.status).toBe(200);
    });
    it('update specific product', async () => {
      product_uuid = ((await store.index()) as unknown as Product[])[0]
        .id as string;

      const res = await request
        .get(`/product/${product_uuid}`)
        .set('Authorization', 'Bearer ' + token)
        .send({
          name: 'BMW',
          price: 1200_000,
          category: 'cars',
        });
      expect(res.status).toBe(200);
    });
    // it("delete specific product",async()=>{
    //      product_uuid= (await store.index() as unknown as Product[])[0].id as string

    //     const res=await request.delete(`/product/${product_uuid}`).set("Authorization","Bearer " + token)
    //     expect(res.status).toBe(200)
    // })
  });
});
