import { useOrder } from "@/context/order-package"; 
import React from "react"; 
import { steps } from "@/content/data"; 

type Props = {}; // Defining Props type (currently empty)

// ContentSection component definition
export default function ContentSection({}: Props) {
  const { order, dispatch } = useOrder();  

  return (
    <div className="relative flex min-h-screen flex-col justify-between px-4 md:px-0 lg:min-h-0 lg:px-10 lg:pb-4 lg:pt-8">
      <div className="mx-auto grid w-full max-w-md -translate-y-[5rem] gap-8 rounded-2xl bg-white px-4 py-6 md:max-w-xl lg:max-w-none lg:-translate-y-0">
        <header className="grid gap-2">
          <h2 className="text-[32px] font-bold text-MarineBlue">
            {steps[order.step - 1].headline} {/* Displaying the headline of the current step */}
          </h2>
          <p className="text-CoolGray text-base">
            {steps[order.step - 1].subline} {/* Displaying the subline of the current step */}
          </p>
        </header>

        {steps[order.step - 1].content} {/* Displaying the content of the current step */}
      </div>

      {order.step !== 5 && ( // If the current step is not the final step (step 5), render the footer
        <footer className="sticky bottom-4 bg-white px-4 py-2 outline outline-[1rem] outline-white lg:outline-none">
          <div className="mx-auto flex w-full max-w-md items-center justify-between md:max-w-xl lg:max-w-none">
            <button
              className={`text-CoolGray transition hover:text-MarineBlue ${
                order.step === 1 ? "invisible opacity-0" : "opacity-1 visible"
              }`} // Conditionally render the "Go back" button (invisible on the first step)
              onClick={() => {
                if (
                  order.step !== 1 &&
                  order.inputErrors.name &&
                  order.inputErrors.email &&
                  order.inputErrors.phoneNumber
                ) {
                  dispatch({ type: "ChangeStep", payload: order.step - 1 }); // Dispatch action to go back to the previous step
                }
              }}
            >
              Go back {/* Button to go back to the previous step */}
            </button>
            <button
              form={"customer-form"} // Associating this button with the customer form for submission
              type="submit" // Setting button type to submit
              className={`rounded-md px-5 py-2.5 text-white transition ${
                order.step === 4
                  ? "bg-PurplishBlue hover:bg-indigo-400"
                  : "bg-MarineBlue hover:bg-MarineBlue/80"
              }`} // Conditionally set the button color based on the current step
              onClick={() => {
                if (
                  order.step !== 5 &&
                  order.step !== 1 &&
                  order.inputErrors.name &&
                  order.inputErrors.email &&
                  order.inputErrors.phoneNumber
                ) {
                  dispatch({ type: "ChangeStep", payload: order.step + 1 }); // Dispatch action to go to the next step
                }
              }}
            >
              {order.step === 4 ? "Confirm" : "Next Step"} {/* Conditionally render the button text based on the current step */}
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}
