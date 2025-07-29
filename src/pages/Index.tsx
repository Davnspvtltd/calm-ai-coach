import { useState, useEffect } from "react";
import { DailyLogger } from "@/components/DailyLogger";
import { WellnessScore } from "@/components/WellnessScore";
import { AITipsCarousel } from "@/components/AITipsCarousel";
import { MoodChart } from "@/components/MoodChart";
import { MotivationalCard } from "@/components/MotivationalCard";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [wellnessData, setWellnessData] = useState({
    sleep: 7,
    exercise: 30,
    water: 8,
    nutrition: 3
  });
  
  const { toast } = useToast();

  const handleLog = (entry: typeof wellnessData) => {
    setWellnessData(entry);
    toast({
      title: "Progress Logged! ✨",
      description: "Great job tracking your wellness today!",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 via-wellness/20 to-secondary/20 border-b border-border/50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-foreground">
              MyWellnessAI 🩺
            </h1>
            <p className="text-lg text-muted-foreground">
              Your personal health tracker with AI-powered insights
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Daily Logger - Top */}
        <div className="max-w-4xl mx-auto">
          <DailyLogger onLog={handleLog} />
        </div>

        {/* Wellness Score - Center */}
        <div className="max-w-2xl mx-auto">
          <WellnessScore {...wellnessData} />
        </div>

        {/* Bottom Section - AI Tips and Mood Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-6">
            <AITipsCarousel userScore={75} />
            <MotivationalCard userScore={75} />
          </div>
          <MoodChart />
        </div>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">
            Remember: Small steps lead to big changes 🌱
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
