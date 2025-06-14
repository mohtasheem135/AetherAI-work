"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { detailsSchema, DetailsSchema } from "@/lib/validation/detailsSchema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useFormData } from "@/context/FormDataContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoveLeft, MoveRight } from "lucide-react";

export default function Step3_Details({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { formData, updateFormData } = useFormData();

  const form = useForm<DetailsSchema>({
    resolver: zodResolver(detailsSchema),
    mode: "onChange",
    defaultValues: {
      make: formData.make || "",
      model: formData.model || "",
      year: formData.year || "",
    },
  });

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
        <h2 className="text-2xl font-semibold">Vehicle Details</h2>
        <p className="text-gray-600 mt-1 text-sm">
          Tell us more about your car so we can pre-fill matching information.
        </p>
      </div>

      {/* Make + Model (Side by Side) */}
      <div className="flex gap-4">
        {/* Make */}
        <div className="flex-1 space-y-2">
          <Label htmlFor="make">Make</Label>
          <Input
            id="make"
            placeholder="e.g. Toyota"
            {...form.register("make")}
          />
          {form.formState.errors.make && (
            <p className="text-sm text-red-500">
              {form.formState.errors.make.message}
            </p>
          )}
        </div>

        {/* Model */}
        <div className="flex-1 space-y-2">
          <Label htmlFor="model">Model</Label>
          <Input
            id="model"
            placeholder="e.g. Corolla"
            {...form.register("model")}
          />
          {form.formState.errors.model && (
            <p className="text-sm text-red-500">
              {form.formState.errors.model.message}
            </p>
          )}
        </div>
      </div>

      {/* Year (Dropdown) */}
      <div className="space-y-2">
        <Label>Year</Label>
        <Select
          onValueChange={(value) => form.setValue("year", value)}
          value={form.watch("year")}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 30 }, (_, i) => {
              const year = `${new Date().getFullYear() - i}`;
              return (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        {form.formState.errors.year && (
          <p className="text-sm text-red-500">
            {form.formState.errors.year.message}
          </p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button variant="form_btn_back" onClick={onBack} className="flex items-center gap-2">
          <MoveLeft /> Back
        </Button>
        <Button
          variant="form_btn_next"
          onClick={handleNext}
          className="flex items-center gap-2"
        >
          Next <MoveRight />
        </Button>
      </div>
    </div>
  );
}
