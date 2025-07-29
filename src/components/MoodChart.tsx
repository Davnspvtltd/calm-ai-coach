import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const moodData = [
  { day: "Mon", mood: 4, emoji: "😊" },
  { day: "Tue", mood: 3, emoji: "🙂" },
  { day: "Wed", mood: 5, emoji: "😄" },
  { day: "Thu", mood: 2, emoji: "😐" },
  { day: "Fri", mood: 4, emoji: "😊" },
  { day: "Sat", mood: 5, emoji: "😄" },
  { day: "Sun", mood: 3, emoji: "🙂" },
];

const moodEmojis = ["😔", "😕", "😐", "🙂", "😊", "😄"];
const moodLabels = ["Very Low", "Low", "Neutral", "Good", "Great", "Excellent"];

export function MoodChart() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  const handleMoodSelect = (mood: number) => {
    setSelectedMood(mood);
    // Here you would typically save the mood to your state/database
  };

  const getBarHeight = (mood: number) => {
    return `${(mood / 5) * 100}%`;
  };

  const averageMood = moodData.reduce((sum, day) => sum + day.mood, 0) / moodData.length;

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 rounded-3xl">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Mood Tracker 🌈
          </h3>
          <p className="text-sm text-muted-foreground">
            Last 7 days • Average: {averageMood.toFixed(1)}/5 {moodEmojis[Math.round(averageMood)]}
          </p>
        </div>

        {/* Mood Chart */}
        <div className="space-y-4">
          <div className="flex items-end justify-between gap-2 h-32 px-2">
            {moodData.map((day, index) => (
              <div key={day.day} className="flex flex-col items-center gap-2 flex-1">
                <div className="relative flex-1 flex items-end w-full">
                  <div 
                    className="w-full bg-gradient-to-t from-wellness/60 to-wellness/80 rounded-t-lg transition-all duration-500 hover:scale-105 cursor-pointer min-h-[20px]"
                    style={{ height: getBarHeight(day.mood) }}
                    title={`${day.day}: ${moodLabels[day.mood]} (${day.mood}/5)`}
                  />
                </div>
                <div className="text-2xl">{day.emoji}</div>
                <div className="text-xs text-muted-foreground font-medium">{day.day}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Mood Selector */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground text-center">How are you feeling today?</h4>
          <div className="flex justify-center gap-2">
            {moodEmojis.map((emoji, index) => (
              <Button
                key={index}
                variant={selectedMood === index ? "default" : "ghost"}
                size="lg"
                onClick={() => handleMoodSelect(index)}
                className={`text-2xl h-12 w-12 rounded-2xl transition-all duration-300 ${
                  selectedMood === index 
                    ? "bg-wellness hover:bg-wellness/90 scale-110" 
                    : "hover:scale-105 hover:bg-accent"
                }`}
              >
                {emoji}
              </Button>
            ))}
          </div>
          {selectedMood !== null && (
            <p className="text-center text-sm text-muted-foreground animate-in fade-in-50">
              Feeling {moodLabels[selectedMood]} today! 💫
            </p>
          )}
        </div>

        {/* Mood Insights */}
        <div className="bg-accent/20 p-4 rounded-2xl border border-border/30">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">📊</span>
            <h5 className="font-medium text-foreground">Weekly Insight</h5>
          </div>
          <p className="text-sm text-foreground/80">
            {averageMood >= 4 
              ? "You've had a wonderful week! Your positive energy is shining through 🌟"
              : averageMood >= 3
              ? "Your mood has been steady this week. Keep building those positive moments! 🌱"
              : "This week had its challenges. Remember, every day is a fresh start 🌅"
            }
          </p>
        </div>
      </div>
    </Card>
  );
}