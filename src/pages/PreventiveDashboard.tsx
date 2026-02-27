import { ShieldCheck, TrendingUp, Apple, Watch, Droplets, Dumbbell, Heart, ArrowUpRight } from "lucide-react";
import { MedicalCard } from "@/components/healthcare/MedicalCard";
import { StatusBadge } from "@/components/healthcare/StatusBadge";
import { SeverityIndicator, type SeverityLevel } from "@/components/healthcare/SeverityIndicator";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface RiskCard {
  label: string;
  score: number;
  level: SeverityLevel;
  trend: string;
}

const riskScores: RiskCard[] = [
  { label: "Cardiovascular", score: 32, level: "medium", trend: "↓ 5% from last month" },
  { label: "Diabetes", score: 58, level: "medium", trend: "↑ 2% from last month" },
  { label: "Respiratory", score: 12, level: "low", trend: "Stable" },
];

const nutritionSuggestions = [
  { title: "Reduce sodium intake", description: "Target < 2,300mg/day for BP management", icon: Droplets },
  { title: "Increase fiber", description: "30g daily for blood sugar control", icon: Apple },
  { title: "Stay active", description: "150 min moderate exercise weekly", icon: Dumbbell },
];

const weeklyProgress = [
  { day: "Mon", steps: 8200, goal: 10000 },
  { day: "Tue", steps: 6100, goal: 10000 },
  { day: "Wed", steps: 10400, goal: 10000 },
  { day: "Thu", steps: 7800, goal: 10000 },
  { day: "Fri", steps: 9200, goal: 10000 },
  { day: "Sat", steps: 11000, goal: 10000 },
  { day: "Sun", steps: 5400, goal: 10000 },
];

export default function PreventiveDashboard() {
  return (
    <div className="space-y-6 animate-slide-up">
      <header>
        <h1 className="text-xl font-bold text-foreground">Preventive Care</h1>
        <p className="text-sm text-muted-foreground">AI-powered health insights</p>
      </header>

      {/* Overall Health Score */}
      <MedicalCard className="text-center">
        <div className="inline-flex items-center justify-center h-24 w-24 rounded-full border-4 border-severity-low mx-auto mb-3">
          <div>
            <p className="text-2xl font-bold text-foreground">78</p>
            <p className="text-xs text-muted-foreground">Score</p>
          </div>
        </div>
        <h2 className="font-semibold text-foreground">Good Health</h2>
        <p className="text-sm text-muted-foreground">Your overall health score is above average</p>
      </MedicalCard>

      {/* Risk Scores */}
      <section aria-label="Risk scores">
        <h2 className="text-base font-semibold text-foreground mb-3">Risk Assessment</h2>
        <div className="space-y-3">
          {riskScores.map((risk) => (
            <MedicalCard key={risk.label}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <SeverityIndicator level={risk.level} size="sm" label="" />
                  <span className="font-medium text-sm text-foreground">{risk.label}</span>
                </div>
                <span className="text-lg font-bold text-foreground">{risk.score}%</span>
              </div>
              <Progress value={risk.score} className="h-2 mb-1" />
              <p className="text-xs text-muted-foreground">{risk.trend}</p>
            </MedicalCard>
          ))}
        </div>
      </section>

      {/* Wearable Sync */}
      <MedicalCard>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
            <Watch className="h-5 w-5 text-secondary" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm text-foreground">Wearable Connected</p>
            <p className="text-xs text-muted-foreground">Last synced 5 min ago</p>
          </div>
          <StatusBadge variant="low">Active</StatusBadge>
        </div>
      </MedicalCard>

      {/* Weekly Activity */}
      <section aria-label="Weekly activity">
        <h2 className="text-base font-semibold text-foreground mb-3">Weekly Activity</h2>
        <MedicalCard>
          <div className="flex items-end gap-2 h-28">
            {weeklyProgress.map((d) => {
              const pct = Math.min((d.steps / d.goal) * 100, 100);
              const hit = d.steps >= d.goal;
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-muted rounded-full overflow-hidden" style={{ height: "80px" }}>
                    <div
                      className={`w-full rounded-full transition-all ${hit ? "bg-severity-low" : "bg-primary/60"}`}
                      style={{ height: `${pct}%`, marginTop: `${100 - pct}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{d.day}</span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
            <span>Goal: 10,000 steps/day</span>
            <span className="font-medium text-foreground">{Math.round(weeklyProgress.reduce((a, d) => a + d.steps, 0) / 7).toLocaleString()} avg</span>
          </div>
        </MedicalCard>
      </section>

      {/* Nutrition Suggestions */}
      <section aria-label="Nutrition suggestions">
        <h2 className="text-base font-semibold text-foreground mb-3">Recommendations</h2>
        <div className="space-y-3">
          {nutritionSuggestions.map((s) => (
            <MedicalCard key={s.title} hover>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-foreground">{s.title}</p>
                  <p className="text-xs text-muted-foreground">{s.description}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </div>
            </MedicalCard>
          ))}
        </div>
      </section>
    </div>
  );
}
