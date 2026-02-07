import { BookOpen, Gift, FolderOpen, Users } from "lucide-react";
import { resources, categories } from "@/data/resources";

const StatsBar = () => {
  const totalResources = resources.length;
  const freeResources = resources.filter((r) => r.isFree).length;
  const totalCategories = categories.length;
  const uniqueProviders = new Set(resources.map((r) => r.provider)).size;

  const stats = [
    { icon: BookOpen, label: "Resources", value: totalResources },
    { icon: Gift, label: "Free", value: freeResources },
    { icon: FolderOpen, label: "Categories", value: totalCategories },
    { icon: Users, label: "Providers", value: uniqueProviders },
  ];

  return (
    <div className="border-b border-border bg-card/50">
      <div className="container max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <stat.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xl font-display font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
