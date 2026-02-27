import { useState } from "react";
import { Search, ChevronRight, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MedicalCard } from "@/components/healthcare/MedicalCard";
import { SeverityIndicator, type SeverityLevel } from "@/components/healthcare/SeverityIndicator";
import { StatusBadge } from "@/components/healthcare/StatusBadge";
import { ProgressSteps } from "@/components/healthcare/ProgressSteps";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";

const commonSymptoms = [
  "Headache", "Fever", "Cough", "Chest Pain", "Fatigue",
  "Nausea", "Shortness of Breath", "Dizziness", "Back Pain", "Sore Throat",
];

const steps = ["Symptoms", "Severity", "History", "Result"];

export default function SymptomIntake() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [severity, setSeverity] = useState([5]);
  const [result, setResult] = useState<SeverityLevel | null>(null);

  const filtered = commonSymptoms.filter((s) =>
    s.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSymptom = (s: string) => {
    setSelected((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  };

  const computeResult = (): SeverityLevel => {
    const sevVal = severity[0];
    const hasChestPain = selected.includes("Chest Pain");
    const hasBreathing = selected.includes("Shortness of Breath");
    if (sevVal > 7 || hasChestPain || hasBreathing) return "high";
    if (sevVal > 4 || selected.length > 3) return "medium";
    return "low";
  };

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else if (step === 2) {
      setResult(computeResult());
      setStep(3);
    }
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <header>
        <h1 className="text-xl font-bold text-foreground">Symptom Assessment</h1>
        <p className="text-sm text-muted-foreground">Tell us how you're feeling</p>
      </header>

      <ProgressSteps steps={steps} current={step} />

      {/* Step 0: Symptom Selection */}
      {step === 0 && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search symptoms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 touch-target"
              aria-label="Search symptoms"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {filtered.map((s) => (
              <button
                key={s}
                onClick={() => toggleSymptom(s)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors touch-target ${
                  selected.includes(s)
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
                aria-pressed={selected.includes(s)}
              >
                {s}
              </button>
            ))}
          </div>
          {selected.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">Selected ({selected.length}):</p>
              <div className="flex flex-wrap gap-1">
                {selected.map((s) => (
                  <StatusBadge key={s} variant="default">{s}</StatusBadge>
                ))}
              </div>
            </div>
          )}
          <Button onClick={handleNext} disabled={selected.length === 0} className="w-full touch-target">
            Continue <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}

      {/* Step 1: Severity */}
      {step === 1 && (
        <div className="space-y-6">
          <MedicalCard>
            <h3 className="font-semibold text-foreground mb-4">How severe are your symptoms?</h3>
            <div className="space-y-4">
              <Slider value={severity} onValueChange={setSeverity} min={1} max={10} step={1} />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Mild</span>
                <span className="font-bold text-foreground">{severity[0]}/10</span>
                <span>Severe</span>
              </div>
            </div>
          </MedicalCard>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(0)} className="flex-1 touch-target">Back</Button>
            <Button onClick={handleNext} className="flex-1 touch-target">Continue</Button>
          </div>
        </div>
      )}

      {/* Step 2: Medical History */}
      {step === 2 && (
        <div className="space-y-4">
          <MedicalCard>
            <h3 className="font-semibold text-foreground mb-3">Medical History</h3>
            <p className="text-sm text-muted-foreground mb-4">Auto-loaded from your records. Review and confirm.</p>
            <div className="space-y-3">
              {[
                { label: "Allergies", value: "Penicillin" },
                { label: "Chronic Conditions", value: "Type 2 Diabetes" },
                { label: "Current Medications", value: "Metformin 500mg" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </MedicalCard>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(1)} className="flex-1 touch-target">Back</Button>
            <Button onClick={handleNext} className="flex-1 touch-target">Analyze</Button>
          </div>
        </div>
      )}

      {/* Step 3: Result */}
      {step === 3 && result && (
        <div className="space-y-4">
          <MedicalCard className={
            result === "high" ? "border-severity-high bg-severity-high-bg" :
            result === "medium" ? "border-severity-medium bg-severity-medium-bg" : "border-severity-low bg-severity-low-bg"
          }>
            <div className="text-center space-y-3 py-4">
              {result === "high" ? (
                <AlertTriangle className="h-12 w-12 mx-auto text-severity-high" />
              ) : result === "medium" ? (
                <Clock className="h-12 w-12 mx-auto text-severity-medium" />
              ) : (
                <CheckCircle className="h-12 w-12 mx-auto text-severity-low" />
              )}
              <SeverityIndicator level={result} size="lg" pulse={result === "high"} />
              <p className="text-sm text-foreground">
                {result === "high"
                  ? "Your symptoms suggest urgent medical attention. Please seek immediate care."
                  : result === "medium"
                  ? "We recommend scheduling a consultation soon."
                  : "Your symptoms appear manageable. Monitor and consult if they persist."}
              </p>
            </div>
          </MedicalCard>

          <div className="space-y-3">
            {result === "high" && (
              <Button className="w-full bg-severity-high hover:bg-severity-high/90 text-severity-high-foreground touch-target" onClick={() => navigate("/hospitals")}>
                Find Emergency Care
              </Button>
            )}
            <Button className="w-full touch-target" onClick={() => navigate("/doctors")}>
              {result === "high" ? "Book Urgent Appointment" : "Book Appointment"}
            </Button>
            <Button variant="outline" className="w-full touch-target" onClick={() => { setStep(0); setSelected([]); setResult(null); }}>
              Start Over
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
