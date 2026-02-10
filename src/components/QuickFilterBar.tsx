import { useRef } from "react";
import { Filter, X, Gift, ChevronLeft, ChevronRight } from "lucide-react";
import { categories, categoryIcons, resourceTypes } from "@/data/resources";
import type { Category, ResourceType } from "@/data/resources";
import type { DifficultyFilter } from "@/components/CategoryFilter";

interface QuickFilterBarProps {
  selectedCategory: Category | "all";
  onCategoryChange: (category: Category | "all") => void;
  selectedType: ResourceType | "all";
  onTypeChange: (type: ResourceType | "all") => void;
  selectedDifficulty: DifficultyFilter;
  onDifficultyChange: (difficulty: DifficultyFilter) => void;
  showFreeOnly: boolean;
  onFreeOnlyChange: (free: boolean) => void;
  activeFilterCount: number;
  onClearAll: () => void;
}

const difficultyOptions: { value: DifficultyFilter; label: string }[] = [
  { value: "Beginner", label: "🟢 Beginner" },
  { value: "Intermediate", label: "🟡 Intermediate" },
  { value: "Advanced", label: "🔴 Advanced" },
];

const QuickFilterBar = ({
  selectedCategory,
  onCategoryChange,
  selectedType,
  onTypeChange,
  selectedDifficulty,
  onDifficultyChange,
  showFreeOnly,
  onFreeOnlyChange,
  activeFilterCount,
  onClearAll,
}: QuickFilterBarProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  };

  return (
    <div className="sticky top-14 sm:top-16 z-30 bg-background/95 backdrop-blur-xl border-b border-border">
      <div className="container max-w-7xl mx-auto px-4 py-2.5">
        {/* Row 1: Categories */}
        <div className="relative flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="hidden sm:flex flex-shrink-0 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div
            ref={scrollRef}
            className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin pb-0.5 flex-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <button
              onClick={() => onCategoryChange("all")}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                selectedCategory === "all"
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-transparent"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-transparent"
                }`}
              >
                <span>{categoryIcons[cat]}</span>
                <span>{cat}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="hidden sm:flex flex-shrink-0 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Row 2: Type + Difficulty + Free + Clear */}
        <div className="flex items-center gap-1.5 mt-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {/* Type pills */}
          {resourceTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => onTypeChange(selectedType === type.value ? "all" : type.value)}
              className={`flex-shrink-0 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all whitespace-nowrap ${
                selectedType === type.value
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "bg-muted text-muted-foreground hover:text-foreground border border-transparent"
              }`}
            >
              {type.label}
            </button>
          ))}

          <span className="w-px h-4 bg-border flex-shrink-0 mx-1" />

          {/* Difficulty */}
          {difficultyOptions.map((d) => (
            <button
              key={d.value}
              onClick={() => onDifficultyChange(selectedDifficulty === d.value ? "all" : d.value)}
              className={`flex-shrink-0 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all whitespace-nowrap ${
                selectedDifficulty === d.value
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "bg-muted text-muted-foreground hover:text-foreground border border-transparent"
              }`}
            >
              {d.label}
            </button>
          ))}

          <span className="w-px h-4 bg-border flex-shrink-0 mx-1" />

          {/* Free toggle */}
          <button
            onClick={() => onFreeOnlyChange(!showFreeOnly)}
            className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all whitespace-nowrap ${
              showFreeOnly
                ? "bg-resource-free/15 text-resource-free border border-resource-free/30"
                : "bg-muted text-muted-foreground hover:text-foreground border border-transparent"
            }`}
          >
            <Gift className="w-3 h-3" />
            Free
          </button>

          {/* Clear all */}
          {activeFilterCount > 0 && (
            <button
              onClick={onClearAll}
              className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium text-destructive hover:bg-destructive/10 transition-all whitespace-nowrap ml-1"
            >
              <X className="w-3 h-3" />
              Clear ({activeFilterCount})
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickFilterBar;
