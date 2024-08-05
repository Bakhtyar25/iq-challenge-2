import { packagePlans } from "@/content/data";
import { useOrder } from "@/context/order-package";
import React from "react";
import PackageSwitch from "../PackageSwitch";

type Props = {};

export default function PlanSection({}: Props) {
  const { order, dispatch, getPackagePlanPrice } = useOrder();
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 lg:grid-cols-3">
        {packagePlans.map((packagePlan, index) => (
          <div
            key={index}
            className={`flex cursor-pointer flex-col justify-between gap-1 rounded-lg border p-4 transition-all ease-in-out duration-200 lg:min-h-[10rem] hover:border-PurplishBlue hover:bg-Alabaster ${
              packagePlan.title === order.packagePlan.title
                ? "border-PurplishBlue bg-Alabaster"
                : "border-gray-200 bg-transparent"
            }`}
            onClick={() => {
              dispatch({ type: "SelectPackagePlan", payload: packagePlan });
            }}
            //   dispatch({ type: "SET_package_PLAN", payload: packagePlan })
          >
            {packagePlan.icon}
            <div>
              <h2 className="mb-0.5 font-bold text-MarineBlue">
                {packagePlan.title}
              </h2>
              <p className="text-sm text-CoolGray">
                ${getPackagePlanPrice(packagePlan)}
              </p>
              {order.packagePeriod === "Yearly" && (
                <p className="text-xs text-MarineBlue">
                  {packagePlan.yearlyOffer}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <PackageSwitch />
    </div>
  );
}
