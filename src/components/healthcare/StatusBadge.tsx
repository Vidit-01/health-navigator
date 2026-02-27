import { cn } from "@/lib/utils";
import { type SeverityLevel } from "./SeverityIndicator";

interface StatusBadgeProps {
  children: React.ReactNode;
  variant?: SeverityLevel | "default" | "outline";
  className?: string;
}

const variantStyles: Record<string, string> = {
  default: "bg-primary text-primary-foreground",
  outline: "border border-border text-foreground bg-transparent",
  low: "bg-severity-low-bg text-severity-low",
  medium: "bg-severity-medium-bg text-severity-medium",
  high: "bg-severity-high-bg text-severity-high",
};

export function StatusBadge({ children, variant = "default", className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
