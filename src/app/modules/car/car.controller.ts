import { Request, Response } from 'express';
import { carServices } from './car.service';
import carValidationSchema from './car.validation';

//create car
const createCar = async (req: Request, res: Response) => {
  try {
    const carData = req.body;
    const zodParsedData = carValidationSchema.parse(carData);
    const result = await carServices.createCarIntoDB(zodParsedData);
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
      message: 'Validation failed',
      error,
    });
  }
};

//get a specific car by id
const getSpecificCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
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

//update a car
const updateCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const carData = req.body;
    const updatedCar = await carServices.updateCarInDB(carId, carData);
    res.status(200).json({
      success: true,
      message: 'Car updated successfully',
      data: updatedCar,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error,
    });
  }
};

//delete a car
const deleteCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const result = await carServices.deleteCarFromDB(carId);
    res.status(200).json({
      success: true,
      message: 'Car deleted successfully',
      result,
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
  updateCar,
  deleteCar,
};
