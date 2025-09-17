import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  AlertTriangle, 
  Phone, 
  Mic, 
  MessageCircle, 
  MapPin,
  Users,
  Clock,
  Heart
} from "lucide-react";
import shaktiLogo from "@/assets/shakti-logo.jpg";

interface SafetyStats {
  safeZones: number;
  activeAlerts: number;
  emergencyContacts: number;
  onlineUsers: number;
}

const SafetyDashboard = () => {
  const [stats] = useState<SafetyStats>({
    safeZones: 12,
    activeAlerts: 3,
    emergencyContacts: 5,
    onlineUsers: 1247
  });

  const handleEmergencyCall = () => {
    // Emergency call functionality
    alert("Emergency services contacted!");
  };

  const handleSOSSignal = () => {
    // SOS signal functionality
    alert("SOS signal sent to emergency contacts!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary-glow/10 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src={shaktiLogo} alt="Shakti Logo" className="h-10 w-10 rounded-full object-cover" />
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Shakti
            </h1>
          </div>
          <p className="text-muted-foreground">Your Personal Safety Companion</p>
        </div>

        {/* Emergency SOS Button */}
        <Card className="border-emergency/20 shadow-emergency">
          <CardContent className="p-6 text-center">
            <Button 
              variant="emergency" 
              size="emergency" 
              onClick={handleSOSSignal}
              className="mx-auto mb-4"
            >
              SOS
            </Button>
            <p className="text-sm text-muted-foreground">
              Tap for immediate emergency alert
            </p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="default" 
            size="xl" 
            onClick={handleEmergencyCall}
            className="flex-col h-20"
          >
            <Phone className="h-6 w-6 mb-1" />
            Emergency Call
          </Button>
          <Button variant="accent" size="xl" className="flex-col h-20">
            <Mic className="h-6 w-6 mb-1" />
            Voice Record
          </Button>
        </div>

        {/* Safety Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-safe-zone">{stats.safeZones}</div>
              <div className="text-xs text-muted-foreground">Safe Zones Nearby</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">{stats.activeAlerts}</div>
              <div className="text-xs text-muted-foreground">Active Alerts</div>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="space-y-4">
          <Card className="shadow-soft hover:shadow-glow transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <MessageCircle className="h-5 w-5 text-primary" />
                Mental Support Chat
                <Badge variant="secondary" className="ml-auto">
                  {stats.onlineUsers} online
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-3">
                Connect with trained counselors and support groups
              </p>
              <Button variant="default" size="sm" className="w-full">
                Join Support Room
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-glow transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <MapPin className="h-5 w-5 text-primary" />
                Safety Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm">Current Area Status:</span>
                <Badge variant="secondary" className="bg-safe-zone text-white">
                  Safe
                </Badge>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                View Area Analysis
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-glow transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="h-5 w-5 text-primary" />
                Emergency Contacts
                <Badge variant="secondary" className="ml-auto">
                  {stats.emergencyContacts}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-3">
                Manage your trusted emergency contacts
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Manage Contacts
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Status Bar */}
        <div className="bg-card rounded-lg p-4 shadow-soft">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-safe-zone rounded-full"></div>
              <span>Protected Mode: ON</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Last sync: Now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyDashboard;