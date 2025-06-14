"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { photoSchema, PhotoSchema } from "@/lib/validation/photoSchema";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useFormData } from "@/context/FormDataContext";
import { MoveLeft } from "lucide-react";
import Image from "next/image";

export default function Step4_Photos({
  onBack,
  onSubmit,
}: {
  onBack: () => void;
  onSubmit: (data: PhotoSchema) => void;
}) {
  const { formData, updateFormData } = useFormData();

  const form = useForm<PhotoSchema>({
    resolver: zodResolver(photoSchema),
    mode: "onChange",
    defaultValues: {
      images: formData.images || undefined,
    },
  });

  const [previews, setPreviews] = useState<string[]>([]);

  // 🔄 Restore previews on mount if formData.images exists
  useEffect(() => {
    if (formData.images && formData.images.length > 0) {
      const urls = Array.from(formData.images as FileList).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews(urls);
    }
  }, [formData.images]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
    form.setValue("images", e.target.files);
  };

  const handleSubmit = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      const data = form.getValues();
      updateFormData(data);
      onSubmit(data);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Upload Photos</h2>
        <p className="text-gray-600 mt-1 text-sm">
          Upload clear pictures of your vehicle (front, side, and back).
        </p>
      </div>

      {/* File Input */}
      <div className="space-y-2">
        <Label htmlFor="images">Photos</Label>
        <input
          id="images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="border border-gray-300 px-4 py-2 rounded-md w-full"
        />
        {form.formState.errors.images?.message && (
          <p className="text-sm text-red-500">
            {String(form.formState.errors.images.message)}
          </p>
        )}
      </div>

      {/* Preview */}
      <div className="flex flex-wrap gap-4 mt-4">
        {previews.map((src, idx) => (
          <Image
            key={idx}
            src={src}
            alt={`Preview ${idx}`}
            width={112} // 28 * 4 (1rem = 16px)
            height={112}
            className="object-cover rounded-md border border-gray-200"
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button
          variant="form_btn_back"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <MoveLeft /> Back
        </Button>
        <Button variant="form_btn_next" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}
