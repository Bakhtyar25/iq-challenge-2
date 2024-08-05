"use client";

import ContentSection from "@/components/ContentSection";
import StepBar from "@/components/StepBar";
import { OrderProvider } from "@/context/order-package";
import Image from "next/image";

type Props = {};

export default function Home({}: Props) {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 py-0 bg-slate-100">
        <div className="-mt-6 grid w-full gap-4  lg:max-w-4xl lg:grid-cols-[auto_1fr] lg:rounded-2xl lg:bg-white lg:p-4">
          <OrderProvider>
            <StepBar />
            <ContentSection />
          </OrderProvider>
        </div>
      </main>
    </>
  );
}
