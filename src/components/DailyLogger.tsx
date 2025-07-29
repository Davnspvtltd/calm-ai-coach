import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LogEntry {
  sleep: number;
  exercise: number;
  water: number;
  nutrition: number;
}

interface DailyLoggerProps {
  onLog: (entry: LogEntry) => void;
}

export function DailyLogger({ onLog }: DailyLoggerProps) {
  const [entry, setEntry] = useState<LogEntry>({
    sleep: 7,
    exercise: 30,
    water: 8,
    nutrition: 3
  });

  const handleSubmit = () => {
    onLog(entry);
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 rounded-3xl">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
          Today's Wellness Check-in 💫
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sleep */}
          <div className="space-y-3">
            <Label className="text-foreground font-medium flex items-center gap-2">
              😴 Sleep
            </Label>
            <div className="space-y-2">
              <Slider
                value={[entry.sleep]}
                onValueChange={(value) => setEntry({ ...entry, sleep: value[0] })}
                max={12}
                min={3}
                step={0.5}
                className="w-full"
              />
              <div className="text-sm text-muted-foreground text-center">
                {entry.sleep} hours
              </div>
            </div>
          </div>

          {/* Exercise */}
          <div className="space-y-3">
            <Label className="text-foreground font-medium flex items-center gap-2">
              🚶‍♂️ Exercise
            </Label>
            <div className="space-y-2">
              <Slider
                value={[entry.exercise]}
                onValueChange={(value) => setEntry({ ...entry, exercise: value[0] })}
                max={120}
                min={0}
                step={5}
                className="w-full"
              />
              <div className="text-sm text-muted-foreground text-center">
                {entry.exercise} minutes
              </div>
            </div>
          </div>

          {/* Water */}
          <div className="space-y-3">
            <Label className="text-foreground font-medium flex items-center gap-2">
              💧 Hydration
            </Label>
            <div className="space-y-2">
              <Slider
                value={[entry.water]}
                onValueChange={(value) => setEntry({ ...entry, water: value[0] })}
                max={15}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="text-sm text-muted-foreground text-center">
                {entry.water} glasses
              </div>
            </div>
          </div>

          {/* Nutrition */}
          <div className="space-y-3">
            <Label className="text-foreground font-medium flex items-center gap-2">
              🥗 Nutrition
            </Label>
            <div className="space-y-2">
              <Slider
                value={[entry.nutrition]}
                onValueChange={(value) => setEntry({ ...entry, nutrition: value[0] })}
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="text-sm text-muted-foreground text-center">
                {entry.nutrition}/5 healthy meals
              </div>
            </div>
          </div>
        </div>

        <Button 
          onClick={handleSubmit}
          className="w-full mt-6 bg-wellness hover:bg-wellness/90 text-wellness-foreground rounded-2xl py-6 text-lg font-medium transition-all duration-300 hover:scale-105"
        >
          Log Today's Progress ✨
        </Button>
      </div>
    </Card>
  );
}