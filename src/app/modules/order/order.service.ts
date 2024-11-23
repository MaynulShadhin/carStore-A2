import { CarModel } from '../car/car.model';
import { TOrder } from './order.interface';
import { OrderModel } from './order.model';

//create order
const orderIntoDB = async (orderData: TOrder) => {
  const car = await CarModel.findById(orderData.car);
  if (!car) {
    throw new Error('Car not found');
  }
  if (car.quantity < orderData.quantity) {
    throw new Error('insufficient stock');
  }
  car.quantity -= orderData.quantity;
  if (car.quantity === 0) {
    car.inStock = false;
  }
  await car.save();
  const order = await OrderModel.create(orderData);
  return order;
};

//total revenue using aggregate
const calculateRevenue = async () => {
  const result = await OrderModel.aggregate([
    {
      $addFields: {
        carId: { $toObjectId: '$car' },
      },
    },
    {
      $lookup: {
        from: 'cars',
        localField: 'carId',
        foreignField: '_id',
        as: 'carDetails',
      },
    },
    {
      $unwind: '$carDetails',
    },
    {
      $addFields: {
        orderRevenue: { $multiply: ['$quantity', '$carDetails.price'] },
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$orderRevenue' },
      },
    },
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ]);
  return result;
};

export const orderServices = {
  orderIntoDB,
  calculateRevenue,
};
