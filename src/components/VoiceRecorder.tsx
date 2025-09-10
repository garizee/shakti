import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  Square, 
  Download,
  Trash2,
  Shield,
  Lock,
  Volume2
} from "lucide-react";

interface Recording {
  id: string;
  name: string;
  duration: number;
  timestamp: Date;
  encrypted: boolean;
  emergency: boolean;
}

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordings, setRecordings] = useState<Recording[]>([
    {
      id: "1",
      name: "Emergency Recording 1",
      duration: 45,
      timestamp: new Date(Date.now() - 3600000),
      encrypted: true,
      emergency: true
    },
    {
      id: "2", 
      name: "Daily Safety Check",
      duration: 120,
      timestamp: new Date(Date.now() - 7200000),
      encrypted: true,
      emergency: false
    },
    {
      id: "3",
      name: "Incident Report",
      duration: 180,
      timestamp: new Date(Date.now() - 86400000),
      encrypted: true,
      emergency: true
    }
  ]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      mediaRecorder.ondataavailable = (event) => {
        // Handle recorded data
        console.log("Recording data available:", event.data);
      };

      mediaRecorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Could not access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      
      // Create new recording entry
      const newRecording: Recording = {
        id: Date.now().toString(),
        name: `Recording ${recordings.length + 1}`,
        duration: recordingTime,
        timestamp: new Date(),
        encrypted: true,
        emergency: recordingTime > 30 // Mark as emergency if longer than 30 seconds
      };
      
      setRecordings(prev => [newRecording, ...prev]);
      setRecordingTime(0);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        intervalRef.current = setInterval(() => {
          setRecordingTime(prev => prev + 1);
        }, 1000);
      } else {
        mediaRecorderRef.current.pause();
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
      setIsPaused(!isPaused);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handlePlayPause = (recordingId: string) => {
    if (playingId === recordingId) {
      setPlayingId(null);
    } else {
      setPlayingId(recordingId);
    }
  };

  const deleteRecording = (recordingId: string) => {
    setRecordings(prev => prev.filter(r => r.id !== recordingId));
    if (playingId === recordingId) {
      setPlayingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary-glow/10 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Voice Recorder
          </h1>
          <p className="text-muted-foreground">Secure audio evidence collection</p>
        </div>

        {/* Recording Controls */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5 text-primary" />
              Audio Recording
              <Badge variant="secondary" className="ml-auto">
                <Lock className="h-3 w-3 mr-1" />
                Encrypted
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Recording Timer */}
            <div className="text-center">
              <div className="text-3xl font-mono font-bold text-primary mb-2">
                {formatTime(recordingTime)}
              </div>
              {isRecording && (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-emergency rounded-full animate-pulse"></div>
                  <span className="text-sm text-emergency">
                    {isPaused ? "Paused" : "Recording"}
                  </span>
                </div>
              )}
            </div>

            {/* Recording Controls */}
            <div className="flex items-center justify-center gap-3">
              {!isRecording ? (
                <Button
                  variant="emergency"
                  size="icon-lg"
                  onClick={startRecording}
                  className="shadow-emergency"
                >
                  <Mic className="h-6 w-6" />
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={pauseRecording}
                  >
                    {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="emergency"
                    size="icon-lg"
                    onClick={stopRecording}
                  >
                    <Square className="h-6 w-6" />
                  </Button>
                </>
              )}
            </div>

            {/* Recording Progress */}
            {isRecording && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Recording Quality</span>
                  <span>High</span>
                </div>
                <Progress value={Math.min((recordingTime / 300) * 100, 100)} className="h-2" />
                <p className="text-xs text-muted-foreground text-center">
                  Maximum recording: 5 minutes
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Emergency Features */}
        <Card className="shadow-soft border-emergency/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-5 w-5 text-emergency" />
              <span className="font-semibold">Emergency Features</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="emergency" size="sm" className="text-xs">
                Auto-Upload
              </Button>
              <Button variant="emergency" size="sm" className="text-xs">
                Quick Share
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recordings List */}
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-primary" />
            Saved Recordings ({recordings.length})
          </h3>
          
          {recordings.length === 0 ? (
            <Card className="shadow-soft">
              <CardContent className="p-6 text-center text-muted-foreground">
                No recordings yet. Start your first recording above.
              </CardContent>
            </Card>
          ) : (
            recordings.map((recording) => (
              <Card key={recording.id} className="shadow-soft hover:shadow-glow transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{recording.name}</h4>
                      {recording.emergency && (
                        <Badge variant="destructive" className="text-xs">
                          Emergency
                        </Badge>
                      )}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      <Lock className="h-3 w-3 mr-1" />
                      Encrypted
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-muted-foreground mb-3">
                    {formatTime(recording.duration)} • {formatDate(recording.timestamp)}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePlayPause(recording.id)}
                    >
                      {playingId === recording.id ? (
                        <Pause className="h-4 w-4 mr-1" />
                      ) : (
                        <Play className="h-4 w-4 mr-1" />
                      )}
                      {playingId === recording.id ? "Pause" : "Play"}
                    </Button>
                    
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => deleteRecording(recording.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceRecorder;