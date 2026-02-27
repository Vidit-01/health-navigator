import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ProgressStepsProps {
  steps: string[];
  current: number;
}

export function ProgressSteps({ steps, current }: ProgressStepsProps) {
  return (
    <nav aria-label="Progress" className="w-full">
      <ol className="flex items-center gap-2">
        {steps.map((step, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li key={step} className="flex-1">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors",
                    done && "bg-primary text-primary-foreground",
                    active && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                    !done && !active && "bg-muted text-muted-foreground"
                  )}
                  aria-current={active ? "step" : undefined}
                >
                  {done ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span className={cn("text-xs text-center hidden sm:block", active ? "text-foreground font-medium" : "text-muted-foreground")}>
                  {step}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
