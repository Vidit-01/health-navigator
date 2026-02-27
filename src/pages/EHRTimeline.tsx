import { useState } from "react";
import { FileText, FlaskConical, Image, Stethoscope, Activity, Calendar, Filter, Share2, Download } from "lucide-react";
import { MedicalCard } from "@/components/healthcare/MedicalCard";
import { StatusBadge } from "@/components/healthcare/StatusBadge";
import { EmptyState } from "@/components/healthcare/EmptyState";
import { Button } from "@/components/ui/button";
import { type SeverityLevel } from "@/components/healthcare/SeverityIndicator";

type RecordType = "all" | "prescription" | "lab" | "imaging" | "consult" | "vitals";

const tabs: { key: RecordType; label: string; icon: React.ElementType }[] = [
  { key: "all", label: "All", icon: FileText },
  { key: "prescription", label: "Rx", icon: FileText },
  { key: "lab", label: "Lab", icon: FlaskConical },
  { key: "imaging", label: "Imaging", icon: Image },
  { key: "consult", label: "Notes", icon: Stethoscope },
  { key: "vitals", label: "Vitals", icon: Activity },
];

interface HealthRecord {
  id: number;
  type: RecordType;
  title: string;
  date: string;
  doctor: string;
  severity?: SeverityLevel;
  detail: string;
}

const records: HealthRecord[] = [
  { id: 1, type: "prescription", title: "Metformin 500mg", date: "Feb 25, 2026", doctor: "Dr. Raymond", detail: "2x daily after meals" },
  { id: 2, type: "lab", title: "Complete Blood Count", date: "Feb 20, 2026", doctor: "PathLab", severity: "low", detail: "All values within range" },
  { id: 3, type: "lab", title: "HbA1c Test", date: "Feb 15, 2026", doctor: "PathLab", severity: "medium", detail: "6.8% — slightly elevated" },
  { id: 4, type: "imaging", title: "Chest X-Ray", date: "Feb 10, 2026", doctor: "RadiCare", detail: "No abnormalities detected" },
  { id: 5, type: "consult", title: "Follow-up: Diabetes", date: "Feb 5, 2026", doctor: "Dr. Marcus Hale", detail: "Continue current medication. Recheck in 3 months." },
  { id: 6, type: "vitals", title: "BP Reading", date: "Feb 27, 2026", doctor: "Self-recorded", severity: "high", detail: "152/98 mmHg — elevated" },
  { id: 7, type: "prescription", title: "Ibuprofen 400mg", date: "Jan 28, 2026", doctor: "Dr. Eliza Raymond", detail: "As needed for pain" },
];

const iconMap: { [key: string]: React.ElementType } = {
  prescription: FileText,
  lab: FlaskConical,
  imaging: Image,
  consult: Stethoscope,
  vitals: Activity,
};

export default function EHRTimeline() {
  const [activeTab, setActiveTab] = useState<RecordType>("all");
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null);

  const filtered = activeTab === "all" ? records : records.filter((r) => r.type === activeTab);

  if (selectedRecord) {
    const Icon = iconMap[selectedRecord.type] || FileText;
    return (
      <div className="space-y-4 animate-slide-up">
        <Button variant="ghost" size="sm" onClick={() => setSelectedRecord(null)}>← Back</Button>
        <MedicalCard>
          <div className="flex items-start gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">{selectedRecord.title}</h2>
              <p className="text-xs text-muted-foreground">{selectedRecord.date} · {selectedRecord.doctor}</p>
            </div>
          </div>
          {selectedRecord.severity && (
            <div className="mb-3">
              <StatusBadge variant={selectedRecord.severity}>{selectedRecord.severity.toUpperCase()}</StatusBadge>
            </div>
          )}
          <p className="text-sm text-foreground">{selectedRecord.detail}</p>
        </MedicalCard>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 touch-target"><Download className="h-4 w-4 mr-1" /> Download</Button>
          <Button variant="outline" className="flex-1 touch-target"><Share2 className="h-4 w-4 mr-1" /> Share</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-slide-up">
      <header>
        <h1 className="text-xl font-bold text-foreground">Health Records</h1>
        <p className="text-sm text-muted-foreground">Your medical timeline</p>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors touch-target ${
              activeTab === t.key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            <t.icon className="h-3.5 w-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No records found" description="Records will appear here as you use services" icon={<Filter className="h-8 w-8 text-muted-foreground" />} />
      ) : (
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-4">
            {filtered.map((r) => {
              const Icon = iconMap[r.type] || FileText;
              return (
                <div key={r.id} className="relative pl-10" onClick={() => setSelectedRecord(r)}>
                  <div className="absolute left-3 top-4 h-4 w-4 rounded-full bg-card border-2 border-primary z-10" />
                  <MedicalCard hover>
                    <div className="flex items-start gap-3">
                      <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-foreground truncate">{r.title}</p>
                        <p className="text-xs text-muted-foreground">{r.doctor}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{r.detail}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {r.date}
                        </span>
                        {r.severity && <StatusBadge variant={r.severity}>{r.severity}</StatusBadge>}
                      </div>
                    </div>
                  </MedicalCard>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
