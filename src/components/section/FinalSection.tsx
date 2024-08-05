import ThankYou from "@/content/svg/ThankYou";
import { useOrder } from "@/context/order-package";
import React from "react";

type Props = {};

export default function FinalSection({}: Props) {
  const { dispatch } = useOrder();
  return (

      <div className="grid h-full items-center justify-center gap-8">
        <div className="mx-auto">
          <ThankYou />
        </div>
        <div className="grid gap-4">
          <h2 className="mx-auto text-[32px] font-bold text-MarineBlue">
            Thank you!
          </h2>
          <p className="text-center text-CoolGray">
            Thanks for confirming your subscription! We hope you have fun using
            our platform. If you ever need support, please feel free to email us
            at support@loremgaming.com.
            <br />
            <button
              className="mt-2 underline"
              onClick={() => dispatch({ type: "ResetForm" })}
            >
              Continue
            </button>
          </p>
        </div>
      </div>
  );
}
