import { useState } from "react";
import { Video, Mic, MicOff, VideoOff, MessageSquare, FileUp, Phone, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MedicalCard } from "@/components/healthcare/MedicalCard";
import { StatusBadge } from "@/components/healthcare/StatusBadge";

export default function ConsultationScreen() {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const [messages, setMessages] = useState([
    { from: "doctor", text: "Hello John, how are you feeling today?" },
    { from: "patient", text: "I've been having headaches for the past 3 days." },
  ]);
  const [elapsed] = useState("05:23");
  const [callActive, setCallActive] = useState(true);

  const sendMessage = () => {
    if (!chatMsg.trim()) return;
    setMessages((prev) => [...prev, { from: "patient", text: chatMsg }]);
    setChatMsg("");
  };

  if (!callActive) {
    return (
      <div className="space-y-6 animate-slide-up">
        <header>
          <h1 className="text-xl font-bold text-foreground">Consultation Summary</h1>
        </header>
        <MedicalCard>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground">ER</div>
              <div>
                <p className="font-semibold text-foreground">Dr. Eliza Raymond</p>
                <p className="text-xs text-muted-foreground">Cardiologist</p>
              </div>
            </div>
            <div className="border-t border-border pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Duration</span>
                <span className="text-foreground font-medium">{elapsed}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Diagnosis</span>
                <span className="text-foreground font-medium">Tension Headache</span>
              </div>
            </div>
          </div>
        </MedicalCard>
        <MedicalCard>
          <h3 className="font-semibold text-foreground mb-2">Prescription</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm py-1 border-b border-border">
              <span className="text-foreground">Ibuprofen 400mg</span>
              <span className="text-muted-foreground">After meals, 3x daily</span>
            </div>
            <div className="flex justify-between text-sm py-1">
              <span className="text-foreground">Rest & Hydration</span>
              <span className="text-muted-foreground">48 hours</span>
            </div>
          </div>
        </MedicalCard>
        <div className="space-y-2">
          <Button className="w-full touch-target">Download Prescription</Button>
          <Button variant="outline" className="w-full touch-target">Add to Records</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-slide-up">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-foreground">Dr. Eliza Raymond</h1>
          <p className="text-xs text-muted-foreground">Cardiologist</p>
        </div>
        <StatusBadge variant="low">
          <Clock className="h-3 w-3 mr-1" /> {elapsed}
        </StatusBadge>
      </header>

      {/* Video Area */}
      <div className="relative rounded-xl bg-foreground/5 aspect-video flex items-center justify-center overflow-hidden">
        <div className="text-center">
          <div className="h-20 w-20 rounded-full bg-muted mx-auto flex items-center justify-center text-2xl font-bold text-muted-foreground">ER</div>
          <p className="text-sm text-muted-foreground mt-2">Dr. Eliza Raymond</p>
        </div>
        {/* Self view */}
        <div className="absolute bottom-3 right-3 h-24 w-20 rounded-lg bg-muted flex items-center justify-center border-2 border-card">
          <span className="text-xs text-muted-foreground">You</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant={micOn ? "outline" : "destructive"}
          size="icon"
          className="rounded-full h-12 w-12 touch-target"
          onClick={() => setMicOn(!micOn)}
          aria-label={micOn ? "Mute microphone" : "Unmute microphone"}
        >
          {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
        </Button>
        <Button
          variant={videoOn ? "outline" : "destructive"}
          size="icon"
          className="rounded-full h-12 w-12 touch-target"
          onClick={() => setVideoOn(!videoOn)}
          aria-label={videoOn ? "Turn off camera" : "Turn on camera"}
        >
          {videoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-12 w-12 touch-target"
          onClick={() => setChatOpen(!chatOpen)}
          aria-label="Toggle chat"
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-12 w-12 touch-target"
          aria-label="Upload file"
        >
          <FileUp className="h-5 w-5" />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          className="rounded-full h-12 w-12 touch-target"
          onClick={() => setCallActive(false)}
          aria-label="End call"
        >
          <Phone className="h-5 w-5 rotate-[135deg]" />
        </Button>
      </div>

      {/* Chat Panel */}
      {chatOpen && (
        <MedicalCard className="max-h-60 flex flex-col">
          <h3 className="font-semibold text-sm text-foreground mb-2">Chat</h3>
          <div className="flex-1 overflow-y-auto space-y-2 mb-3">
            {messages.map((msg, i) => (
              <div key={i} className={`text-sm p-2 rounded-lg max-w-[80%] ${msg.from === "doctor" ? "bg-muted text-foreground" : "bg-primary text-primary-foreground ml-auto"}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={chatMsg}
              onChange={(e) => setChatMsg(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 touch-target"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button size="icon" onClick={sendMessage} className="touch-target" aria-label="Send message">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </MedicalCard>
      )}
    </div>
  );
}
