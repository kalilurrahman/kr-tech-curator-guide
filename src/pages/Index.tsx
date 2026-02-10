import { useState, useMemo } from "react";
import AppHeader from "@/components/AppHeader";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import QuickFilterBar from "@/components/QuickFilterBar";
import ProgressTracker from "@/components/ProgressTracker";
import FeaturedSection from "@/components/FeaturedSection";
import LearningPathsSection from "@/components/LearningPathsSection";
import ResourceCard from "@/components/ResourceCard";
import SortDropdown from "@/components/SortDropdown";
import type { SortOption } from "@/components/SortDropdown";
import KeyTermsSection from "@/components/KeyTermsSection";
import SocialLinksSection from "@/components/SocialLinksSection";
import ScrollButtons from "@/components/ScrollButtons";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useProgress } from "@/hooks/useProgress";
import { useTheme } from "@/hooks/useTheme";
import { resources } from "@/data/resources";
import type { Category, ResourceType, Resource } from "@/data/resources";
import type { DifficultyFilter } from "@/components/CategoryFilter";

const difficultyOrder: Record<string, number> = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
};

const sortResources = (list: Resource[], sort: SortOption): Resource[] => {
  if (sort === "default") return list;
  return [...list].sort((a, b) => {
    switch (sort) {
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "difficulty":
        return (difficultyOrder[a.difficulty || ""] || 99) - (difficultyOrder[b.difficulty || ""] || 99);
      case "provider":
        return a.provider.localeCompare(b.provider);
      case "alphabetical":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });
};

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [selectedType, setSelectedType] = useState<ResourceType | "all">("all");
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [learningPathFilter, setLearningPathFilter] = useState<string[] | null>(null);

  const { toggleBookmark, isBookmarked, bookmarkCount, bookmarks } = useBookmarks();
  const { completed, toggleCompleted, isCompleted, getPathProgress, getPathCompletedCount } = useProgress();
  const { theme, toggleTheme } = useTheme();

  const filteredResources = useMemo(() => {
    let filtered = resources.filter((resource) => {
      const matchesSearch =
        searchQuery === "" ||
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        resource.provider.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
      const matchesType = selectedType === "all" || resource.type === selectedType;
      const matchesFree = !showFreeOnly || resource.isFree;
      const matchesDifficulty = selectedDifficulty === "all" || resource.difficulty === selectedDifficulty;
      const matchesBookmark = !showBookmarksOnly || bookmarks.has(resource.id);
      const matchesPath = !learningPathFilter || learningPathFilter.includes(resource.id);

      return matchesSearch && matchesCategory && matchesType && matchesFree && matchesDifficulty && matchesBookmark && matchesPath;
    });

    return sortResources(filtered, sortBy);
  }, [searchQuery, selectedCategory, selectedType, showFreeOnly, selectedDifficulty, sortBy, showBookmarksOnly, bookmarks, learningPathFilter]);

  const resourceCounts = useMemo(() => {
    const counts: Record<string, number> = { all: resources.length };
    resources.forEach((r) => {
      counts[r.category] = (counts[r.category] || 0) + 1;
    });
    return counts;
  }, []);

  const activeFilterCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (selectedType !== "all" ? 1 : 0) +
    (selectedDifficulty !== "all" ? 1 : 0) +
    (showFreeOnly ? 1 : 0);

  const showFeatured = searchQuery === "" && selectedCategory === "all" && selectedType === "all" && !showFreeOnly && !showBookmarksOnly && !learningPathFilter;

  const handleSelectPath = (resourceIds: string[]) => {
    setLearningPathFilter(resourceIds);
    setSelectedCategory("all");
    setSelectedType("all");
    setSelectedDifficulty("all");
    setShowFreeOnly(false);
    setShowBookmarksOnly(false);
  };

  const clearPathFilter = () => setLearningPathFilter(null);

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSelectedType("all");
    setSelectedDifficulty("all");
    setShowFreeOnly(false);
    setShowBookmarksOnly(false);
    setLearningPathFilter(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader
        bookmarkCount={bookmarkCount}
        showBookmarksOnly={showBookmarksOnly}
        onToggleBookmarksView={() => {
          setShowBookmarksOnly(!showBookmarksOnly);
          setLearningPathFilter(null);
        }}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalResources={resources.length}
      />

      {/* Sticky filter bar immediately after hero */}
      <QuickFilterBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
        showFreeOnly={showFreeOnly}
        onFreeOnlyChange={setShowFreeOnly}
        activeFilterCount={activeFilterCount}
        onClearAll={clearAllFilters}
      />

      {/* Progress tracker */}
      <ProgressTracker completedCount={completed.size} />

      <StatsBar />

      {showFeatured && <FeaturedSection />}
      {showFeatured && (
        <LearningPathsSection
          onSelectPath={handleSelectPath}
          getPathProgress={getPathProgress}
          getPathCompletedCount={getPathCompletedCount}
        />
      )}

      <main className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">
              {learningPathFilter
                ? "Learning Path"
                : showBookmarksOnly
                ? "Bookmarked Resources"
                : selectedCategory === "all"
                ? "All Resources"
                : selectedCategory}
            </h2>
            <p className="text-sm text-muted-foreground">
              {filteredResources.length} resource{filteredResources.length !== 1 ? "s" : ""} found
              {learningPathFilter && (
                <button
                  onClick={clearPathFilter}
                  className="ml-2 text-primary hover:underline"
                >
                  ← Show all
                </button>
              )}
            </p>
          </div>
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>

        {/* Resource grid — full width, no sidebar */}
        {filteredResources.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">No resources found matching your filters.</p>
            <button
              onClick={clearAllFilters}
              className="mt-4 text-primary hover:underline text-sm font-medium"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredResources.map((resource, index) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                index={index}
                isBookmarked={isBookmarked(resource.id)}
                onToggleBookmark={toggleBookmark}
                isCompleted={isCompleted(resource.id)}
                onToggleCompleted={toggleCompleted}
              />
            ))}
          </div>
        )}
      </main>

      <KeyTermsSection />
      <SocialLinksSection />

      <footer className="border-t border-border py-8">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            TechCurator — Your curated tech training hub. All resources are linked to their original sources.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Curated by{" "}
            <a
              href="https://linktr.ee/kalilur.rahman"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Kalilur Rahman
            </a>
          </p>
        </div>
      </footer>

      <ScrollButtons />
    </div>
  );
};

export default Index;
