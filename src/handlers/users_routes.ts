import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import authorization from '../middlewares/authrization';
import { User, Users } from '../models/users';
const store = new Users();

const index = async (_req: Request, res: Response) => {
  const result = await store.index();
  res.json({ data: result });
};

const create = async (req: Request, res: Response) => {
  try {
    const newUser: User = {
      first: req.body.first,
      last: req.body.last,
      password: req.body.password,
    };
    const result = await store.create(newUser);
    console.log('token');

    const token = jwt.sign(
      { newUser },
      process.env.TOKEN_SECRET as unknown as string
    );
    console.log(token);

    res.json({ message: 'user created successfully', data: { result, token } });
  } catch (err) {
    res.json({ message: `can't create user please fill all inputs` });
  }
};

const update = async (req: Request, res: Response) => {
  const user: User = {
    first: req.body.first,
    last: req.body.last,
    password: req.body.password,
  };
  const result = await store.update(user);

  res.json({ message: 'user updated successfully', result });
};

const show = async (req: Request, res: Response) => {
  const result = await store.show(req.params.id);
  res.json({ data: result });
};

const destroy = async (req: Request, res: Response) => {
  const result = await store.delete(req.params.id);
  res.json({ data: result, message: 'user deleted successfully' });
};

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    first: req.body.first,
    last: req.body.last,
    password: req.body.password,
  };
  // const result = await store.authenticate(user.first, user.last, user.password);

  const token = jwt.sign({ user }, process.env.TOKEN_SECRET as string);
  res.json({
    data: {
      user,
      token,
    },
  });
};

const routes = Router();
routes.route('/user/authenticate').get(authenticate);
routes.route('/user').post(create);
routes.route('/users').get(authorization, index);
routes
  .route('/user/:id')
  .get(authorization, show)
  .delete(authorization, destroy)
  .patch(authorization, update);

export default routes;
