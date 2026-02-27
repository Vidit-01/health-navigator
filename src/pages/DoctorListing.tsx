import { useState } from "react";
import { Search, Star, MapPin, Clock, Filter, Calendar, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MedicalCard } from "@/components/healthcare/MedicalCard";
import { StatusBadge } from "@/components/healthcare/StatusBadge";
import { EmptyState } from "@/components/healthcare/EmptyState";

const specialties = ["All", "Cardiology", "Neurology", "Orthopedics", "General", "Dermatology"];

const doctors = [
  { id: 1, name: "Dr. Eliza Raymond", specialty: "Cardiologist", rating: 4.8, reviews: 402, experience: "12 yrs", distance: "2.3 km", fee: "$50", available: true, nextSlot: "10:30 AM", verified: true },
  { id: 2, name: "Dr. Marcus Hale", specialty: "Neurologist", rating: 5.0, reviews: 189, experience: "8 yrs", distance: "4.1 km", fee: "$65", available: true, nextSlot: "11:00 AM", verified: true },
  { id: 3, name: "Dr. Betty Mitchell", specialty: "General Physician", rating: 4.5, reviews: 2530, experience: "15 yrs", distance: "1.2 km", fee: "$35", available: false, nextSlot: "Tomorrow", verified: true },
  { id: 4, name: "Dr. Jennifer Smith", specialty: "Dermatologist", rating: 4.9, reviews: 305, experience: "10 yrs", distance: "3.5 km", fee: "$55", available: true, nextSlot: "2:00 PM", verified: true },
];

const timeSlots = ["8:00 AM", "8:45 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM", "3:00 PM"];

export default function DoctorListing() {
  const [search, setSearch] = useState("");
  const [activeSpecialty, setActiveSpecialty] = useState("All");
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

  const filtered = doctors.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase());
    const matchSpecialty = activeSpecialty === "All" || d.specialty.toLowerCase().includes(activeSpecialty.toLowerCase());
    return matchSearch && matchSpecialty;
  });

  const doc = doctors.find((d) => d.id === selectedDoctor);

  if (booked && doc) {
    return (
      <div className="space-y-6 animate-slide-up text-center py-12">
        <div className="rounded-full bg-severity-low-bg p-6 inline-flex mx-auto">
          <Calendar className="h-10 w-10 text-severity-low" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Appointment Confirmed!</h2>
        <p className="text-muted-foreground">{doc.name} · {selectedSlot}</p>
        <Button className="touch-target" onClick={() => { setBooked(false); setSelectedDoctor(null); setSelectedSlot(null); }}>
          Back to Doctors
        </Button>
      </div>
    );
  }

  if (selectedDoctor && doc) {
    return (
      <div className="space-y-6 animate-slide-up">
        <Button variant="ghost" size="sm" onClick={() => setSelectedDoctor(null)}>← Back</Button>
        <MedicalCard>
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center flex-shrink-0 text-xl font-bold text-muted-foreground">
              {doc.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-foreground">{doc.name}</h2>
                {doc.verified && <StatusBadge variant="low">✓ Verified</StatusBadge>}
              </div>
              <p className="text-sm text-muted-foreground">{doc.specialty}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Star className="h-3 w-3 text-severity-medium fill-severity-medium" /> {doc.rating}</span>
                <span>{doc.experience}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {doc.distance}</span>
              </div>
            </div>
          </div>
        </MedicalCard>

        <section>
          <h3 className="font-semibold text-foreground mb-3">Available Slots</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {timeSlots.map((slot) => {
              const disabled = Math.random() > 0.7;
              return (
                <button
                  key={slot}
                  disabled={disabled}
                  onClick={() => setSelectedSlot(slot)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors touch-target ${
                    selectedSlot === slot
                      ? "bg-primary text-primary-foreground"
                      : disabled
                      ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
                      : "bg-muted text-foreground hover:bg-accent"
                  }`}
                  aria-label={`Book ${slot}${disabled ? " (unavailable)" : ""}`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </section>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Consultation Fee</p>
            <p className="text-xl font-bold text-foreground">{doc.fee}</p>
          </div>
          <Button disabled={!selectedSlot} className="touch-target" onClick={() => setBooked(true)}>
            Book Now <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-slide-up">
      <header>
        <h1 className="text-xl font-bold text-foreground">Find a Doctor</h1>
        <p className="text-sm text-muted-foreground">Book your appointment</p>
      </header>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search doctors, specialties..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 touch-target" />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {specialties.map((s) => (
          <button
            key={s}
            onClick={() => setActiveSpecialty(s)}
            className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors touch-target ${
              activeSpecialty === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No doctors found" description="Try a different search or specialty" icon={<Filter className="h-8 w-8 text-muted-foreground" />} />
      ) : (
        <div className="space-y-3">
          {filtered.map((d) => (
            <MedicalCard key={d.id} hover onClick={() => setSelectedDoctor(d.id)}>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0 text-sm font-bold text-muted-foreground">
                  {d.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm text-foreground truncate">{d.name}</p>
                    {d.verified && <span className="text-primary text-xs">✓</span>}
                  </div>
                  <p className="text-xs text-muted-foreground">{d.specialty} · {d.experience}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-0.5 text-xs"><Star className="h-3 w-3 text-severity-medium fill-severity-medium" /> {d.rating}</span>
                    <span className="text-xs text-muted-foreground">({d.reviews})</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-sm text-foreground">{d.fee}</p>
                  <div className="flex items-center gap-1 text-xs mt-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className={d.available ? "text-severity-low" : "text-muted-foreground"}>{d.nextSlot}</span>
                  </div>
                </div>
              </div>
            </MedicalCard>
          ))}
        </div>
      )}
    </div>
  );
}
