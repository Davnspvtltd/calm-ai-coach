import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const wellnessTips = [
  {
    emoji: "💧",
    title: "Hydration Hero",
    tip: "Start your day with a glass of water to kickstart your metabolism and boost energy levels!",
    category: "Hydration"
  },
  {
    emoji: "😴",
    title: "Sleep Sanctuary", 
    tip: "Create a bedtime routine 30 minutes before sleep. Try reading or gentle stretches!",
    category: "Sleep"
  },
  {
    emoji: "🧘‍♀️",
    title: "Mindful Moments",
    tip: "Take 5 deep breaths when feeling stressed. It activates your body's relaxation response!",
    category: "Mental Health"
  },
  {
    emoji: "🥗",
    title: "Nutrition Ninja",
    tip: "Add colorful vegetables to every meal. The more colors, the more nutrients!",
    category: "Nutrition"
  },
  {
    emoji: "🚶‍♂️",
    title: "Movement Magic",
    tip: "Take the stairs instead of elevators. Small movements add up to big health benefits!",
    category: "Exercise"
  },
  {
    emoji: "🌱",
    title: "Progress Power",
    tip: "Celebrate small wins! Every healthy choice you make is building a stronger you.",
    category: "Motivation"
  }
];

interface AITipsCarouselProps {
  userScore: number;
}

export function AITipsCarousel({ userScore }: AITipsCarouselProps) {
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % wellnessTips.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % wellnessTips.length);
  };

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + wellnessTips.length) % wellnessTips.length);
  };

  const getPersonalizedMessage = () => {
    if (userScore >= 80) {
      return "You're doing amazing! Here's how to maintain your momentum:";
    } else if (userScore >= 60) {
      return "Great progress! Here's a tip to boost your wellness:";
    } else {
      return "Every journey starts with a single step. Here's some inspiration:";
    }
  };

  const tip = wellnessTips[currentTip];

  return (
    <Card className="p-6 bg-gradient-to-r from-secondary/30 to-accent/30 backdrop-blur-sm border-border/50 rounded-3xl">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-foreground">
            AI Wellness Coach 🤖
          </h3>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevTip}
              className="rounded-full h-8 w-8 p-0"
            >
              <ChevronLeft size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextTip}
              className="rounded-full h-8 w-8 p-0"
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          {getPersonalizedMessage()}
        </p>

        <div className="bg-card/80 p-4 rounded-2xl border border-border/30">
          <div className="flex items-start gap-3">
            <div className="text-3xl">{tip.emoji}</div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-2">{tip.title}</h4>
              <p className="text-foreground/80 leading-relaxed">{tip.tip}</p>
              <div className="mt-3">
                <span className="inline-block bg-wellness/20 text-wellness-foreground px-3 py-1 rounded-full text-xs font-medium">
                  {tip.category}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {wellnessTips.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTip(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentTip 
                  ? "bg-wellness w-6" 
                  : "bg-muted hover:bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}