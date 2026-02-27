import { useState } from "react";
import { Building2, Bed, Wind, Activity, Clock, MapPin, Search, AlertCircle } from "lucide-react";
import { MedicalCard } from "@/components/healthcare/MedicalCard";
import { StatusBadge } from "@/components/healthcare/StatusBadge";
import { SeverityIndicator, type SeverityLevel } from "@/components/healthcare/SeverityIndicator";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/healthcare/EmptyState";

interface Hospital {
  id: number;
  name: string;
  distance: string;
  icuBeds: { total: number; available: number };
  generalBeds: { total: number; available: number };
  equipment: string[];
  waitTime: string;
  severity: SeverityLevel;
}

const hospitals: Hospital[] = [
  {
    id: 1, name: "City General Hospital", distance: "2.3 km",
    icuBeds: { total: 40, available: 5 }, generalBeds: { total: 200, available: 45 },
    equipment: ["Ventilator", "MRI", "Dialysis"], waitTime: "15 min", severity: "medium",
  },
  {
    id: 2, name: "St. Mary's Medical Center", distance: "4.1 km",
    icuBeds: { total: 25, available: 12 }, generalBeds: { total: 150, available: 80 },
    equipment: ["Ventilator", "CT Scan", "X-Ray"], waitTime: "5 min", severity: "low",
  },
  {
    id: 3, name: "Metro Emergency Hospital", distance: "6.8 km",
    icuBeds: { total: 30, available: 1 }, generalBeds: { total: 100, available: 8 },
    equipment: ["Ventilator", "MRI", "CT Scan", "Dialysis"], waitTime: "45 min", severity: "high",
  },
  {
    id: 4, name: "Regional Health Center", distance: "8.2 km",
    icuBeds: { total: 15, available: 7 }, generalBeds: { total: 80, available: 35 },
    equipment: ["X-Ray", "Ultrasound"], waitTime: "10 min", severity: "low",
  },
];

function BedBar({ label, available, total }: { label: string; available: number; total: number }) {
  const pct = (available / total) * 100;
  const color = pct < 15 ? "bg-severity-high" : pct < 40 ? "bg-severity-medium" : "bg-severity-low";
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-foreground">{available}/{total}</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function HospitalAvailability() {
  const [search, setSearch] = useState("");
  const filtered = hospitals.filter((h) => h.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4 animate-slide-up">
      <header>
        <h1 className="text-xl font-bold text-foreground">Hospital Availability</h1>
        <p className="text-sm text-muted-foreground">Real-time bed & equipment status</p>
      </header>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search hospitals..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 touch-target" />
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <MedicalCard className="text-center">
          <Bed className="h-5 w-5 mx-auto text-primary mb-1" />
          <p className="text-lg font-bold text-foreground">{hospitals.reduce((a, h) => a + h.generalBeds.available, 0)}</p>
          <p className="text-xs text-muted-foreground">General</p>
        </MedicalCard>
        <MedicalCard className="text-center">
          <Activity className="h-5 w-5 mx-auto text-severity-high mb-1" />
          <p className="text-lg font-bold text-foreground">{hospitals.reduce((a, h) => a + h.icuBeds.available, 0)}</p>
          <p className="text-xs text-muted-foreground">ICU</p>
        </MedicalCard>
        <MedicalCard className="text-center">
          <Wind className="h-5 w-5 mx-auto text-secondary mb-1" />
          <p className="text-lg font-bold text-foreground">{hospitals.filter(h => h.equipment.includes("Ventilator")).length}</p>
          <p className="text-xs text-muted-foreground">Ventilators</p>
        </MedicalCard>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No hospitals found" description="Try a different search term" />
      ) : (
        <div className="space-y-3">
          {filtered.map((h) => (
            <MedicalCard key={h.id}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{h.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                      <span className="flex items-center gap-0.5"><MapPin className="h-3 w-3" /> {h.distance}</span>
                      <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" /> {h.waitTime} wait</span>
                    </div>
                  </div>
                </div>
                <SeverityIndicator level={h.severity} size="sm" pulse={h.severity === "high"} label="" />
              </div>

              <div className="space-y-2 mb-3">
                <BedBar label="ICU Beds" available={h.icuBeds.available} total={h.icuBeds.total} />
                <BedBar label="General Beds" available={h.generalBeds.available} total={h.generalBeds.total} />
              </div>

              <div className="flex flex-wrap gap-1.5">
                {h.equipment.map((eq) => (
                  <StatusBadge key={eq} variant="outline">{eq}</StatusBadge>
                ))}
              </div>
            </MedicalCard>
          ))}
        </div>
      )}
    </div>
  );
}
