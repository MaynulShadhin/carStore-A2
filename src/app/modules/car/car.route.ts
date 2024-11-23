import express from 'express';
import { carController } from './car.controller';

const router = express.Router();

router.post('/cars', carController.createCar);
router.get('/cars', carController.getAllCars);
router.get('/cars/:carId', carController.getSpecificCar);
router.put('/cars/:carId', carController.updateCar);
router.delete('/cars/:carId', carController.deleteCar);
export const CarRoutes = router;
