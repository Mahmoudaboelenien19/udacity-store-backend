import supertest from 'supertest';
import { User, Users } from '../models/users';
import app from '../server';

const request = supertest(app);
const store = new Users();
export let token: string;
export let user_uuid: string;

describe('User Model ', () => {
  describe('do methods exist', () => {
    it('index', () => {
      expect(store.index).toBeDefined();
    });

    it('create', () => {
      expect(store.create).toBeDefined();
    });

    it('delete', () => {
      expect(store.delete).toBeDefined();
    });

    it('show', () => {
      expect(store.show).toBeDefined();
    });

    it('authenticate', () => {
      expect(store.authenticate).toBeDefined();
    });
  });

  describe('do methods work correctly', () => {
    it('create method', async () => {
      const res = await store.create({
        first: 'mahmoud',
        last: 'mohamed',
        password: 'password123',
      });
      expect(res).toEqual(
        jasmine.objectContaining({
          first: 'mahmoud',
          last: 'mohamed',
        })
      );
    });

    it('authenticate with correct data', async () => {
      const res = await store.authenticate('mahmoud', 'mohamed', 'password123');
      expect(res).toBeDefined();
    });

    it('authenticate with wrong data', async () => {
      const res = await store.authenticate(
        'mahmoud',
        'mohamed',
        'password12kk3'
      );
      expect(res).toBeNull();
    });

    it('index method', async () => {
      const res = await store.index();
      expect(res).toEqual([
        jasmine.objectContaining({
          first: 'mahmoud',
          last: 'mohamed',
        }),
      ]);
    });

    it('show method', async () => {
      user_uuid = ((await store.index()) as unknown as User[])[0].id as string;
      const res = await store.show(user_uuid);
      expect(res).toEqual(
        jasmine.objectContaining({
          first: 'mahmoud',
          last: 'mohamed',
        })
      );
    });

    it('update method', async () => {
      const res = await store.update({
        first: 'mahmoud',
        last: 'MO',
        password: 'password123',
      });
      expect(res).toEqual(
        jasmine.objectContaining({
          first: 'mahmoud',
          last: 'MO',
        })
      );
    });

    it('delete method', async () => {
      user_uuid = ((await store.index()) as unknown as User[])[0].id as string;

      const res = await store.delete(user_uuid);
      expect(res).toEqual(jasmine.objectContaining({}));
    });
  });

  describe('Test API ENDPOINTS', () => {
    it('create  user ', async () => {
      const res = await request.post('/user').send({
        first: 'mahmoud',
        last: 'mohamed',
        password: 'password123',
      });
      expect(res.status).toBe(200);
    });

    it('authenticate', async () => {
      const res = await request.get('/user/authenticate').send({
        first: 'mahmoud',
        last: 'mohamed',
        password: 'password123',
      });
      expect(res.status).toBe(200);
      token = res.body.data.token;
      console.log(token);
    });

    it('show all users', async () => {
      const res = await request
        .get(`/users`)
        .set('Authorization', 'Bearer ' + token);
      expect(res.status).toBe(200);
    });

    it('show specific user', async () => {
      user_uuid = ((await store.index()) as unknown as User[])[0].id as string;

      const res = await request
        .get(`/user/${user_uuid}`)
        .set('Authorization', 'Bearer ' + token)
        .send({
          id: user_uuid,
        });
      expect(res.status).toBe(200);
    });

    it('update specific user', async () => {
      user_uuid = ((await store.index()) as unknown as User[])[0].id as string;

      const res = await request
        .patch(`/user/${user_uuid}`)
        .set('Authorization', 'Bearer ' + token)
        .send({
          first: 'mahmoud',
          last: 'MO',
          password: 'password123',
        });
      expect(res.status).toBe(200);
    });

    // it("delete specific user",async()=>{
    //     let user_uuid= (await store.index() as unknown as User[])[0].id

    //     const res=  await request.delete(`/user/${user_uuid}`).set("Authorization","Bearer " + token).send({
    //         id:user_uuid
    //     });
    //     expect(res.status).toBe(200)

    // })
  });
});
