import { useState, useMemo } from "react";
import AppHeader from "@/components/AppHeader";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import FeaturedSection from "@/components/FeaturedSection";
import CategoryFilter from "@/components/CategoryFilter";
import MobileFilterSheet from "@/components/MobileFilterSheet";
import ResourceCard from "@/components/ResourceCard";
import KeyTermsSection from "@/components/KeyTermsSection";
import { resources } from "@/data/resources";
import type { Category, ResourceType } from "@/data/resources";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [selectedType, setSelectedType] = useState<ResourceType | "all">("all");
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesSearch =
        searchQuery === "" ||
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        resource.provider.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
      const matchesType = selectedType === "all" || resource.type === selectedType;
      const matchesFree = !showFreeOnly || resource.isFree;

      return matchesSearch && matchesCategory && matchesType && matchesFree;
    });
  }, [searchQuery, selectedCategory, selectedType, showFreeOnly]);

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
    (showFreeOnly ? 1 : 0);

  const showFeatured = searchQuery === "" && selectedCategory === "all" && selectedType === "all" && !showFreeOnly;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalResources={resources.length}
      />
      <StatsBar />

      {showFeatured && <FeaturedSection />}

      <main className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">
              {selectedCategory === "all" ? "All Resources" : selectedCategory}
            </h2>
            <p className="text-sm text-muted-foreground">
              {filteredResources.length} resource{filteredResources.length !== 1 ? "s" : ""} found
            </p>
          </div>
          <MobileFilterSheet
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            showFreeOnly={showFreeOnly}
            onFreeOnlyChange={setShowFreeOnly}
            resourceCounts={resourceCounts}
            activeFilterCount={activeFilterCount}
          />
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedType={selectedType}
                onTypeChange={setSelectedType}
                showFreeOnly={showFreeOnly}
                onFreeOnlyChange={setShowFreeOnly}
                resourceCounts={resourceCounts}
              />
            </div>
          </aside>

          {/* Resource grid */}
          <div className="flex-1 min-w-0">
            {filteredResources.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">No resources found matching your filters.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setSelectedType("all");
                    setShowFreeOnly(false);
                  }}
                  className="mt-4 text-primary hover:underline text-sm font-medium"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredResources.map((resource, index) => (
                  <ResourceCard key={resource.id} resource={resource} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <KeyTermsSection />

      <footer className="border-t border-border py-8">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            TechCurator — Your curated tech training hub. All resources are linked to their original sources.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
