import { useMemo } from "react";
import { Card } from "@/components/ui/card";

interface WellnessScoreProps {
  sleep: number;
  exercise: number;
  water: number;
  nutrition: number;
}

export function WellnessScore({ sleep, exercise, water, nutrition }: WellnessScoreProps) {
  const score = useMemo(() => {
    // Calculate score based on optimal ranges
    const sleepScore = Math.min(100, Math.max(0, (sleep - 6) / 2 * 100));
    const exerciseScore = Math.min(100, (exercise / 60) * 100);
    const waterScore = Math.min(100, (water / 8) * 100);
    const nutritionScore = (nutrition / 5) * 100;
    
    return Math.round((sleepScore + exerciseScore + waterScore + nutritionScore) / 4);
  }, [sleep, exercise, water, nutrition]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 90) return "🌟";
    if (score >= 80) return "😊";
    if (score >= 70) return "🙂";
    if (score >= 60) return "😐";
    return "😔";
  };

  const getMotivationalMessage = (score: number) => {
    if (score >= 90) return "Amazing! You're crushing your wellness goals!";
    if (score >= 80) return "Great job! You're doing wonderful!";
    if (score >= 70) return "Nice work! Keep building those healthy habits!";
    if (score >= 60) return "Good effort! Small steps lead to big changes!";
    return "Every step counts! You've got this!";
  };

  // Calculate stroke dasharray for the circular progress
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <Card className="p-8 bg-gradient-to-br from-primary/20 to-wellness/20 backdrop-blur-sm border-border/50 rounded-3xl">
      <div className="flex flex-col items-center space-y-6">
        <h2 className="text-2xl font-semibold text-foreground text-center">
          Your Wellness Score
        </h2>
        
        <div className="relative">
          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 200 200">
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-muted/30"
            />
            {/* Progress circle */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={`transition-all duration-1000 ease-out ${
                score >= 80 ? "text-success" : score >= 60 ? "text-warning" : "text-destructive"
              }`}
            />
          </svg>
          
          {/* Score display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-5xl font-bold ${getScoreColor(score)}`}>
              {score}
            </div>
            <div className="text-sm text-muted-foreground">out of 100</div>
            <div className="text-3xl mt-2">{getScoreEmoji(score)}</div>
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-foreground">
            {getMotivationalMessage(score)}
          </p>
          <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <span>😴</span>
              <span className="text-muted-foreground">{sleep}h sleep</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🚶‍♂️</span>
              <span className="text-muted-foreground">{exercise}m exercise</span>
            </div>
            <div className="flex items-center gap-2">
              <span>💧</span>
              <span className="text-muted-foreground">{water} glasses</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🥗</span>
              <span className="text-muted-foreground">{nutrition}/5 meals</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}