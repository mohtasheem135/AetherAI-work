import { z } from "zod"

export const locationSchema = z.object({
  state: z.string().min(1, "Please select a state"),
  city: z.string().min(1, "Please select a city"),
})

export type LocationSchema = z.infer<typeof locationSchema>
