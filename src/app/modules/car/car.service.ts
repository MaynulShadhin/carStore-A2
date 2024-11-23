import { ObjectId } from 'mongodb';
import { TCar } from './car.interface';
import { CarModel } from './car.model';

//create car
const createCarIntoDB = async (carData: TCar) => {
  const result = await CarModel.create(carData);
  return result;
};

//get all cars or get car using query
const getAllCarsFromDB = async (searchTerm?: string) => {
  const query: any = {};
  if (searchTerm) {
    query.$or = [
      { brand: { $eq: searchTerm } },
      { model: { $eq: searchTerm } },
      { category: { $eq: searchTerm } },
    ];
  }
  const result = await CarModel.find(query);
  return result;
};

//get a specific car
const getSpecificCarFromDB = async (id: string) => {
  const result = await CarModel.findOne({ _id: new ObjectId(id) });
  if (!result) {
    throw new Error('Car not found');
  }
  return result;
};

export const carServices = {
  createCarIntoDB,
  getAllCarsFromDB,
  getSpecificCarFromDB,
};
