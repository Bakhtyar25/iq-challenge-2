import { useOrder } from "@/context/order-package";
import React from "react";
import CustomerForm from "./section/CustomerForm";
import { steps } from "@/content/data";

type Props = {};

export default function ContentSection({}: Props) {
  const { order, dispatch } = useOrder();
  return (
    <div className="relative flex min-h-screen flex-col justify-between px-4 md:px-0 lg:min-h-0 lg:px-10 lg:pb-4 lg:pt-8">
      <div className="mx-auto grid w-full max-w-md -translate-y-[5rem] gap-8 rounded-2xl bg-white px-4 py-6 md:max-w-xl lg:max-w-none lg:-translate-y-0">
        <header className="grid gap-2">
          <h2 className="text-[32px] font-bold text-MarineBlue">
            {steps[order.step - 1].headline}
          </h2>
          <p className="text-CoolGray text-base">
            {steps[order.step - 1].subline}
          </p>
        </header>

        {steps[order.step - 1].content}
      </div>

      {order.step !== 5 && (
        <footer className="sticky bottom-4 bg-white px-4 py-2 outline outline-[1rem] outline-white lg:outline-none">
          <div className="mx-auto flex w-full max-w-md items-center justify-between md:max-w-xl lg:max-w-none">
            <button
              className={`text-CoolGray transition hover:text-MarineBlue ${
                order.step === 1 ? "invisible opacity-0" : "opacity-1 visible"
              }`}
              onClick={() => {
                if (
                  order.step !== 1 &&
                  order.inputErrors.name &&
                  order.inputErrors.email &&
                  order.inputErrors.phoneNumber
                ) {
                  dispatch({ type: "ChangeStep", payload: order.step - 1 });
                }
              }}
            >
              Go back
            </button>
            <button
              form={"customer-form"}
              type="submit"
              className={`rounded-md px-5 py-2.5 text-white transition ${
                order.step === 4
                  ? "bg-PurplishBlue hover:bg-PurplishBlue"
                  : "bg-MarineBlue hover:bg-MarineBlue-light"
              }`}
              onClick={() => {
                if (
                  order.step !== 5 &&
                  order.step !== 1 &&
                  order.inputErrors.name &&
                  order.inputErrors.email &&
                  order.inputErrors.phoneNumber
                ) {
                  dispatch({ type: "ChangeStep", payload: order.step + 1 });
                }
              }}
            >
              {order.step === 4 ? "Confirm" : "Next Step"}
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}
