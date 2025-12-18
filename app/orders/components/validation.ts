import { z } from "zod";

export const orderStatusEnum = z.enum([
  "OPEN",
  "PENDING",
  "INPROGRESS",
  "COMPLETED",
  "CANCELLED",
]);

export const orderSchema = z.object({
  customerName: z
    .string()
    .min(3, "Customer name must be at least 3 characters"),

  amount: z
    .coerce
    .number()
    .positive("Amount must be greater than 0"),

  status: orderStatusEnum,
});

export type OrderFormData = z.infer<typeof orderSchema>;
