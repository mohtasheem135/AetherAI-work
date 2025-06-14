"use client"

import { createContext, useContext, useState } from "react"
import { LocationSchema } from "@/lib/validation/locationSchema"
import { VinSchema } from "@/lib/validation/vinSchema"
import { DetailsSchema } from "@/lib/validation/detailsSchema"
import { PhotoSchema } from "@/lib/validation/photoSchema"

type FormData = Partial<LocationSchema & VinSchema & DetailsSchema & PhotoSchema>

type ContextType = {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

const FormDataContext = createContext<ContextType | undefined>(undefined)

export const FormDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<FormData>({})

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  return (
    <FormDataContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormDataContext.Provider>
  )
}

export const useFormData = () => {
  const context = useContext(FormDataContext)
  if (!context) {
    throw new Error("useFormData must be used within FormDataProvider")
  }
  return context
}
