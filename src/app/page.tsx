import MultiStepForm from "@/components/form/MultiStepForm";
import { Button } from "@/components/ui/button";
import { FormDataProvider } from "@/context/FormDataContext";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className="absolute inset-0 z-0 h-screen bg-gradient-to-br from-[#3B82F6] via-[#D833D5] opacity-40"
        style={{
          clipPath: "polygon(0% 0%, 100% 0%, 100% 30%, 0% 120%)",
        }}
      ></div>

      <div className="relative z-10 px-6 lg:px-0">
        <FormDataProvider>
          <MultiStepForm />
        </FormDataProvider>
      </div>
    </div>
  );
}
