import { useState, useMemo } from "react";
import { Search, BookOpen, ChevronDown, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { glossaryTerms, glossaryCategories } from "@/data/glossary";

const GlossaryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter((item) => {
      const matchesSearch =
        searchQuery === "" ||
        item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: glossaryTerms.length };
    glossaryTerms.forEach((t) => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="container max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Resources</span>
          </Link>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="font-display font-bold text-foreground">
              Tech Glossary
            </span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero py-12 md:py-16">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-3">
            <span className="text-foreground">Tech </span>
            <span className="text-gradient-gold">Glossary</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            {glossaryTerms.length}+ essential technology terms and concepts —
            searchable and categorized.
          </p>

          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search terms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-base"
            />
          </div>
        </div>
      </section>

      {/* Category pills */}
      <div className="border-b border-border bg-card/50">
        <div className="container max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-wrap gap-2">
            {glossaryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-transparent"
                }`}
              >
                {cat}
                <span className="ml-1.5 opacity-60">
                  {categoryCounts[cat] || 0}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Terms */}
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <p className="text-sm text-muted-foreground mb-6">
          {filteredTerms.length} term{filteredTerms.length !== 1 ? "s" : ""}{" "}
          found
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredTerms.map((item) => (
            <button
              key={item.term}
              onClick={() =>
                setExpandedTerm(
                  expandedTerm === item.term ? null : item.term
                )
              }
              className="text-left bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-all group"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                    {item.term}
                  </h4>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5 transition-transform ${
                    expandedTerm === item.term ? "rotate-180" : ""
                  }`}
                />
              </div>
              <AnimatePresence>
                {expandedTerm === item.term && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm text-muted-foreground mt-2 leading-relaxed"
                  >
                    {item.definition}
                  </motion.p>
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              No terms found matching your search.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4 text-primary hover:underline text-sm font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            TechCurator — Curated by{" "}
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
    </div>
  );
};

export default GlossaryPage;
