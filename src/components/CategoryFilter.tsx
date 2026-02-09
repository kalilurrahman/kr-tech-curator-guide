import { categories, categoryIcons, resourceTypes } from "@/data/resources";
import type { Category, ResourceType } from "@/data/resources";

export type DifficultyFilter = "all" | "Beginner" | "Intermediate" | "Advanced";

const difficultyLevels: { value: DifficultyFilter; label: string }[] = [
  { value: "all", label: "All Levels" },
  { value: "Beginner", label: "🟢 Beginner" },
  { value: "Intermediate", label: "🟡 Intermediate" },
  { value: "Advanced", label: "🔴 Advanced" },
];

interface CategoryFilterProps {
  selectedCategory: Category | "all";
  onCategoryChange: (category: Category | "all") => void;
  selectedType: ResourceType | "all";
  onTypeChange: (type: ResourceType | "all") => void;
  selectedDifficulty: DifficultyFilter;
  onDifficultyChange: (difficulty: DifficultyFilter) => void;
  showFreeOnly: boolean;
  onFreeOnlyChange: (free: boolean) => void;
  resourceCounts: Record<string, number>;
}

const CategoryFilter = ({
  selectedCategory,
  onCategoryChange,
  selectedType,
  onTypeChange,
  selectedDifficulty,
  onDifficultyChange,
  showFreeOnly,
  onFreeOnlyChange,
  resourceCounts,
}: CategoryFilterProps) => {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-display font-semibold text-foreground mb-3 uppercase tracking-wider">
          Categories
        </h3>
        <div className="space-y-1">
          <button
            onClick={() => onCategoryChange("all")}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === "all"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            <span>All Categories</span>
            <span className="text-xs opacity-70">{resourceCounts["all"] || 0}</span>
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{categoryIcons[category]}</span>
                <span className="truncate">{category}</span>
              </span>
              <span className="text-xs opacity-70">{resourceCounts[category] || 0}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Resource Type */}
      <div>
        <h3 className="text-sm font-display font-semibold text-foreground mb-3 uppercase tracking-wider">
          Type
        </h3>
        <div className="space-y-1">
          <button
            onClick={() => onTypeChange("all")}
            className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedType === "all"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            All Types
          </button>
          {resourceTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => onTypeChange(type.value)}
              className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedType === type.value
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty Level */}
      <div>
        <h3 className="text-sm font-display font-semibold text-foreground mb-3 uppercase tracking-wider">
          Difficulty
        </h3>
        <div className="space-y-1">
          {difficultyLevels.map((level) => (
            <button
              key={level.value}
              onClick={() => onDifficultyChange(level.value)}
              className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedDifficulty === level.value
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      {/* Free Filter */}
      <div>
        <button
          onClick={() => onFreeOnlyChange(!showFreeOnly)}
          className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
            showFreeOnly
              ? "bg-resource-free/15 text-resource-free"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          <span>🆓</span>
          <span>Free Resources Only</span>
        </button>
      </div>
    </div>
  );
};

export default CategoryFilter;
