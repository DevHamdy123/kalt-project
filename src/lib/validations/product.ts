import * as z from "zod";

export const productSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),

  price: z.coerce
    .number({ message: "Price must be a number" })
    .positive({ message: "Price must be greater than zero" }),

  // Add stock field
  stock: z.coerce
    .number({ message: "Stock must be a number" })
    .min(0, { message: "Stock must be 0 or greater" }),

  categoryId: z
    .string()
    .min(1, { message: "You must select a product category" }),

  images: z
    .array(
      z.object({
        url: z.string().url(),
      }),
    )
    .min(1, { message: "You must upload at least one product image" }),

  sizes: z
    .array(z.string())
    .min(1, { message: "You must select at least one size" }),

  colors: z.array(z.string()).optional(),
});

// Type is automatically inferred from the schema
export type ProductFormValues = z.infer<typeof productSchema>;
