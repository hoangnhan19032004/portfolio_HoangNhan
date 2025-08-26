import * as React from "react";

type Props = React.HTMLAttributes<HTMLSpanElement> & { variant?: "secondary" | "outline" };

export function Badge({ className = "", variant = "secondary", ...props }: Props) {
  const styles =
    variant === "outline"
      ? "border px-2 py-0.5 rounded-full text-xs"
      : "bg-muted px-2 py-0.5 rounded-full text-xs";
  return <span className={`${styles} ${className}`} {...props} />;
}
