import { useState } from "react";
import SafetyDashboard from "@/components/SafetyDashboard";
import EmergencyContacts from "@/components/EmergencyContacts";
import VoiceRecorder from "@/components/VoiceRecorder";
import SupportChat from "@/components/SupportChat";
import SafetyAnalytics from "@/components/SafetyAnalytics";
import Navigation from "@/components/Navigation";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <SafetyDashboard />;
      case "contacts":
        return <EmergencyContacts />;
      case "recorder":
        return <VoiceRecorder />;
      case "support":
        return <SupportChat />;
      case "analytics":
        return <SafetyAnalytics />;
      default:
        return <SafetyDashboard />;
    }
  };

  return (
    <div className="relative">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="md:ml-64">
        {renderCurrentPage()}
      </div>
    </div>
  );
};

export default Index;
