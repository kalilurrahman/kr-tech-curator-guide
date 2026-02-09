import { ExternalLink, Star, Github, Youtube, Globe, BookOpen, Award, FileText, MessageCircle, Gift, Heart, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import type { Resource, ResourceType } from "@/data/resources";
import { Checkbox } from "@/components/ui/checkbox";

const typeConfig: Record<ResourceType, { icon: React.ElementType; label: string; className: string }> = {
  course: { icon: BookOpen, label: "Course", className: "bg-resource-course/15 text-resource-course" },
  github: { icon: Github, label: "GitHub", className: "bg-resource-github/15 text-resource-github" },
  youtube: { icon: Youtube, label: "YouTube", className: "bg-resource-youtube/15 text-resource-youtube" },
  website: { icon: Globe, label: "Website", className: "bg-resource-website/15 text-resource-website" },
  certification: { icon: Award, label: "Cert", className: "bg-resource-cert/15 text-resource-cert" },
  pdf: { icon: FileText, label: "PDF", className: "bg-resource-pdf/15 text-resource-pdf" },
  tweet: { icon: MessageCircle, label: "Tweet", className: "bg-resource-tweet/15 text-resource-tweet" },
  free: { icon: Gift, label: "Free", className: "bg-resource-free/15 text-resource-free" },
};

interface ResourceCardProps {
  resource: Resource;
  index: number;
  isBookmarked?: boolean;
  onToggleBookmark?: (id: string) => void;
  isCompleted?: boolean;
  onToggleCompleted?: (id: string) => void;
}

const ResourceCard = ({ resource, index, isBookmarked = false, onToggleBookmark, isCompleted = false, onToggleCompleted }: ResourceCardProps) => {
  const config = typeConfig[resource.type];
  const TypeIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
      className={`group relative bg-card border rounded-xl p-5 hover:border-primary/30 hover:shadow-glow transition-all duration-300 ${isCompleted ? "border-accent/30 bg-accent/5" : "border-border"}`}
    >
      {/* Bookmark button */}
      {onToggleBookmark && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleBookmark(resource.id);
          }}
          className={`absolute top-3 right-3 p-1.5 rounded-lg transition-all z-10 ${
            isBookmarked
              ? "text-primary bg-primary/10"
              : "text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-secondary"
          }`}
          aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          <Heart
            className={`w-4 h-4 ${isBookmarked ? "fill-primary" : ""}`}
          />
        </button>
      )}

      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="flex items-start gap-3 mb-3 pr-8">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${config.className}`}>
              <TypeIcon className="w-3.5 h-3.5" />
              {config.label}
            </span>
            {resource.isFree && resource.type !== "free" && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-resource-free/15 text-resource-free">
                Free
              </span>
            )}
            {resource.difficulty && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-secondary text-secondary-foreground">
                {resource.difficulty}
              </span>
            )}
          </div>
        </div>

        <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors leading-tight">
          {resource.title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
          {resource.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-medium">
            {resource.provider}
          </span>
          <div className="flex items-center gap-2.5">
            {resource.rating && (
              <span className="inline-flex items-center gap-1 text-xs text-primary">
                <Star className="w-3.5 h-3.5 fill-primary" />
                {resource.rating}
              </span>
            )}
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border">
            {resource.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </a>

      {/* Completion toggle */}
      {onToggleCompleted && (
        <div className="mt-3 pt-3 border-t border-border">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleCompleted(resource.id);
            }}
            className={`flex items-center gap-2 w-full text-xs font-medium transition-colors ${
              isCompleted ? "text-accent" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isCompleted ? "fill-accent/20" : ""}`} />
            {isCompleted ? "Completed" : "Mark as completed"}
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ResourceCard;
