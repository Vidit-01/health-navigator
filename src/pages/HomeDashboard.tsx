import { useState } from "react";
import {
  Calendar,
  Stethoscope,
  FlaskConical,
  Pill,
  AlertCircle,
  ChevronRight,
  Activity,
  Heart,
  Moon,
  Clock,
} from "lucide-react";
import { MedicalCard } from "@/components/healthcare/MedicalCard";
import { SeverityIndicator } from "@/components/healthcare/SeverityIndicator";
import { StatusBadge } from "@/components/healthcare/StatusBadge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const quickServices = [
  { label: "Consult", icon: Stethoscope, color: "bg-primary/10 text-primary", to: "/doctors" },
  { label: "Lab Tests", icon: FlaskConical, color: "bg-secondary/10 text-secondary", to: "/services" },
  { label: "Pharmacy", icon: Pill, color: "bg-severity-medium-bg text-severity-medium", to: "/medications" },
  { label: "Emergency", icon: AlertCircle, color: "bg-severity-high-bg text-severity-high", to: "/hospitals" },
];

const appointments = [
  { doctor: "Dr. Eliza Raymond", specialty: "Cardiologist", time: "10:30 AM", date: "Today", severity: "medium" as const },
  { doctor: "Dr. Marcus Hale", specialty: "General Physician", time: "2:00 PM", date: "Tomorrow", severity: "low" as const },
];

const vitals = [
  { label: "Heart Rate", value: "86 bpm", icon: Heart, status: "normal" },
  { label: "Sleep", value: "8h 40m", icon: Moon, status: "good" },
  { label: "Activity", value: "6,240 steps", icon: Activity, status: "normal" },
];

export default function HomeDashboard() {
  const navigate = useNavigate();
  const [urgency] = useState<"low" | "medium" | "high">("low");

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <header>
        <p className="text-sm text-muted-foreground">Good morning</p>
        <h1 className="text-2xl font-bold text-foreground">Hi, John 👋</h1>
      </header>

      {/* Urgency Banner */}
      <div
        className={`rounded-lg p-3 flex items-center gap-3 ${
          urgency === "low" ? "bg-severity-low-bg" : urgency === "medium" ? "bg-severity-medium-bg" : "bg-severity-high-bg"
        }`}
        role="status"
        aria-label={`Health status: ${urgency} risk`}
      >
        <SeverityIndicator level={urgency} size="lg" pulse={urgency === "high"} />
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">
            {urgency === "low" ? "All looking good!" : urgency === "medium" ? "Follow-up recommended" : "Urgent attention needed"}
          </p>
        </div>
      </div>

      {/* Quick Services */}
      <section aria-label="Quick services">
        <div className="grid grid-cols-4 gap-3">
          {quickServices.map((s) => (
            <button
              key={s.label}
              onClick={() => navigate(s.to)}
              className="flex flex-col items-center gap-2 touch-target"
            >
              <div className={`rounded-xl p-3 ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-foreground">{s.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Symptom Check CTA */}
      <MedicalCard hover onClick={() => navigate("/symptoms")} className="bg-primary text-primary-foreground border-primary">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">How are you feeling?</h3>
            <p className="text-sm opacity-90">Check symptoms & get guidance</p>
          </div>
          <ChevronRight className="h-5 w-5" />
        </div>
      </MedicalCard>

      {/* Upcoming Appointments */}
      <section aria-label="Upcoming appointments">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">Upcoming Appointments</h2>
          <Button variant="ghost" size="sm" className="text-primary text-xs" onClick={() => navigate("/doctors")}>
            See all
          </Button>
        </div>
        <div className="space-y-3">
          {appointments.map((apt, i) => (
            <MedicalCard key={i} hover>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <Stethoscope className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground truncate">{apt.doctor}</p>
                  <p className="text-xs text-muted-foreground">{apt.specialty}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <StatusBadge variant={apt.severity}>{apt.date}</StatusBadge>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 justify-end">
                    <Clock className="h-3 w-3" /> {apt.time}
                  </p>
                </div>
              </div>
            </MedicalCard>
          ))}
        </div>
      </section>

      {/* Vitals */}
      <section aria-label="Vitals overview">
        <h2 className="text-lg font-semibold text-foreground mb-3">Vitals Overview</h2>
        <div className="grid grid-cols-3 gap-3">
          {vitals.map((v) => (
            <MedicalCard key={v.label} className="text-center">
              <v.icon className="h-5 w-5 mx-auto text-primary mb-1" />
              <p className="text-lg font-bold text-foreground">{v.value}</p>
              <p className="text-xs text-muted-foreground">{v.label}</p>
            </MedicalCard>
          ))}
        </div>
      </section>

      {/* Medication Reminders */}
      <section aria-label="Medication reminders">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">Medication Reminders</h2>
          <Button variant="ghost" size="sm" className="text-primary text-xs" onClick={() => navigate("/medications")}>
            View all
          </Button>
        </div>
        <MedicalCard>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-severity-medium-bg flex items-center justify-center">
              <Pill className="h-5 w-5 text-severity-medium" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm text-foreground">Metformin 500mg</p>
              <p className="text-xs text-muted-foreground">After lunch · 2 pills</p>
            </div>
            <StatusBadge variant="medium">Due</StatusBadge>
          </div>
        </MedicalCard>
      </section>
    </div>
  );
}
