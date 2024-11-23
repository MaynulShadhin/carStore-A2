import { z } from 'zod';

const carValidationSchema = z.object({
  brand: z.string().min(1, { message: 'Brand Name is required' }),
  model: z.string().min(1, { message: 'Model is required' }),
  year: z.number({ message: 'Year must be a number' }),
  price: z
    .number({ invalid_type_error: 'Price must be a number' })
    .min(0, { message: 'Price must be a positive number' }),
  category: z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], {
    message:
      "Category must be one of these: 'Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'",
  }),
  description: z.string().min(1, { message: 'Description is required' }),
  quantity: z
    .number({ invalid_type_error: 'Quantity must be a number' })
    .min(0, { message: 'Quantity must be at least 0' }),
  inStock: z.boolean({ invalid_type_error: 'InStock must be true or false' }),
});

export default carValidationSchema;
