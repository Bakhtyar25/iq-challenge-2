import { packagePlans } from "@/content/data"; // Importing package plans data
import { useOrder } from "@/context/order-package"; // Importing custom hook to use order context
import React from "react"; // Importing React
import PackageSwitch from "../PackageSwitch"; // Importing PackageSwitch component

type Props = {}; // Defining Props type (currently empty)

// PlanSection component definition
export default function PlanSection({}: Props) {
  const { order, dispatch, getPackagePlanPrice } = useOrder(); // Destructuring order state, dispatch function, and getPackagePlanPrice function from custom hook

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 lg:grid-cols-3">
        {packagePlans.map((packagePlan, index) => (
          <div
            key={index} // Adding unique key for each package plan
            className={`flex cursor-pointer flex-col justify-between gap-1 rounded-lg border p-4 transition-all ease-in-out duration-200 lg:min-h-[10rem] hover:border-PurplishBlue hover:bg-Alabaster ${
              packagePlan.title === order.packagePlan.title
                ? "border-PurplishBlue bg-Alabaster"
                : "border-gray-200 bg-transparent"
            }`}
            onClick={() => {
              dispatch({ type: "SelectPackagePlan", payload: packagePlan }); // Dispatching action to select package plan
            }}
          >
            {packagePlan.icon} {/* Rendering package plan icon */}
            <div>
              <h2 className="mb-0.5 font-bold text-MarineBlue">
                {packagePlan.title} {/* Rendering package plan title */}
              </h2>
              <p className="text-sm text-CoolGray">
                ${getPackagePlanPrice(packagePlan)} {/* Rendering package plan price */}
              </p>
              {order.packagePeriod === "Yearly" && (
                <p className="text-xs text-MarineBlue">
                  {packagePlan.yearlyOffer} {/* Rendering yearly offer if package period is yearly */}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <PackageSwitch /> {/* Rendering PackageSwitch component */}
    </div>
  );
}
