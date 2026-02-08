import { Download, Bookmark, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface AppHeaderProps {
  bookmarkCount?: number;
  showBookmarksOnly?: boolean;
  onToggleBookmarksView?: () => void;
}

const AppHeader = ({ bookmarkCount = 0, showBookmarksOnly = false, onToggleBookmarksView }: AppHeaderProps) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    const scrollHandler = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-card"
          : "bg-transparent"
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bookmark className="w-6 h-6 text-primary" />
          <Link to="/" className="flex items-center gap-0.5">
            <span className="font-display font-bold text-lg text-foreground">
              Tech<span className="text-gradient-gold">Curator</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden md:inline text-xs text-muted-foreground">
            Curated by{" "}
            <a
              href="https://linktr.ee/kalilur.rahman"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Kalilur Rahman
            </a>
          </span>

          <Link
            to="/glossary"
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Glossary</span>
          </Link>

          {onToggleBookmarksView && (
            <button
              onClick={onToggleBookmarksView}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                showBookmarksOnly
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${showBookmarksOnly ? "fill-primary" : ""}`} />
              {bookmarkCount > 0 && (
                <span className="text-xs">{bookmarkCount}</span>
              )}
            </button>
          )}

          {deferredPrompt && (
            <button
              onClick={handleInstall}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Install</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
