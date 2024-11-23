import { model, Schema } from 'mongoose';
import { TCar } from './car.interface';

const carSchema = new Schema<TCar>(
  {
    brand: {
      type: String,
      required: [true, 'Brand Name is required'],
    },
    model: {
      type: String,
      required: [true, 'Model is required'],
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
    },
    price: {
      type: Number,
      min: [0, 'Price must be a positive number, received {VALUE}'],
      required: [true, 'Price is required'],
    },
    category: {
      type: String,
      enum: {
        values: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'],
        message:
          "{VALUE} is not valid, Please choose a category between 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Convertible'",
      },
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, 'Quantity must be a positive number, received {VALUE}'],
    },
    inStock: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true },
);
export const CarModel = model<TCar>('Car', carSchema);
