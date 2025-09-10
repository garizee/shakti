import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Phone, 
  Plus, 
  Edit, 
  Shield,
  Heart,
  UserPlus,
  Star
} from "lucide-react";

interface Contact {
  id: string;
  name: string;
  phone: string;
  relation: string;
  priority: "high" | "medium" | "low";
}

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Mom",
      phone: "+1-555-0123",
      relation: "Mother",
      priority: "high"
    },
    {
      id: "2", 
      name: "Dad",
      phone: "+1-555-0124",
      relation: "Father", 
      priority: "high"
    },
    {
      id: "3",
      name: "Sarah Johnson",
      phone: "+1-555-0125", 
      relation: "Best Friend",
      priority: "medium"
    },
    {
      id: "4",
      name: "Police Station",
      phone: "911",
      relation: "Emergency Service",
      priority: "high"
    },
    {
      id: "5",
      name: "Dr. Smith",
      phone: "+1-555-0126",
      relation: "Doctor",
      priority: "low"
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    relation: "",
    priority: "medium" as const
  });

  const handleQuickCall = (contact: Contact) => {
    alert(`Calling ${contact.name} at ${contact.phone}`);
  };

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      const contact: Contact = {
        id: Date.now().toString(),
        ...newContact
      };
      setContacts([...contacts, contact]);
      setNewContact({ name: "", phone: "", relation: "", priority: "medium" });
      setShowAddForm(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-emergency";
      case "medium": return "text-warning";
      case "low": return "text-primary";
      default: return "text-muted-foreground";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high": return <Star className="h-4 w-4 fill-current" />;
      case "medium": return <Shield className="h-4 w-4" />;
      case "low": return <Heart className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary-glow/10 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Emergency Contacts
          </h1>
          <p className="text-muted-foreground">Your trusted safety network</p>
        </div>

        {/* Quick Emergency Call */}
        <Card className="border-emergency/20 shadow-emergency">
          <CardContent className="p-4">
            <div className="text-center mb-4">
              <h3 className="font-semibold text-emergency mb-2">Quick Emergency Call</h3>
              <p className="text-sm text-muted-foreground">
                Instantly call your top priority contacts
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {contacts.filter(c => c.priority === "high").slice(0, 4).map((contact) => (
                <Button
                  key={contact.id}
                  variant="emergency"
                  size="sm"
                  onClick={() => handleQuickCall(contact)}
                  className="text-xs h-12"
                >
                  <Phone className="h-4 w-4 mr-1" />
                  {contact.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Add New Contact */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-primary" />
                Add Contact
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          {showAddForm && (
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newContact.name}
                  onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter contact name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={newContact.phone}
                  onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1-555-0000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="relation">Relationship</Label>
                <Input
                  id="relation"
                  value={newContact.relation}
                  onChange={(e) => setNewContact(prev => ({ ...prev, relation: e.target.value }))}
                  placeholder="e.g., Sister, Friend, Doctor"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddContact} className="flex-1">
                  Add Contact
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Contacts List */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">All Contacts</h3>
          {contacts.map((contact) => (
            <Card key={contact.id} className="shadow-soft hover:shadow-glow transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={getPriorityColor(contact.priority)}>
                      {getPriorityIcon(contact.priority)}
                    </span>
                    <h4 className="font-medium">{contact.name}</h4>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {contact.priority}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  {contact.relation}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono">{contact.phone}</span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickCall(contact)}
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Statistics */}
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-emergency">
                  {contacts.filter(c => c.priority === "high").length}
                </div>
                <div className="text-xs text-muted-foreground">High Priority</div>
              </div>
              <div>
                <div className="text-lg font-bold text-warning">
                  {contacts.filter(c => c.priority === "medium").length}
                </div>
                <div className="text-xs text-muted-foreground">Medium Priority</div>
              </div>
              <div>
                <div className="text-lg font-bold text-primary">
                  {contacts.filter(c => c.priority === "low").length}
                </div>
                <div className="text-xs text-muted-foreground">Low Priority</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmergencyContacts;