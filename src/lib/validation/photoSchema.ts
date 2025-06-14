import { z } from "zod"

export const photoSchema = z.object({
  images: z
    .any()
    .refine((files) => files?.length >= 1, {
      message: "Please upload at least one image",
    }),
})

export type PhotoSchema = z.infer<typeof photoSchema>
