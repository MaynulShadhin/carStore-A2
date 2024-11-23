import { Request, Response } from 'express';
import { orderServices } from './order.service';
import orderValidationSchema from './order.validation';

//create order
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const zodParseData = orderValidationSchema.parse(orderData);
    const order = await orderServices.orderIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: order,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to create order',
      error: error,
    });
  }
};

//calculate revenue
const getTotalRevenue = async (req: Request, res: Response) => {
  try {
    const result = await orderServices.calculateRevenue();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: { result },
    });
  } catch (error: any) {
    res.status(400).json({
      status: false,
      message: 'something went wrong when calculation revenue',
      error: error,
    });
  }
};

export const orderController = {
  createOrder,
  getTotalRevenue,
};
