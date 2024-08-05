import { useOrder } from "@/context/order-package";
import React from "react";

type Props = {};

export default function SummarySection({}: Props) {
  const { order, dispatch, getPackagePlanPrice, getAddOnPrice } = useOrder();
  console.log(order)
  return (
    <div>
      <div className="grid gap-5 rounded-lg bg-Alabaster p-6">
        <header>
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-bold text-MarineBlue">
              {order.packagePlan.title} ({order.packagePeriod})
            </h2>
            <p className="font-bold">
              ${getPackagePlanPrice(order.packagePlan)}
            </p>
          </div>
          <button
            className="underline"
            onClick={() => dispatch({ type: "ChangeStep", payload: 2 })}
          >
            Change
          </button>
        </header>
        {order.addOns.length > 0 && (
          <>
            <hr />
            <div className="grid gap-4">
              {order.addOns.map((addOn, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4"
                >
                  <h2 className="text-CoolGray">{addOn.title}</h2>
                  <p>+${getAddOnPrice(addOn)}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <footer className="flex items-center justify-between gap-4 p-6">
        <h2 className="text-CoolGray">
          Total (per {order.packagePeriod === "Monthly" ? "month" : "year"})
        </h2>
        <p className="text-xl font-bold text-violet-700">+${order.total}/yr</p>
      </footer>
    </div>
  );
}
