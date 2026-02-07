import { Download, Bookmark, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const AppHeader = () => {
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
          <span className="font-display font-bold text-lg text-foreground">
            Tech<span className="text-gradient-gold">Curator</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          {deferredPrompt && (
            <button
              onClick={handleInstall}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Install App</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
