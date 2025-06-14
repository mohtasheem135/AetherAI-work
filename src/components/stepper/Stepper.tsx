import clsx from "clsx"

type Step = {
  title: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
}

export default function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex flex-col relative pl-5">
      {steps.map((step, index) => {
        const isActive = index === currentStep
        const isCompleted = index < currentStep
        const isLast = index === steps.length - 1

        return (
          <div key={index} className="relative flex items-start gap-4 min-h-[75px]">
            {/* Vertical line */}
            {!isLast && (
              <div
                className={clsx(
                  "absolute left-[15px] mt-2 top-8 w-px h-[calc(60%-1rem)]",
                  isCompleted || isActive ? "bg-blue-500" : "bg-gray-300"
                )}
              />
            )}

            {/* Circle */}
            <div
              className={clsx(
                "h-8 w-8 rounded-full flex items-center justify-center border-2 font-medium text-sm",
                isCompleted
                  ? "bg-blue-600 text-white border-blue-600"
                  : isActive
                  ? "bg-white text-blue-600 border-blue-600"
                  : "bg-[#d7dbe0] text-white border-gray-300"
              )}
            >
              {index + 1}
            </div>

            {/* Labels */}
            <div className="flex flex-col">
              <span className="text-base font-medium text-black">
                {getStepTitle(step.title)}
              </span>
              <span
                className={clsx(
                  "text-sm font-normal text-gray-400",
                  // isCompleted
                  //   ? "text-gray-700"
                  //   : isActive
                  //   ? "text-blue-600"
                  //   : "text-gray-400"
                )}
              >
                {getStepSubtitle(getStepTitle(step.title))}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function getStepTitle(title: string) {
  switch (title) {
    case "Select Your Location":
      return "Location"
    case "Enter Your Vehicle’s VIN":
      return "VIN"
    case "Provide Vehicle Details":
      return "Details"
    case "Upload Photos of the Vehicle":
      return "Photos"
    default:
      return ""
  }
}
function getStepSubtitle(title: string) {
  switch (title) {
    case "Location":
      return "Where your car is located"
    case "VIN":
      return "Vehicle identification number"
    case "Details":
      return "About your vehicle"
    case "Photos":
      return "Upload vehicle images"
    default:
      return ""
  }
}