import * as React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "sm" | "icon";
};

const base = "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm border transition";
const variants = {
  default: "bg-primary text-white border-primary hover:opacity-90",
  secondary: "bg-muted text-foreground border-border",
  outline: "bg-transparent border-border",
  ghost: "bg-transparent border-transparent",
};
const sizes = { sm: "px-3 py-1.5 text-sm", icon: "p-2 aspect-square", _: "" };

export function Button({ className = "", variant = "default", size, ...props }: Props) {
  return <button className={`${base} ${variants[variant]} ${size ? sizes[size] : ""} ${className}`} {...props} />;
}
