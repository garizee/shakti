import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Shield, 
  Phone, 
  Mic, 
  MessageCircle, 
  MapPin,
  Menu,
  X
} from "lucide-react";
import shaktiLogo from "@/assets/shakti-logo.jpg";

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navigation = ({ currentPage, onPageChange }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "contacts", icon: Phone, label: "Contacts" },
    { id: "recorder", icon: Mic, label: "Recorder" },
    { id: "support", icon: MessageCircle, label: "Support" },
    { id: "analytics", icon: MapPin, label: "Analytics" }
  ];

  const handlePageChange = (pageId: string) => {
    onPageChange(pageId);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="bg-card/95 backdrop-blur-lg border-t border-border shadow-soft">
          <div className="grid grid-cols-5 gap-1 p-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handlePageChange(item.id)}
                  className={`flex-col h-16 gap-1 ${
                    isActive ? 'shadow-soft' : ''
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                  <span className={`text-xs ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
                    {item.label}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-64 bg-card border-r border-border shadow-soft z-40">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <img src={shaktiLogo} alt="Shakti Logo" className="h-12 w-12 rounded-full object-cover" />
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Shakti
            </h1>
          </div>
          
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  size="lg"
                  onClick={() => handlePageChange(item.id)}
                  className={`w-full justify-start gap-3 ${
                    isActive ? 'shadow-soft' : ''
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className="bg-card/95 backdrop-blur-lg border-b border-border shadow-soft">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <img src={shaktiLogo} alt="Shakti Logo" className="h-8 w-8 rounded-full object-cover" />
              <h1 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                Shakti
              </h1>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute top-16 left-4 right-4 bg-card rounded-lg shadow-soft border border-border p-4">
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    size="lg"
                    onClick={() => handlePageChange(item.id)}
                    className={`w-full justify-start gap-3 ${
                      isActive ? 'shadow-soft' : ''
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Spacer for mobile layout */}
      <div className="h-16 md:hidden" />
      <div className="h-20 md:hidden" />
    </>
  );
};

export default Navigation;