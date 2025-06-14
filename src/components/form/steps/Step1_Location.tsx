"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  locationSchema,
  LocationSchema,
} from "@/lib/validation/locationSchema";
import { stateCityMap } from "@/lib/locationData";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useFormData } from "@/context/FormDataContext";
import { MoveRight } from "lucide-react";

export default function Step1_Location({ onNext }: { onNext: () => void }) {
  const { formData, updateFormData } = useFormData();

  const form = useForm<LocationSchema>({
    resolver: zodResolver(locationSchema),
    mode: "onChange",
    defaultValues: {
      state: formData.state || "",
      city: formData.city || "",
    },
  });

  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    if (formData.state) {
      setCities(stateCityMap[formData.state] || []);
    }
  }, [formData.state]);

  // Handle form validation and call onNext if valid
  const handleNext = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      updateFormData(form.getValues());
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Select your location</h2>
        <p className="text-gray-600 mt-1 text-sm">
          Your selected city will help us match your vehicle information more
          accurately.
        </p>
      </div>

      {/* State */}
      <div className="space-y-2">
        <Label>State</Label>
        <Select
          onValueChange={(value) => {
            form.setValue("state", value);
            const newCities =
              stateCityMap[value as keyof typeof stateCityMap] || [];
            setCities(newCities);
            form.setValue("city", ""); 
          }}
          value={form.watch("state")}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose a state" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(stateCityMap).map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.formState.errors.state && (
          <p className="text-sm text-red-500">
            {form.formState.errors.state.message}
          </p>
        )}
      </div>

      {/* City */}
      <div className="space-y-2">
        <Label>City</Label>
        <Select
          onValueChange={(value) => form.setValue("city", value)}
          value={form.watch("city")} // <- Binds current city value
          disabled={!cities.length}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose a city" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {form.formState.errors.city && (
          <p className="text-sm text-red-500">
            {form.formState.errors.city.message}
          </p>
        )}
      </div>

      {/* Navigation Button */}
      <div className="flex justify-end mt-6">
        <Button variant="form_btn_next" onClick={handleNext}className="flex items-center gap-2">Next <MoveRight /></Button>
      </div>
    </div>
  );
}
