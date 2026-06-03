import * as z from "zod";

export const productSchema = z.object({
  name: z.string().min(3, { message: "الاسم لازم يكون 3 حروف على الأقل" }),

  price: z
    .number({ message: "السعر لازم يكون رقم" })
    .positive({ message: "السعر لازم يكون أكبر من صفر" }),

  categoryId: z.string().min(1, { message: "لازم تختار قسم للمنتج" }),

  images: z
    .array(
      z.object({
        url: z.string().url(),
      }),
    )
    .min(1, { message: "لازم ترفع صورة واحدة على الأقل للمنتج" }),

  sizes: z
    .array(z.string())
    .min(1, { message: "لازم تختار مقاس واحد على الأقل" }),

  colors: z.array(z.string()).optional(), // الألوان ممكن تكون اختياري لو المنتج لون واحد
});

// استخراج النوع الخاص بالفورم عشان نستخدمه في الواجهة
export type ProductFormValues = z.infer<typeof productSchema>;
