import { Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import Orders, { Order } from '../models/orders';
import authorization from '../middlewares/authrization';

dotenv.config();

const orderStore = new Orders();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await orderStore.index();
    if (orders.length === 0) {
      res.json({ message: 'no orders to show' });
    } else {
      res.json({ orders });
    }
  } catch (err) {
    res.status(400).send(`can't show orders ${err}`);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await orderStore.show(parseInt(req.params.id as string));
    res.json({ order });
  } catch (err) {
    res.status(400).send(`the required order is not found ${err}`);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const order = await orderStore.delete(parseInt(req.params.id as string));

    if (order) {
      res.json({ message: 'order is successfully deleted', order });
    } else {
      res.json({ message: 'no order to delete' });
    }
  } catch (err) {
    res.status(400).send(`can't delete this order ${err}`);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const createdOrder: Order = {
      status: req.body.status,
      quantity: req.body.quantity,
      product_id: req.body.product_id,
      user_id: req.body.user_id,
    };
    const order = await orderStore.create(createdOrder);
    res.json({ message: 'order is successfully created', order });
  } catch (err) {
    res.status(400).send(`can't create this order ${err}`);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const updatedOrder: Order = {
      status: req.body.status,
      quantity: req.body.quantity,
      product_id: req.body.product_id,
      user_id: req.body.user_id,
    };
    const order = await orderStore.update(updatedOrder);
    res.json({ message: 'order is successfully updated', order });
  } catch (err) {
    res.status(400).send(`can't delete this order ${err}`);
  }
};
const orderRoutes = Router();
orderRoutes.route('/orders').get(authorization, index);
orderRoutes.route('/order').post(authorization, create);
orderRoutes
  .route('/order/:id')
  .get(authorization, show)
  .delete(authorization, destroy)
  .patch(authorization, update);

export default orderRoutes;
