import { User, Settings, Bell, Shield, ChevronRight, LogOut, Heart } from "lucide-react";
import { MedicalCard } from "@/components/healthcare/MedicalCard";
import { StatusBadge } from "@/components/healthcare/StatusBadge";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: Heart, label: "Health Profile", desc: "Allergies, conditions, blood type" },
  { icon: Bell, label: "Notifications", desc: "Manage alerts and reminders" },
  { icon: Shield, label: "Privacy & Consent", desc: "Data sharing preferences" },
  { icon: Settings, label: "Settings", desc: "Language, accessibility, account" },
];

export default function ProfileScreen() {
  return (
    <div className="space-y-6 animate-slide-up">
      {/* Profile Header */}
      <MedicalCard className="text-center">
        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
          <User className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-lg font-bold text-foreground">John Peterson</h1>
        <p className="text-sm text-muted-foreground">Patient ID: #125045</p>
        <div className="flex justify-center gap-2 mt-2">
          <StatusBadge variant="low">Verified</StatusBadge>
          <StatusBadge variant="default">Premium</StatusBadge>
        </div>
      </MedicalCard>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <MedicalCard className="text-center">
          <p className="text-lg font-bold text-foreground">12</p>
          <p className="text-xs text-muted-foreground">Visits</p>
        </MedicalCard>
        <MedicalCard className="text-center">
          <p className="text-lg font-bold text-foreground">3</p>
          <p className="text-xs text-muted-foreground">Doctors</p>
        </MedicalCard>
        <MedicalCard className="text-center">
          <p className="text-lg font-bold text-foreground">850</p>
          <p className="text-xs text-muted-foreground">Credits</p>
        </MedicalCard>
      </div>

      {/* Menu */}
      <div className="space-y-2">
        {menuItems.map((item) => (
          <MedicalCard key={item.label} hover>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </MedicalCard>
        ))}
      </div>

      <Button variant="outline" className="w-full touch-target text-destructive">
        <LogOut className="h-4 w-4 mr-2" /> Sign Out
      </Button>
    </div>
  );
}
