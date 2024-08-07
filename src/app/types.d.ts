type Step = {
  stepTitle: string;
  headline: string;
  subline: string;
  content: JSX.Element;
};

type PackagePlanTitle = "Arcade" | "Advanced" | "Pro";
type PackagePeriod = "Monthly" | "Yearly";

type PackagePlan = {
  title: PackagePlanTitle;
  icon: JSX.Element;
  monthlyPayment: number;
  yearlyPayment: number;
  yearlyOffer: string;
};

type OrderProviderProps = {
  children: ReactNode;
};

type CustomerInfo = {
  name: string;
  email: string;
  phoneNumber?: string;
};

type Order = {
  step: number;
  customerInfo: CustomerInfo;
  inputErrors: { name: boolean; email: boolean; phoneNumber: boolean };
  packagePeriod: PackagePeriod;
  packagePlan: PackagePlan;
  addOns: AddOn[];
  total: number;
  showErrors: boolean;
};

type Input = {
  id: UserFormField;
  title: string;
  type: "text" | "email" | "number";
  placeholder: string;
  required: boolean;
};

type Action =
  | { type: "ChangeStep"; payload: number }
  | { type: "ShowErrors"; payload: boolean }
  | { type: "SetCustomerInfo"; payload: CustomerInfo }
  | { type: "ChangeInputError"; payload: { id: UserFormField; value: boolean } }
  | { type: "SelectPackagePlan"; payload: PackagePlan }
  | { type: "AddAddOn"; payload: AddOn }
  | { type: "RemoveAddOn"; payload: string }
  | { type: "ToggleAddOns"; payload: AddOn }
  | { type: "SetPackagePeriod"; payload: PackagePeriod }
  | { type: "TogglePackageType"; payload: null }
  | { type: "ResetForm" };

type AddOn = {
  title: string;
  subline: string;
  monthlyPrice: number;
  yearlyPrice: number;
};
