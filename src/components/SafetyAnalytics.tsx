import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  Users, 
  AlertTriangle, 
  Shield, 
  Clock,
  TrendingUp,
  TrendingDown,
  Eye,
  UserX,
  Camera,
  Map
} from "lucide-react";

interface AreaAnalysis {
  id: string;
  location: string;
  safetyScore: number;
  riskLevel: "low" | "medium" | "high";
  incidents: number;
  peopleCount: {
    men: number;
    women: number;
    total: number;
  };
  lastUpdated: Date;
  alerts: string[];
}

interface GestureAlert {
  id: string;
  type: "sos" | "distress" | "suspicious";
  location: string;
  timestamp: Date;
  confidence: number;
}

const SafetyAnalytics = () => {
  const [selectedArea, setSelectedArea] = useState<string>("downtown");
  
  const areasData: AreaAnalysis[] = [
    {
      id: "downtown",
      location: "Downtown Plaza",
      safetyScore: 85,
      riskLevel: "low",
      incidents: 2,
      peopleCount: { men: 15, women: 18, total: 33 },
      lastUpdated: new Date(),
      alerts: ["Well-lit area", "Security patrol active"]
    },
    {
      id: "park",
      location: "Central Park",
      safetyScore: 65,
      riskLevel: "medium", 
      incidents: 5,
      peopleCount: { men: 8, women: 3, total: 11 },
      lastUpdated: new Date(Date.now() - 300000),
      alerts: ["Low visibility after 8 PM", "Isolated areas detected"]
    },
    {
      id: "station",
      location: "Metro Station",
      safetyScore: 45,
      riskLevel: "high",
      incidents: 12,
      peopleCount: { men: 25, women: 7, total: 32 },
      lastUpdated: new Date(Date.now() - 600000),
      alerts: ["High crime area", "Multiple incidents reported", "Lone woman detected"]
    }
  ];

  const gestureAlerts: GestureAlert[] = [
    {
      id: "1",
      type: "sos",
      location: "Central Park - North End",
      timestamp: new Date(Date.now() - 180000),
      confidence: 94
    },
    {
      id: "2",
      type: "distress",
      location: "Metro Station - Platform B",
      timestamp: new Date(Date.now() - 420000),
      confidence: 87
    },
    {
      id: "3",
      type: "suspicious",
      location: "Downtown Plaza - East Side",
      timestamp: new Date(Date.now() - 720000),
      confidence: 76
    }
  ];

  const selectedAreaData = areasData.find(area => area.id === selectedArea);

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low": return "text-safe-zone";
      case "medium": return "text-caution-zone";
      case "high": return "text-danger-zone";
      default: return "text-muted-foreground";
    }
  };

  const getRiskBadgeVariant = (level: string) => {
    switch (level) {
      case "low": return "secondary";
      case "medium": return "default";
      case "high": return "destructive";
      default: return "secondary";
    }
  };

  const getGestureColor = (type: string) => {
    switch (type) {
      case "sos": return "text-emergency";
      case "distress": return "text-warning";
      case "suspicious": return "text-primary";
      default: return "text-muted-foreground";
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const genderRatio = selectedAreaData ? 
    (selectedAreaData.peopleCount.women / selectedAreaData.peopleCount.total * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary-glow/10 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Safety Analytics
          </h1>
          <p className="text-muted-foreground">Real-time area monitoring & insights</p>
        </div>

        {/* Area Selector */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5 text-primary" />
              Select Area
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {areasData.map((area) => (
              <Button
                key={area.id}
                variant={selectedArea === area.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedArea(area.id)}
                className="w-full justify-between"
              >
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {area.location}
                </span>
                <Badge variant={getRiskBadgeVariant(area.riskLevel)}>
                  {area.riskLevel}
                </Badge>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Selected Area Analysis */}
        {selectedAreaData && (
          <>
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    {selectedAreaData.location}
                  </span>
                  <Badge variant={getRiskBadgeVariant(selectedAreaData.riskLevel)}>
                    {selectedAreaData.riskLevel} risk
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Safety Score */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Safety Score</span>
                    <span className={`text-2xl font-bold ${getRiskColor(selectedAreaData.riskLevel)}`}>
                      {selectedAreaData.safetyScore}%
                    </span>
                  </div>
                  <Progress value={selectedAreaData.safetyScore} className="h-2" />
                </div>

                {/* People Count */}
                <div className="grid grid-cols-3 gap-4 pt-2">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">
                      {selectedAreaData.peopleCount.total}
                    </div>
                    <div className="text-xs text-muted-foreground">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">
                      {selectedAreaData.peopleCount.women}
                    </div>
                    <div className="text-xs text-muted-foreground">Women</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">
                      {selectedAreaData.peopleCount.men}
                    </div>
                    <div className="text-xs text-muted-foreground">Men</div>
                  </div>
                </div>

                {/* Gender Distribution */}
                <div className="space-y-2">
                  <span className="text-sm font-medium">Gender Distribution</span>
                  <div className="flex rounded-lg overflow-hidden h-4">
                    <div 
                      className="bg-primary"
                      style={{ width: `${genderRatio}%` }}
                    />
                    <div 
                      className="bg-muted"
                      style={{ width: `${100 - genderRatio}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Women ({Math.round(genderRatio)}%)</span>
                    <span>Men ({Math.round(100 - genderRatio)}%)</span>
                  </div>
                </div>

                {/* Incidents */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Recent Incidents</span>
                  <div className="flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    <span className="text-sm font-bold">{selectedAreaData.incidents}</span>
                  </div>
                </div>

                {/* Last Updated */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Updated {formatTime(selectedAreaData.lastUpdated)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Area Alerts */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  Area Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {selectedAreaData.alerts.map((alert, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm p-2 bg-muted rounded-md">
                    <AlertTriangle className="h-4 w-4 text-warning flex-shrink-0" />
                    <span>{alert}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </>
        )}

        {/* Gesture Detection Alerts */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-primary" />
              Gesture Detection Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {gestureAlerts.map((alert) => (
              <Card key={alert.id} className="border-l-4 border-l-emergency">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="destructive" className="text-xs">
                      {alert.type.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {alert.confidence}% confidence
                    </span>
                  </div>
                  <p className="text-sm font-medium mb-1">{alert.location}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatTime(alert.timestamp)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <TrendingDown className="h-6 w-6 text-safe-zone mx-auto mb-2" />
              <div className="text-lg font-bold text-safe-zone">-23%</div>
              <div className="text-xs text-muted-foreground">Incidents vs Last Week</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-lg font-bold text-primary">+15%</div>
              <div className="text-xs text-muted-foreground">Safety Score Improvement</div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button variant="emergency" className="w-full">
            Report Incident
          </Button>
          <Button variant="outline" className="w-full">
            Download Safety Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SafetyAnalytics;