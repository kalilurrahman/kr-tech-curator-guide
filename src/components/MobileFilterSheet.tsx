import { useState } from "react";
import { Filter, X } from "lucide-react";
import CategoryFilter from "./CategoryFilter";
import type { Category, ResourceType } from "@/data/resources";

interface MobileFilterSheetProps {
  selectedCategory: Category | "all";
  onCategoryChange: (category: Category | "all") => void;
  selectedType: ResourceType | "all";
  onTypeChange: (type: ResourceType | "all") => void;
  showFreeOnly: boolean;
  onFreeOnlyChange: (free: boolean) => void;
  resourceCounts: Record<string, number>;
  activeFilterCount: number;
}

const MobileFilterSheet = (props: MobileFilterSheetProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-xl text-sm font-medium text-foreground hover:border-primary/30 transition-all"
      >
        <Filter className="w-4 h-4" />
        <span>Filters</span>
        {props.activeFilterCount > 0 && (
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
            {props.activeFilterCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-card border-l border-border p-6 overflow-y-auto animate-slide-in-right">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-lg text-foreground">Filters</h2>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-secondary rounded-lg transition-colors">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <CategoryFilter {...props} />
          </div>
        </div>
      )}
    </>
  );
};

export default MobileFilterSheet;
