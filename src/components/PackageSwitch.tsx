import { useOrder } from "@/context/order-package";
import React from "react";

type Props = {};

export default function PackageSwitch({}: Props) {
  const { order, dispatch } = useOrder();
  const monthlyPackagePeriod = order.packagePeriod === "Monthly";
  return (
    <div className="flex items-center justify-center gap-2 rounded-lg bg-app-alabaster p-4">
      <div
        className={`cursor-pointer transition ${
          monthlyPackagePeriod ? "text-app-marine-blue" : "text-app-cool-gray"
        }`}
        onClick={() =>
          dispatch({ type: "SetPackagePeriod", payload: "Monthly" })
        }
      >
        Monthly
      </div>
      <div
        className="relative h-5 w-10 cursor-pointer rounded-full bg-sky-900"
        onClick={() => dispatch({ type: "TogglePackageType", payload: null })}
      >
        <span
          className={`absolute top-1/2 block h-3 w-3 -translate-y-1/2 duration-300 ease-linear rounded-full bg-white transition-all ${
            monthlyPackagePeriod
              ? "left-1 duration-300 ease-linear "
              : "right-1 transition-all"
          }`}
        ></span>
      </div>
      <div
        className={`cursor-pointer transition ${
          monthlyPackagePeriod ? "text-app-cool-gray" : "text-app-marine-blue"
        }`}
        onClick={() =>
          dispatch({ type: "SetPackagePeriod", payload: "Yearly" })
        }
      >
        Yearly
      </div>
    </div>
  );
}
