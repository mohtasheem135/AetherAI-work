"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vinSchema, VinSchema } from "@/lib/validation/vinSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormData } from "@/context/FormDataContext";
import {  MoveLeft, MoveRight } from "lucide-react";

export default function Step2_VIN({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { formData, updateFormData } = useFormData();

  const form = useForm<VinSchema>({
    resolver: zodResolver(vinSchema),
    mode: "onChange",
    defaultValues: {
      vin: formData.vin || "",
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
        <h2 className="text-2xl font-semibold">Enter your vehicle’s VIN</h2>
        <p className="text-gray-600 mt-1 text-sm">
          The vehicle Identification Number (VIN) is a 17 character code unique to your vehicle
        </p>
      </div>

      {/* VIN Input */}
      <div className="space-y-2">
        {/* <Label htmlFor="vin">Vehicle VIN</Label> */}
        <Input
          id="vin"
          placeholder="e.g. 1HGCM82633A123456"
          {...form.register("vin")}
        />
        {form.formState.errors.vin && (
          <p className="text-sm text-red-500">
            {form.formState.errors.vin.message}
          </p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button variant="form_btn_back" onClick={onBack} className="flex items-center gap-2">
          <MoveLeft /> Back
        </Button>
        <Button variant="form_btn_next" onClick={handleNext} className="flex items-center gap-2">Next <MoveRight /></Button>
      </div>
    </div>
  );
}
