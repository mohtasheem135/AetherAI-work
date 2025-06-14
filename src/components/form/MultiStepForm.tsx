"use client";

import { useState } from "react";
import Stepper from "@/components/stepper/Stepper";
import Step1_Location from "@/components/form/steps/Step1_Location";
import Step2_VIN from "@/components/form/steps/Step2_VIN";
import Step3_Details from "@/components/form/steps/Step3_Details";
import Step4_Photos from "@/components/form/steps/Step4_Photos";

const steps = [
  {
    title: "Select Your Location",
    component: (onNext: () => void) => <Step1_Location onNext={onNext} />,
  },
  {
    title: "Enter Your Vehicle’s VIN",
    component: (onNext: () => void, onBack: () => void) => (
      <Step2_VIN onNext={onNext} onBack={onBack} />
    ),
  },
  {
    title: "Provide Vehicle Details",
    component: (onNext: () => void, onBack: () => void) => (
      <Step3_Details onNext={onNext} onBack={onBack} />
    ),
  },
  {
    title: "Upload Photos of the Vehicle",
    component: (_onNext: () => void, onBack: () => void) => (
      <Step4_Photos
        onBack={onBack}
        onSubmit={(data) => {
          console.log("✅ Final Submission Data:", data);
        }}
      />
    ),
  },
];
export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const step = steps[currentStep];

  return (
    <div className="lg:w-4xl mx-auto px-2 lg:px-[50px] py-2 lg:py-8 bg-white shadow-lg rounded-2xl">
      {/* Common Step Title */}
      <div className="h-[90px] bg-[#e6f2ff] rounded-[10px] px-[20px] hidden lg:flex items-center mb-[20px]">
        <h1 className="text-2xl lg:text-3xl font-semibold">{step.title}</h1>
      </div>

      {/* Stepper + Form Layout */}
      <div className="flex gap-10">
        {/* Left: Stepper Sidebar */}
        <div className="w-[40%] border-r-2 border-gray-200 hidden lg:block">
          <Stepper currentStep={currentStep} steps={steps} />
        </div>

        {/* Right: Form Content */}
        <div className="lg:w-[60%] px-2 lg:px-0">
          {step.component(
            () => setCurrentStep(currentStep + 1),
            () => setCurrentStep(currentStep - 1)
          )}
        </div>
      </div>
    </div>
  );
}
