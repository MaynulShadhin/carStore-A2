import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z.string().email('Invalid Email format'),
  car: z.string({ message: 'car ID is required' }),
  quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
  totalPrice: z
    .number()
    .min(0, { message: 'Toal price must be a positive number' }),
});

export default orderValidationSchema;
