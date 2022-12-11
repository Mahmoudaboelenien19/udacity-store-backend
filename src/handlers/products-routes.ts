import { Product, Products } from '../models/products';
import { Request, Response, Router } from 'express';
import authorization from '../middlewares/authrization';

const store = new Products();
const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json({ products });
};

const destroy = async (req: Request, res: Response) => {
  const deletedProduct = await store.delete(req.params.id);
  res.json({ deletedProduct, message: 'product deleted successfully' });
};

const show = async (req: Request, res: Response) => {
  const requiredProduct = await store.show(req.params.id);
  res.json({ requiredProduct });
};
const update = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  const updatedProduct = await store.update(product);
  res.json({ message: 'product updated successfully', updatedProduct });
};

const create = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  const createdProduct = await store.create(product);
  res.json({ message: 'product created successfully', createdProduct });
};

const productRoutes = Router();
productRoutes.route('/products').get(index).post(authorization, create);
productRoutes.route('/product').post(authorization, create);
productRoutes
  .route('/product/:id')
  .get(show)
  .delete(authorization, destroy)
  .patch(authorization, update);

export default productRoutes;
