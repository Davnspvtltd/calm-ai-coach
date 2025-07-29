import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

const motivationalQuotes = [
  {
    quote: "Every small step forward is progress worth celebrating.",
    author: "Wellness Wisdom",
    emoji: "🌟"
  },
  {
    quote: "Your body is your temple. Keep it pure and clean for the soul to reside in.",
    author: "B.K.S. Iyengar",
    emoji: "🏛️"
  },
  {
    quote: "Health is not about the weight you lose, but about the life you gain.",
    author: "Mindful Living",
    emoji: "🌱"
  },
  {
    quote: "Take care of your body. It's the only place you have to live.",
    author: "Jim Rohn",
    emoji: "🏠"
  },
  {
    quote: "A healthy outside starts from the inside.",
    author: "Robert Urich",
    emoji: "💫"
  },
  {
    quote: "The greatest wealth is health.",
    author: "Virgil",
    emoji: "💎"
  }
];

interface MotivationalCardProps {
  userScore: number;
}

export function MotivationalCard({ userScore }: MotivationalCardProps) {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  const getPersonalizedEncouragement = () => {
    if (userScore >= 90) {
      return "You're absolutely crushing it! 🚀";
    } else if (userScore >= 80) {
      return "Amazing progress! Keep shining! ✨";
    } else if (userScore >= 70) {
      return "You're building great habits! 🌱";
    } else if (userScore >= 60) {
      return "Every step forward counts! 💪";
    } else {
      return "Your wellness journey starts now! 🌅";
    }
  };

  const quote = motivationalQuotes[currentQuote];

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/10 via-wellness/10 to-secondary/10 backdrop-blur-sm border-border/50 rounded-3xl overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-wellness/5 rounded-full -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/5 rounded-full translate-y-12 -translate-x-12" />
      
      <div className="relative space-y-4">
        <div className="text-center">
          <div className="text-4xl mb-3">{quote.emoji}</div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {getPersonalizedEncouragement()}
          </h3>
        </div>

        <div className="text-center space-y-3">
          <blockquote className="text-foreground/90 italic leading-relaxed text-lg">
            "{quote.quote}"
          </blockquote>
          <p className="text-sm text-muted-foreground font-medium">
            — {quote.author}
          </p>
        </div>

        {/* Progress indicator dots */}
        <div className="flex justify-center gap-2 pt-4">
          {motivationalQuotes.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                index === currentQuote 
                  ? "bg-wellness w-6" 
                  : "bg-muted/50"
              }`}
            />
          ))}
        </div>

        {/* Score-based motivation */}
        <div className="bg-card/60 p-3 rounded-xl border border-border/30 text-center">
          <p className="text-sm text-foreground/80">
            {userScore >= 80 
              ? "You're in the wellness zone! Keep up the fantastic work! 🎯"
              : userScore >= 60
              ? "You're on the right track! Small improvements lead to big changes! 📈"
              : "Remember, every healthy choice is a victory! You've got this! 💫"
            }
          </p>
        </div>
      </div>
    </Card>
  );
}