import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, 
  Send, 
  Heart, 
  Shield, 
  Users,
  Phone,
  Video,
  UserCheck,
  Clock
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "counselor" | "peer";
  timestamp: Date;
  senderName?: string;
}

interface SupportRoom {
  id: string;
  name: string;
  type: "professional" | "peer" | "crisis";
  activeUsers: number;
  description: string;
}

const SupportChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Welcome to the SafeGuard support community. You're in a safe space here. How are you feeling today?",
      sender: "counselor",
      senderName: "Dr. Sarah",
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: "2",
      text: "Thank you for being here. I've been feeling anxious lately about my safety when walking alone at night.",
      sender: "user",
      timestamp: new Date(Date.now() - 240000)
    },
    {
      id: "3",
      text: "Your feelings are completely valid. Many women share these concerns. Let's talk about some strategies that might help you feel more secure.",
      sender: "counselor",
      senderName: "Dr. Sarah",
      timestamp: new Date(Date.now() - 180000)
    }
  ]);

  const [currentMessage, setCurrentMessage] = useState("");
  const [activeRoom, setActiveRoom] = useState<string>("professional");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const supportRooms: SupportRoom[] = [
    {
      id: "professional",
      name: "Professional Counseling",
      type: "professional",
      activeUsers: 12,
      description: "Chat with trained mental health professionals"
    },
    {
      id: "peer",
      name: "Peer Support Group",
      type: "peer", 
      activeUsers: 34,
      description: "Connect with others who understand your experiences"
    },
    {
      id: "crisis",
      name: "Crisis Support",
      type: "crisis",
      activeUsers: 8,
      description: "Immediate support for urgent situations"
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (currentMessage.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: currentMessage.trim(),
        sender: "user",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newMessage]);
      setCurrentMessage("");
      
      // Simulate counselor response
      setTimeout(() => {
        const responses = [
          "Thank you for sharing that with us. Your courage in reaching out is important.",
          "I hear you, and your feelings are completely valid. Let's work through this together.",
          "You're not alone in this. We're here to support you every step of the way.",
          "That sounds challenging. Can you tell me more about what specific situations make you feel most anxious?",
          "It's wonderful that you're taking proactive steps for your safety. That shows real strength."
        ];
        
        const response: Message = {
          id: (Date.now() + 1).toString(),
          text: responses[Math.floor(Math.random() * responses.length)],
          sender: "counselor",
          senderName: "Dr. Sarah",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, response]);
      }, 1500);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getRoomBadgeVariant = (type: string) => {
    switch (type) {
      case "professional": return "default";
      case "peer": return "secondary";
      case "crisis": return "destructive";
      default: return "secondary";
    }
  };

  const activeRoomData = supportRooms.find(room => room.id === activeRoom);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary-glow/10 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Mental Support
          </h1>
          <p className="text-muted-foreground">Safe space for healing and connection</p>
        </div>

        {/* Crisis Support Banner */}
        <Card className="border-emergency/20 shadow-emergency">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emergency/10 rounded-full">
                <Phone className="h-5 w-5 text-emergency" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-emergency">Need Immediate Help?</h3>
                <p className="text-sm text-muted-foreground">Crisis helpline available 24/7</p>
              </div>
              <Button variant="emergency" size="sm">
                Call Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Support Rooms */}
        <div className="space-y-3">
          <h3 className="font-semibold">Support Communities</h3>
          {supportRooms.map((room) => (
            <Card 
              key={room.id} 
              className={`cursor-pointer shadow-soft hover:shadow-glow transition-all duration-300 ${
                activeRoom === room.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setActiveRoom(room.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{room.name}</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant={getRoomBadgeVariant(room.type)}>
                      {room.type}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {room.activeUsers}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{room.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Active Chat */}
        {activeRoomData && (
          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  {activeRoomData.name}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-safe-zone rounded-full"></div>
                <span>{activeRoomData.activeUsers} people online</span>
                <UserCheck className="h-4 w-4 ml-2" />
                <span>Verified counselors</span>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Messages */}
              <ScrollArea className="h-80 px-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] space-y-1`}>
                        {message.sender !== 'user' && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Heart className="h-3 w-3" />
                            {message.senderName}
                            <Clock className="h-3 w-3" />
                            {formatTime(message.timestamp)}
                          </div>
                        )}
                        <div className={`p-3 rounded-lg ${
                          message.sender === 'user' 
                            ? 'bg-primary text-primary-foreground ml-4' 
                            : 'bg-muted'
                        }`}>
                          <p className="text-sm">{message.text}</p>
                          {message.sender === 'user' && (
                            <p className="text-xs opacity-70 mt-1">
                              {formatTime(message.timestamp)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 px-1">
                  <Shield className="h-3 w-3 inline mr-1" />
                  End-to-end encrypted • Your privacy is protected
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Support Resources */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Additional Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Shield className="h-4 w-4 mr-2" />
              Safety Planning Toolkit
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Local Support Groups
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <MessageCircle className="h-4 w-4 mr-2" />
              Anonymous Reporting
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupportChat;