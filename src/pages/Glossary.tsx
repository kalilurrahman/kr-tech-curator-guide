import { useState, useMemo, useCallback } from "react";
import { Search, BookOpen, ArrowLeft, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { glossaryTerms, glossaryCategories } from "@/data/glossary";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

type SortOption = "a-z" | "z-a" | "category";

const PAGE_SIZE = 50;

const GlossaryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("a-z");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredTerms = useMemo(() => {
    let terms = glossaryTerms.filter((item) => {
      const matchesSearch =
        searchQuery === "" ||
        item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case "a-z":
        return [...terms].sort((a, b) => a.term.localeCompare(b.term));
      case "z-a":
        return [...terms].sort((a, b) => b.term.localeCompare(a.term));
      case "category":
        return [...terms].sort(
          (a, b) =>
            a.category.localeCompare(b.category) ||
            a.term.localeCompare(b.term)
        );
      default:
        return terms;
    }
  }, [searchQuery, selectedCategory, sortBy]);

  // Reset visible count when filters change
  const handleFilterChange = useCallback(
    (setter: (val: any) => void, val: any) => {
      setter(val);
      setVisibleCount(PAGE_SIZE);
    },
    []
  );

  const visibleTerms = filteredTerms.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTerms.length;

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
        <div className="container max-w-7xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between">
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

      {/* Compact Hero */}
      <section className="relative overflow-hidden bg-gradient-hero py-8 md:py-12">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-2">
            <span className="text-foreground">Tech </span>
            <span className="text-gradient-gold">Glossary</span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-5">
            {glossaryTerms.length}+ essential technology terms — searchable, categorized, and tabulated.
          </p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search terms..."
              value={searchQuery}
              onChange={(e) => handleFilterChange(setSearchQuery, e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-base"
            />
          </div>
        </div>
      </section>

      {/* Compact filter bar */}
      <div className="border-b border-border bg-card/50 sticky top-14 sm:top-16 z-30 backdrop-blur-xl">
        <div className="container max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => handleFilterChange(setSelectedCategory, e.target.value)}
              className="bg-card border border-border rounded-lg px-3 py-1.5 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-w-[160px]"
            >
              {glossaryCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat} ({categoryCounts[cat] || 0})
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => handleFilterChange(setSortBy, e.target.value as SortOption)}
              className="bg-card border border-border rounded-lg px-3 py-1.5 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="a-z">A → Z</option>
              <option value="z-a">Z → A</option>
              <option value="category">By Category</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabular Terms */}
      <main className="container max-w-5xl mx-auto px-4 py-6">
        <p className="text-sm text-muted-foreground mb-4">
          Showing {visibleTerms.length} of {filteredTerms.length} term{filteredTerms.length !== 1 ? "s" : ""}
        </p>

        <div className="border border-border rounded-xl overflow-hidden bg-card">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="w-[200px] sm:w-[260px] font-display font-semibold text-foreground text-xs">
                  Term
                </TableHead>
                <TableHead className="hidden sm:table-cell w-[140px] font-display font-semibold text-foreground text-xs">
                  Category
                </TableHead>
                <TableHead className="font-display font-semibold text-foreground text-xs">
                  Definition
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleTerms.map((item) => (
                <TableRow
                  key={item.term}
                  className="cursor-pointer hover:bg-primary/5 transition-colors"
                  onClick={() =>
                    setExpandedTerm(expandedTerm === item.term ? null : item.term)
                  }
                >
                  <TableCell className="font-display font-semibold text-sm text-foreground align-top py-3">
                    <div className="flex items-start gap-1.5">
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5 transition-transform sm:hidden ${
                          expandedTerm === item.term ? "rotate-180" : ""
                        }`}
                      />
                      <span>{item.term}</span>
                    </div>
                    {/* Mobile: show category below term */}
                    <span className="block sm:hidden text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5 ml-5">
                      {item.category}
                    </span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-xs text-muted-foreground align-top py-3">
                    <span className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground text-[10px] font-medium uppercase tracking-wider">
                      {item.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground leading-relaxed align-top py-3">
                    {/* Desktop: always show definition */}
                    <span className="hidden sm:inline">{item.definition}</span>
                    {/* Mobile: expandable */}
                    <span className="sm:hidden">
                      <AnimatePresence mode="wait">
                        {expandedTerm === item.term ? (
                          <motion.span
                            key="open"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                          >
                            {item.definition}
                          </motion.span>
                        ) : (
                          <span className="text-xs text-muted-foreground/60">
                            Tap to expand
                          </span>
                        )}
                      </AnimatePresence>
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Load more */}
        {hasMore && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
              className="px-6 py-2.5 bg-primary/10 text-primary border border-primary/30 rounded-xl text-sm font-medium hover:bg-primary/20 transition-all"
            >
              Load more ({filteredTerms.length - visibleCount} remaining)
            </button>
          </div>
        )}

        {filteredTerms.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              No terms found matching your search.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setVisibleCount(PAGE_SIZE);
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
