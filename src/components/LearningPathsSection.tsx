import { motion } from "framer-motion";
import { GraduationCap, ChevronRight, BookOpen } from "lucide-react";
import { learningPaths } from "@/data/learningPaths";
import { resources } from "@/data/resources";

interface LearningPathsSectionProps {
  onSelectPath: (resourceIds: string[]) => void;
}

const LearningPathsSection = ({ onSelectPath }: LearningPathsSectionProps) => {
  return (
    <section className="py-10 border-b border-border">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <GraduationCap className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-display font-bold text-foreground">Learning Paths</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {learningPaths.map((path, index) => {
            const validResources = path.resourceIds.filter((id) =>
              resources.some((r) => r.id === id)
            );
            return (
              <motion.button
                key={path.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => onSelectPath(validResources)}
                className={`group text-left p-5 rounded-xl border border-border bg-gradient-to-br ${path.color} hover:border-primary/40 hover:shadow-glow transition-all duration-300`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{path.icon}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                  {path.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {path.description}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{validResources.length} resources</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LearningPathsSection;
