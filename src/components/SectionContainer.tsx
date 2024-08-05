"use client";
import { ReactNode, useEffect } from "react"; 
import { useAnimate } from "framer-motion"; 

type Props = {
  children: ReactNode; // Defining the Props type to include children of type ReactNode
};

// SectionContainer component definition
export default function SectionContainer({ children }: Props) {
  const [scope, animate] = useAnimate(); // Using useAnimate hook to get scope and animate functions

  useEffect(() => {
    if (children) { // If children are present, trigger animation
      animate(
        scope.current, // Target the current scope element
        { opacity: [0, 1], y: [16, 0] }, // Define the animation to change opacity from 0 to 1 and y position from 16px to 0
        { ease: "easeInOut", duration: 0.3 } // Define the easing function and duration for the animation
      );
    }
  }, [children, animate, scope]); // Dependencies array to re-run effect when children, animate, or scope change

  return <div ref={scope}>{children}</div>; // Render children inside a div with the scope ref
}
