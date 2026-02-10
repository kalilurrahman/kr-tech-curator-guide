import { CheckCircle2, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { resources } from "@/data/resources";

interface ProgressTrackerProps {
  completedCount: number;
}

const ProgressTracker = ({ completedCount }: ProgressTrackerProps) => {
  const total = resources.length;
  const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  if (completedCount === 0) return null;

  return (
    <div className="border-b border-border bg-card/50">
      <div className="container max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="p-1.5 rounded-lg bg-accent/10">
              <TrendingUp className="w-4 h-4 text-accent" />
            </div>
            <span className="text-sm font-medium text-foreground">Your Progress</span>
          </div>
          <div className="flex-1 min-w-0">
            <Progress value={percent} className="h-2" />
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-medium text-muted-foreground">
              {completedCount}/{total} ({percent}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
