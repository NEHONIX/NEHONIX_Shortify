import * as React from "react";
import "./Style/Input.css";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return <input type={type} className="Input" ref={ref} {...props} />;
  }
);
Input.displayName = "Input";

export { Input };
