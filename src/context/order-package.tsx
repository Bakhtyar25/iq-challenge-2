// Importing necessary modules and data
import { packagePlans } from "@/content/data";
import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
} from "react";

// Initial state for the order
const initialState: Order = {
  step: 1, // Current step in the form
  customerInfo: { name: "", email: "" }, // Customer information
  inputErrors: { name: false, email: false, phoneNumber: false }, // Input error flags
  packagePeriod: "Monthly", // Selected package period
  packagePlan: packagePlans[0], // Selected package plan
  addOns: [], // Selected add-ons
  total: 0, // Total cost
  showErrors: false, // Flag to show errors
};

// Type defining the context properties
type OrderContextProps = {
  order: Order;
  dispatch: Dispatch<Action>;
  getPackagePlanPrice: (packagePlan: PackagePlan) => string; // Function to get package plan price
  addOnIsSelected: (addOn: AddOn) => boolean; // Function to check if add-on is selected
  getAddOnPrice: (addOn: AddOn) => string; // Function to get add-on price
};

// Reducer function to manage the order state
const orderReducer = (state: Order, action: Action): Order => {
  switch (action.type) {
    case "ChangeStep":
      return { ...state, step: action.payload };
    case "ShowErrors":
      return { ...state, showErrors: action.payload };
    case "SetCustomerInfo":
      return { ...state, customerInfo: action.payload };
    case "ChangeInputError":
      return {
        ...state,
        inputErrors: {
          ...state.inputErrors,
          [action.payload.id]: action.payload.value,
        },
      };
    case "SelectPackagePlan":
      return { ...state, packagePlan: action.payload };
    case "AddAddOn":
      return { ...state, addOns: [...state.addOns, action.payload] };
    case "RemoveAddOn":
      return {
        ...state,
        addOns: state.addOns.filter((addOn) => addOn.title !== action.payload),
      };
    case "ToggleAddOns":
      const isSelected = state.addOns.find(
        (addOn) => addOn.title === action.payload.title
      );
      return {
        ...state,
        addOns: !isSelected
          ? [...state.addOns, action.payload]
          : state.addOns.filter(
              (addOn) => addOn.title !== action.payload.title
            ),
      };
    case "SetPackagePeriod":
      return { ...state, packagePeriod: action.payload };
    case "TogglePackageType":
      return {
        ...state,
        packagePeriod: state.packagePeriod === "Monthly" ? "Yearly" : "Monthly",
      };
    case "ResetForm":
      return initialState;
    default:
      return state;
  }
};

// Creating context for order
const OrderContext = createContext<OrderContextProps | undefined>(undefined);

// Provider component to wrap around parts of the app that need access to order state
export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [order, dispatch] = useReducer(orderReducer, initialState);

  // Effect to calculate total cost whenever order state changes
  useEffect(() => {
    order.total = 0;

    if (order.packagePeriod === "Monthly") {
      order.total += order.packagePlan.monthlyPayment;
      order.addOns.map((addOn) => (order.total += addOn.monthlyPrice));
    }

    if (order.packagePeriod === "Yearly") {
      order.total += order.packagePlan.yearlyPayment;
      order.addOns.map((addOn) => (order.total += addOn.yearlyPrice));
    }
  }, [order]);

  // Function to get the price of a package plan
  const getPackagePlanPrice = (packagePlan: PackagePlan) => {
    return order.packagePeriod === "Monthly"
      ? `${packagePlan.monthlyPayment}/mo`
      : `${packagePlan.yearlyPayment}/yr`;
  };

  // Function to check if an Add Ons is selected
  const addOnIsSelected = (addOn: AddOn) =>
    !!order.addOns.find(
      (selectedAddOns) => selectedAddOns.title === addOn.title
    );

  // Function to get the price of an Add Ons
  const getAddOnPrice = (addOn: AddOn) => {
    return order.packagePeriod === "Monthly"
      ? `${addOn.monthlyPrice}/mo`
      : `${addOn.yearlyPrice}/yr`;
  };

  return (
    <OrderContext.Provider
      value={{
        order,
        dispatch,
        getPackagePlanPrice,
        addOnIsSelected,
        getAddOnPrice,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

// Hook to use the order context
export const useOrder = (): OrderContextProps => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
