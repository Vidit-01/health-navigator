import { useNavigate } from "react-router-dom";
import { Stethoscope, FlaskConical, Syringe, Pill, Building2, ShieldCheck, Heart, Truck } from "lucide-react";
import { MedicalCard } from "@/components/healthcare/MedicalCard";

const services = [
  { icon: Stethoscope, label: "Online Consultation", desc: "Video, audio & chat", to: "/consult" },
  { icon: FlaskConical, label: "Lab Tests", desc: "Home sample pickup", to: "/services" },
  { icon: Syringe, label: "Home Nursing", desc: "Skilled care at home", to: "/services" },
  { icon: Pill, label: "Pharmacy", desc: "E-prescriptions & refills", to: "/medications" },
  { icon: Building2, label: "Hospital Finder", desc: "Real-time availability", to: "/hospitals" },
  { icon: ShieldCheck, label: "Preventive Care", desc: "AI health insights", to: "/preventive" },
  { icon: Heart, label: "Health Records", desc: "Your medical timeline", to: "/records" },
  { icon: Truck, label: "Home Treatment", desc: "Chronic care programs", to: "/services" },
];

export default function ServicesScreen() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 animate-slide-up">
      <header>
        <h1 className="text-xl font-bold text-foreground">Services</h1>
        <p className="text-sm text-muted-foreground">All healthcare services</p>
      </header>

      <div className="grid grid-cols-2 gap-3">
        {services.map((s) => (
          <MedicalCard key={s.label} hover onClick={() => navigate(s.to)}>
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <s.icon className="h-5 w-5 text-primary" />
            </div>
            <p className="font-semibold text-sm text-foreground">{s.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
          </MedicalCard>
        ))}
      </div>
    </div>
  );
}
