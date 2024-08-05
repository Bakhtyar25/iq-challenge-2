import { useOrder } from "@/context/order-package"; // Importing custom hook to use order context
import React from "react";

type Props = {}; // Defining Props type (currently empty)

// SummarySection component definition
export default function SummarySection({}: Props) {
  const { order, dispatch, getPackagePlanPrice, getAddOnPrice } = useOrder();

  return (
    <div>
      <div className="grid gap-5 rounded-lg bg-Alabaster p-6">
        <header>
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-bold text-MarineBlue">
              {order.packagePlan.title} ({order.packagePeriod}){" "}
              {/* Displaying selected package plan title and period */}
            </h2>
            <p className="font-bold">
              ${getPackagePlanPrice(order.packagePlan)}{" "}
              {/* Displaying selected package plan price */}
            </p>
          </div>
          <button
            className="underline"
            onClick={() => dispatch({ type: "ChangeStep", payload: 2 })} // Dispatching action to change step to 2 (Select plan step)
          >
            Change {/* Button to change the selected package plan */}
          </button>
        </header>

        {order.addOns.length > 0 && ( // If there are selected add-ons, render the add-ons section
          <>
            <hr />
            <div className="grid gap-4">
              {order.addOns.map((addOn, index) => (
                <div
                  key={index} // Adding unique key for each add-on
                  className="flex items-center justify-between gap-4"
                >
                  <h2 className="text-CoolGray">
                    {addOn.title} {/* Displaying add-on title */}
                  </h2>
                  <p>
                    +${getAddOnPrice(addOn)} {/* Displaying add-on price */}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <footer className="flex items-center justify-between gap-4 p-6">
        <h2 className="text-CoolGray">
          Total (per {order.packagePeriod === "Monthly" ? "month" : "year"}){" "}
          {/* Displaying total period (monthly or yearly) */}
        </h2>
        <p className="text-xl font-bold text-violet-700">
          +${order.total}/{order.packagePeriod === "Monthly" ? "mo" : "yr"}{" "}
          {/* Displaying total price */}
        </p>
      </footer>
    </div>
  );
}
