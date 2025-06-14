import { z } from "zod"

export const detailsSchema = z.object({
  make: z.string().min(1, "Car make is required"),
  model: z.string().min(1, "Car model is required"),
  year: z
    .string()
    .regex(/^\d{4}$/, "Year must be 4 digits")
    .refine((val) => {
      const year = parseInt(val)
      return year >= 1990 && year <= new Date().getFullYear()
    }, "Year must be between 1990 and current year"),
})

export type DetailsSchema = z.infer<typeof detailsSchema>
