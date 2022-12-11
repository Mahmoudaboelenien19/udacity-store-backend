import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import routes from './handlers/users_routes';
import productRoutes from './handlers/products-routes';
import orderRoutes from './handlers/ordersRoutes';

const app: express.Application = express();
const address = '0.0.0.0:3000';

app.use(bodyParser.json());

app.use('/', routes);
app.use('/', productRoutes);
app.use('/', orderRoutes);

app.get('/', function (req: Request, res: Response) {
  res.send('Hello there!');
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
