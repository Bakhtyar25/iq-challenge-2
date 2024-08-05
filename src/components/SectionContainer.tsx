"use client";
import { ReactNode, useEffect } from "react";
import { useAnimate } from "framer-motion";

type Props = {
  children: ReactNode;
};

export default function SectionContainer({ children }: Props) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (children) {
      animate(
        scope.current,
        { opacity: [0, 1], y: [16, 0] },
        { ease: "easeInOut", duration: 0.3 }
      );
    }
  }, [children, animate, scope]);

  return <div ref={scope}>{children}</div>;
}
