import { cn } from "@/lib/utils";

export type SeverityLevel = "low" | "medium" | "high";

interface SeverityIndicatorProps {
  level: SeverityLevel;
  label?: string;
  pulse?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "h-2 w-2",
  md: "h-3 w-3",
  lg: "h-4 w-4",
};

const colorMap = {
  low: "bg-severity-low",
  medium: "bg-severity-medium",
  high: "bg-severity-high",
};

const textColorMap = {
  low: "text-severity-low",
  medium: "text-severity-medium",
  high: "text-severity-high",
};

const labelMap = {
  low: "Low Risk",
  medium: "Medium Risk",
  high: "High Risk",
};

export function SeverityIndicator({
  level,
  label,
  pulse = false,
  size = "md",
  className,
}: SeverityIndicatorProps) {
  return (
    <div className={cn("flex items-center gap-2", className)} role="status" aria-label={`Severity: ${label || labelMap[level]}`}>
      <span
        className={cn(
          "rounded-full inline-block",
          sizeMap[size],
          colorMap[level],
          pulse && level === "high" && "animate-pulse-severity"
        )}
      />
      {(label !== undefined ? label : labelMap[level]) && (
        <span className={cn("text-sm font-medium", textColorMap[level])}>
          {label ?? labelMap[level]}
        </span>
      )}
    </div>
  );
}
