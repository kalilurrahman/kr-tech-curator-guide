import { useState, useEffect } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

const ScrollButtons = () => {
  const [showTop, setShowTop] = useState(false);
  const [showBottom, setShowBottom] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 400);
      const nearBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 200;
      setShowBottom(!nearBottom);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToBottom = () => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {showTop && (
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
      {showBottom && (
        <button
          onClick={scrollToBottom}
          className="p-2.5 rounded-full bg-secondary text-secondary-foreground border border-border shadow-lg hover:bg-secondary/80 transition-all"
          aria-label="Scroll to bottom"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default ScrollButtons;
