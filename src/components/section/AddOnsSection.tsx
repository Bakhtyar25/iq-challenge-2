"use client";

// Importing necessary data and context
import { addOns } from "@/content/data";
import { useOrder } from "@/context/order-package";

// Defining the props type for the component (currently empty)
type Props = {};

// Exporting the AddOnsSection component as the default export
export default function AddOnsSection({}: Props) {
  // Using the custom useOrder hook to get the order state and dispatch function
  const { order, dispatch, addOnIsSelected, getAddOnPrice } = useOrder();

  return (
    <div className="grid gap-4">
      {/* Mapping through each add-on in the addOns array */}
      {addOns.map((addOn, index) => (
        <div
          key={index} // Unique key for each add-on item
          className={`flex cursor-pointer items-center justify-center gap-4 rounded-lg border p-4 transition hover:border-PurplishBlue hover:bg-Alabaster ${
            addOnIsSelected(addOn)
              ? "border-PurplishBlue bg-Alabaster" // Styles for selected add-on
              : "border-gray-200 bg-transparent" // Styles for non-selected add-on
          }`}
          onClick={() => dispatch({ type: "ToggleAddOns", payload: addOn })} // Dispatching an action to toggle the add-on selection
        >
          <div
            className={`flex h-5 w-5 items-center justify-center rounded border transition ${
              addOnIsSelected(addOn) ? "bg-PurplishBlue" : "bg-transparent" // Checkbox style based on selection
            }`}
          >
            {addOnIsSelected(addOn) && ( // Conditionally rendering the checkmark SVG if the add-on is selected
              <svg
                width="11"
                height="8"
                viewBox="0 0 11 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.375 3.9375L4 6.5625L9.625 0.9375"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-MarineBlue">{addOn.title}</h2>{" "}
            {/* Title of the add-on */}
            <p className="text-app-cool-gray">{addOn.subline}</p>{" "}
            {/* Description of the add-on */}
          </div>
          <div className="text-sm text-PurplishBlue">
            +${getAddOnPrice(addOn)} {/* Price of the add-on */}
          </div>
        </div>
      ))}
    </div>
  );
}
