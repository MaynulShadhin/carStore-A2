import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { CarRoutes } from './app/modules/car/car.route';
import { OrderRoutes } from './app/modules/order/order.route';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

//app routes
app.use('/api', CarRoutes);
app.use('/api', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Server online');
});

export default app;
