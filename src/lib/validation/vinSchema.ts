import { z } from "zod"

export const vinSchema = z.object({
  vin: z
    .string()
    .length(17, "Your VIN must be exactly 17 characters and can’t include I, O, or Q.")
    .regex(/^[A-HJ-NPR-Z0-9]+$/, "VIN cannot contain I, O, or Q"),
})

export type VinSchema = z.infer<typeof vinSchema>
