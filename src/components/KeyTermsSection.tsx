import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Lightbulb } from "lucide-react";
import { keyTerms } from "@/data/resources";

const KeyTermsSection = () => {
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const terms = Object.entries(keyTerms);

  return (
    <section className="py-12 md:py-16 border-t border-border">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-primary/10">
            <Lightbulb className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground">Key Terms & Concepts</h2>
            <p className="text-sm text-muted-foreground">Essential terminology for evolving technologies</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {terms.map(([term, definition]) => (
            <button
              key={term}
              onClick={() => setExpandedTerm(expandedTerm === term ? null : term)}
              className="text-left bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-all group"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-display font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                  {term}
                </h4>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5 transition-transform ${
                    expandedTerm === term ? "rotate-180" : ""
                  }`}
                />
              </div>
              <AnimatePresence>
                {expandedTerm === term && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm text-muted-foreground mt-2 leading-relaxed"
                  >
                    {definition}
                  </motion.p>
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyTermsSection;
