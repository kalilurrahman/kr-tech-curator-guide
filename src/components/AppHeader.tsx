import { Download, Bookmark, BookOpen, Share, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import type { Theme } from "@/hooks/useTheme";

interface AppHeaderProps {
  bookmarkCount?: number;
  showBookmarksOnly?: boolean;
  onToggleBookmarksView?: () => void;
  theme?: Theme;
  onToggleTheme?: () => void;
}

const isIOS = () => {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
};

const isInStandaloneMode = () => {
  if (typeof window === "undefined") return false;
  return (window.matchMedia("(display-mode: standalone)").matches) || (window.navigator as any).standalone === true;
};

const AppHeader = ({ bookmarkCount = 0, showBookmarksOnly = false, onToggleBookmarksView, theme, onToggleTheme }: AppHeaderProps) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showIOSBanner, setShowIOSBanner] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    const scrollHandler = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", scrollHandler);

    // Show iOS banner if on iOS and not already installed
    if (isIOS() && !isInStandaloneMode()) {
      const dismissed = sessionStorage.getItem("ios-install-dismissed");
      if (!dismissed) {
        setShowIOSBanner(true);
      }
    }

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

  const dismissIOSBanner = () => {
    setShowIOSBanner(false);
    sessionStorage.setItem("ios-install-dismissed", "true");
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-card"
            : "bg-transparent"
        }`}
      >
        <div className="container max-w-7xl mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <Link to="/" className="flex items-center gap-0.5">
              <span className="font-display font-bold text-base sm:text-lg text-foreground">
                Tech<span className="text-gradient-gold">Curator</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
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
              className="flex items-center gap-1.5 px-2 sm:px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Glossary</span>
            </Link>

            {onToggleBookmarksView && (
              <button
                onClick={onToggleBookmarksView}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-2 rounded-lg text-sm font-medium transition-all ${
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

            {theme && onToggleTheme && (
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            )}

            {deferredPrompt && (
              <button
                onClick={handleInstall}
                className="flex items-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Install</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* iOS Install Banner */}
      {showIOSBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t-2 border-primary/30 p-4 shadow-lg animate-fade-in safe-bottom">
          <div className="container max-w-lg mx-auto">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 flex-shrink-0">
                <Download className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground mb-1">Install TechCurator</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Tap <Share className="w-3.5 h-3.5 inline-block text-primary mx-0.5 -mt-0.5" /> <strong>Share</strong> in Safari, then select <strong>"Add to Home Screen"</strong> for quick offline access.
                </p>
              </div>
              <button
                onClick={dismissIOSBanner}
                className="p-1.5 hover:bg-secondary rounded-lg transition-colors flex-shrink-0 -mt-0.5"
                aria-label="Dismiss install banner"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppHeader;
