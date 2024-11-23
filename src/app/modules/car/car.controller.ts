import { Request, Response } from 'express';
import { carServices } from './car.service';

//create car
const createCar = async (req: Request, res: Response) => {
  try {
    const carData = req.body;
    const result = await carServices.createCarIntoDB(carData);
    res.status(200).json({
      success: true,
      message: 'Car created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error,
    });
  }
};

//get cars
const getAllCars = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const result = await carServices.getAllCarsFromDB(searchTerm as string);
    res.status(200).json({
      success: true,
      message: 'Cars are retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error,
    });
  }
};

//get a specific car by id
const getSpecificCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    console.log('receive:', carId);
    const result = await carServices.getSpecificCarFromDB(carId);
    res.status(200).json({
      success: true,
      message: 'Car retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error,
    });
  }
};

export const carController = {
  createCar,
  getAllCars,
  getSpecificCar,
};
