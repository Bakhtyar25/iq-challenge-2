// Importing necessary components and SVG icons
import SectionContainer from "@/components/SectionContainer";
import Advanced from "./svg/Advanced";
import Arcade from "./svg/Arcade";
import Pro from "./svg/Pro";
import CustomerForm from "@/components/section/CustomerForm";
import PlanSection from "@/components/section/PlanSection";
import AddOnsSection from "@/components/section/AddOnsSection";
import SummarySection from "@/components/section/SummarySection";
import FinalSection from "@/components/section/FinalSection";

// Defining the steps for a multi-step form process
export const steps: Step[] = [
  {
    stepTitle: "Your info",
    headline: "Personal info",
    subline: "Please provide your name, email address, and phone number.",
    content: (
      <SectionContainer>
        <CustomerForm />
      </SectionContainer>
    ),
  },
  {
    stepTitle: "Select plan",
    headline: "Select your plan",
    subline: "You have the option of monthly or yearly billing.",
    content: (
      <SectionContainer>
        <PlanSection />
      </SectionContainer>
    ),
  },
  {
    stepTitle: "Add-ons",
    headline: "Pick add-ons",
    subline: "Add-ons help enhance your gaming experience.",
    content: (
      <SectionContainer>
        <AddOnsSection />
      </SectionContainer>
    ),
  },
  {
    stepTitle: "Summary",
    headline: "Finishing up",
    subline: "Double-check everything looks OK before confirming.",
    content: (
      <SectionContainer>
        <SummarySection />
      </SectionContainer>
    ),
  },
  {
    stepTitle: "",
    headline: "",
    subline: "",
    content: (
      <SectionContainer>
        <FinalSection />
      </SectionContainer>
    ),
  },
];

// Defining the available package plans
export const packagePlans: PackagePlan[] = [
  {
    title: "Arcade",
    icon: <Arcade />,
    monthlyPayment: 9,
    yearlyPayment: 90,
    yearlyOffer: "2 month free",
  },
  {
    title: "Advanced",
    icon: <Advanced />,
    monthlyPayment: 12,
    yearlyPayment: 120,
    yearlyOffer: "2 month free",
  },
  {
    title: "Pro",
    icon: <Pro />,
    monthlyPayment: 15,
    yearlyPayment: 150,
    yearlyOffer: "2 month free",
  },
];

// Defining the input fields for customer information
export const CustomerInfoInputs: Input[] = [
  {
    id: "name",
    title: "Name",
    type: "text",
    placeholder: "e.g. Stephen King",
    required: true,
  },
  {
    id: "email",
    title: "Email Address",
    type: "email",
    placeholder: "e.g. stephenking@lorem.com",
    required: true,
  },
  {
    id: "phoneNumber",
    title: "Phone Number",
    type: "number",
    placeholder: "e.g. 07701234567",
    required: true,
  },
];

// Defining the available add-ons
export const addOns: AddOn[] = [
  {
    title: "Online Service",
    subline: "Access to multiplayer games",
    monthlyPrice: 1,
    yearlyPrice: 10,
  },
  {
    title: "Larger Storage",
    subline: "Extra 1TB of cloud save",
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
  {
    title: "Customizable profile",
    subline: "Custom theme on your profile",
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
];
