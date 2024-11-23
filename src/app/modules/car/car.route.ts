import express from 'express';
import { carController } from './car.controller';

const router = express.Router();

router.post('/cars', carController.createCar);
router.get('/cars', carController.getAllCars);
router.get('/cars/:carId', carController.getSpecificCar);

export const CarRoutes = router;
