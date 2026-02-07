import { Sparkles } from "lucide-react";
import { resources } from "@/data/resources";
import ResourceCard from "./ResourceCard";

const FeaturedSection = () => {
  const featured = resources.filter((r) => r.featured);

  return (
    <section className="py-8 border-b border-border">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-display font-bold text-foreground">Featured Resources</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {featured.map((resource, index) => (
            <ResourceCard key={resource.id} resource={resource} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
