import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useOrder } from "@/context/order-package";
import { Button } from "../ui/button";
import { CustomerInfoInputs } from "@/content/data";

// Props type definition (currently empty)
type Props = {};

// Schema definition using Zod for form validation
const formSchema = z.object({
  name: z
    .string()
    .max(45, {
      message: "name must not exceed 45 characters",
    })
    .min(2, {
      message: "name must be at least 2 characters.",
    }),
  email: z.string().email("This is not a valid email."),
  phoneNumber: z
    .string()
    .min(11, { message: "Must be a valid mobile number" })
    .max(11, { message: "Must be a valid mobile number" }),
});

// CustomerForm component definition
export default function CustomerForm({}: Props) {
  const { order, dispatch } = useOrder(); // Using the custom useOrder hook to get the order state and dispatch function

  // Initializing the form with default values and validation schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(order?.customerInfo!),
  });

  // Function to handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch({ type: "SetCustomerInfo", payload: values }); // Dispatching action to set customer info
    dispatch({ type: "ChangeStep", payload: order.step + 1 }); // Dispatching action to change to the next step
    dispatch({
      type: "ChangeInputError",
      payload: { id: "name", value: values?.name ? true : false },
    });
    dispatch({
      type: "ChangeInputError",
      payload: { id: "email", value: values?.email ? true : false },
    });
    dispatch({
      type: "ChangeInputError",
      payload: { id: "phoneNumber", value: values?.phoneNumber ? true : false },
    });
  }

  return (
    <div>
      <div>
        <Form {...form}>
          <form
            id="customer-form"
            onSubmit={form.handleSubmit(onSubmit)} // Handling form submission
            className="space-y-5 max-w-4xl mx-auto g"
          >
            {CustomerInfoInputs.map((input) => (
              <FormField
                key={input.id} // Adding a unique key for each form field
                control={form.control}
                name={input?.id}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between text-base">
                      <span className="!text-MarineBlue font-light">
                        {input?.title} {/* Input label */}
                      </span>
                      <FormMessage className="text-StrawberryRed font-light" />{" "}
                      {/* Error message */}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="!rounded-md !border !px-5 text-base !py-6 focus-visible:!ring-0 focus-visible:!ring-offset-0 focus-visible:!border-MarineBlue focus-visible:!border-2"
                        {...field}
                        placeholder={input?.placeholder}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </form>
        </Form>
      </div>
    </div>
  );
}

// Function to get default values for the form fields
function getDefaultValues(values: CustomerInfo) {
  const defaultValues: CustomerInfo = {
    name: "",
    email: "",
    phoneNumber: "",
  };

  return { ...defaultValues, ...values };
}
