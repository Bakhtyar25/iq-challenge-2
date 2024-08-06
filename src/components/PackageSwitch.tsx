import { useOrder } from "@/context/order-package";
import React from "react";
import { Switch } from "./ui/switch";

type Props = {};

// PackageSwitch component definition
export default function PackageSwitch({}: Props) {
  const { order, dispatch } = useOrder();
  const monthlyPackagePeriod = order.packagePeriod === "Monthly"; // Check if the current package period is monthly

  return (
    <div className="flex items-center justify-center gap-2 rounded-lg bg-Alabaster p-4">
      <div
        className={`cursor-pointer transition ${
          monthlyPackagePeriod ? "text-MarineBlue" : "text-CoolGray"
        }`} // Set the color based on whether the package period is monthly or not
        onClick={
          () => dispatch({ type: "SetPackagePeriod", payload: "Monthly" }) // Dispatch action to set the package period to monthly
        }
      >
        Monthly
      </div>
      <div
        className="relative  cursor-pointer rounded-full flex items-center"
        onClick={() => dispatch({ type: "TogglePackageType", payload: null })} // Dispatch action to toggle the package type
      >
        {/* <span
          className={`absolute top-1/2 block h-3 w-3 -translate-y-1/2 duration-300 ease-linear rounded-full bg-white transition-all ${
            monthlyPackagePeriod
              ? "left-1 duration-300 ease-linear "
              : "right-1 transition-all"
          }`} // Set the position of the toggle switch based on whether the package period is monthly or not
        ></span> */}

        <Switch id="airplane-mode" />
      </div>
      <div
        className={`cursor-pointer transition ${
          monthlyPackagePeriod ? "text-CoolGray" : "text-app-marine-blue"
        }`} // Set the color based on whether the package period is yearly or not
        onClick={
          () => dispatch({ type: "SetPackagePeriod", payload: "Yearly" }) // Dispatch action to set the package period to yearly
        }
      >
        Yearly
      </div>
    </div>
  );
}
