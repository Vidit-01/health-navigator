import { useState } from "react";
import { Pill, Clock, Check, AlertTriangle, Bell, ChevronRight } from "lucide-react";
import { MedicalCard } from "@/components/healthcare/MedicalCard";
import { StatusBadge } from "@/components/healthcare/StatusBadge";
import { SeverityIndicator } from "@/components/healthcare/SeverityIndicator";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Medication {
  id: number;
  name: string;
  dosage: string;
  timing: string;
  taken: boolean;
  refillDays: number;
  interaction?: string;
}

const initialMeds: Medication[] = [
  { id: 1, name: "Metformin", dosage: "500mg", timing: "After Lunch", taken: false, refillDays: 5 },
  { id: 2, name: "Lisinopril", dosage: "10mg", timing: "Morning", taken: true, refillDays: 12 },
  { id: 3, name: "Atorvastatin", dosage: "20mg", timing: "Before Bed", taken: false, refillDays: 20 },
  { id: 4, name: "Ibuprofen", dosage: "400mg", timing: "As needed", taken: false, refillDays: 30, interaction: "May interact with Lisinopril" },
];

const schedule = [
  { time: "8:00 AM", label: "Morning", meds: ["Lisinopril 10mg"] },
  { time: "1:00 PM", label: "After Lunch", meds: ["Metformin 500mg"] },
  { time: "10:00 PM", label: "Before Bed", meds: ["Atorvastatin 20mg"] },
];

export default function MedicationTracker() {
  const [meds, setMeds] = useState(initialMeds);
  const adherence = Math.round((meds.filter((m) => m.taken).length / meds.length) * 100);

  const toggleTaken = (id: number) => {
    setMeds((prev) => prev.map((m) => m.id === id ? { ...m, taken: !m.taken } : m));
  };

  const needsRefill = meds.filter((m) => m.refillDays <= 7);

  return (
    <div className="space-y-6 animate-slide-up">
      <header>
        <h1 className="text-xl font-bold text-foreground">Medications</h1>
        <p className="text-sm text-muted-foreground">Track your daily medications</p>
      </header>

      {/* Adherence */}
      <MedicalCard>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Today's Adherence</span>
          <span className="text-lg font-bold text-foreground">{adherence}%</span>
        </div>
        <Progress value={adherence} className="h-2" />
        <p className="text-xs text-muted-foreground mt-1">{meds.filter(m => m.taken).length} of {meds.length} taken</p>
      </MedicalCard>

      {/* Refill Alert */}
      {needsRefill.length > 0 && (
        <div className="rounded-lg bg-severity-medium-bg p-3 flex items-center gap-3" role="alert">
          <Bell className="h-5 w-5 text-severity-medium flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Refill Needed</p>
            <p className="text-xs text-muted-foreground">{needsRefill.map(m => m.name).join(", ")} — {needsRefill[0].refillDays} days left</p>
          </div>
          <Button size="sm" variant="outline" className="touch-target flex-shrink-0">Order</Button>
        </div>
      )}

      {/* Daily Schedule */}
      <section aria-label="Daily schedule">
        <h2 className="text-base font-semibold text-foreground mb-3">Daily Schedule</h2>
        <div className="space-y-3">
          {schedule.map((slot) => (
            <MedicalCard key={slot.time}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-foreground">{slot.label}</p>
                  <p className="text-xs text-muted-foreground">{slot.time}</p>
                </div>
                <div className="text-right">
                  {slot.meds.map((m) => (
                    <p key={m} className="text-xs text-foreground">{m}</p>
                  ))}
                </div>
              </div>
            </MedicalCard>
          ))}
        </div>
      </section>

      {/* All Medications */}
      <section aria-label="All medications">
        <h2 className="text-base font-semibold text-foreground mb-3">All Medications</h2>
        <div className="space-y-3">
          {meds.map((m) => (
            <MedicalCard key={m.id}>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleTaken(m.id)}
                  className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors touch-target ${
                    m.taken ? "bg-severity-low text-severity-low-foreground" : "border-2 border-border bg-transparent"
                  }`}
                  aria-label={m.taken ? `Mark ${m.name} as not taken` : `Mark ${m.name} as taken`}
                >
                  {m.taken && <Check className="h-4 w-4" />}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-sm ${m.taken ? "line-through text-muted-foreground" : "text-foreground"}`}>{m.name} {m.dosage}</p>
                  <p className="text-xs text-muted-foreground">{m.timing}</p>
                  {m.interaction && (
                    <div className="flex items-center gap-1 mt-1">
                      <AlertTriangle className="h-3 w-3 text-severity-medium" />
                      <span className="text-xs text-severity-medium">{m.interaction}</span>
                    </div>
                  )}
                </div>
                <div className="flex-shrink-0">
                  {m.refillDays <= 7 ? (
                    <StatusBadge variant="medium">{m.refillDays}d refill</StatusBadge>
                  ) : (
                    <StatusBadge variant="low">In stock</StatusBadge>
                  )}
                </div>
              </div>
            </MedicalCard>
          ))}
        </div>
      </section>
    </div>
  );
}
