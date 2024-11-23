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
      { brand: { $regex: searchTerm, $options: 'i' } },
      { model: { $regex: searchTerm, $options: 'i' } },
      { category: { $regex: searchTerm, $options: 'i' } },
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

// update a car
const updateCarInDB = async (carId: string, carData: Partial<TCar>) => {
  const updatedCar = await CarModel.findByIdAndUpdate(
    new ObjectId(carId),
    { $set: carData },
    { new: true },
  );
  if (!updatedCar) {
    throw new Error('Car not found');
  }
  return updatedCar;
};

//delete a car
const deleteCarFromDB = async (id: string) => {
  const result = await CarModel.findByIdAndDelete(new ObjectId(id));
  if (!result) {
    throw new Error('Car not found');
  }
  return result;
};

export const carServices = {
  createCarIntoDB,
  getAllCarsFromDB,
  getSpecificCarFromDB,
  updateCarInDB,
  deleteCarFromDB,
};
