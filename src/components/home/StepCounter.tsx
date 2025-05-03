
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface StepCounterProps {
  steps: number;
  goal: number;
  className?: string;
}

const StepCounter: React.FC<StepCounterProps> = ({ steps, goal, className }) => {
  const [animatedSteps, setAnimatedSteps] = useState(0);
  const percentage = Math.min((steps / goal) * 100, 100);
  const strokeDashoffset = 283 - (283 * percentage) / 100;

  // Animate step count when it changes
  useEffect(() => {
    const duration = 1000; // animation duration in ms
    const interval = 20; // update interval in ms
    const increment = Math.max(1, Math.ceil(steps / (duration / interval)));
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= steps) {
        setAnimatedSteps(steps);
        clearInterval(timer);
      } else {
        setAnimatedSteps(current);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [steps]);

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center",
        className
      )}
    >
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Background circle */}
        <svg className="absolute w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-secondary"
          />
        </svg>

        {/* Progress circle */}
        <svg
          className="absolute w-full h-full rotate-[-90deg]"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray="283"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-eco transition-all duration-700 ease-in-out"
          />
        </svg>

        {/* Step count */}
        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-5xl font-bold text-foreground mb-2">
            {animatedSteps.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground">steps today</span>
          <div className="text-xs text-muted-foreground mt-2">
            Goal: {goal.toLocaleString()} steps
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepCounter;
