import { Github, Linkedin, ExternalLink } from "lucide-react";

const SocialLinksSection = () => {
  return (
    <section className="py-16 border-t border-border bg-gradient-to-b from-background to-card/50">
      <div className="container max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
          <span className="text-foreground">Tech</span>
          <span className="text-gradient-gold">Curator</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
          Your curated hub for Technology, AI/ML and System Design learning resources. 
          Discover top courses, tutorials, and tools.
        </p>

        <div className="flex items-center justify-center gap-4">
          <a
            href="https://github.com/kalilurrahman"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-glow transition-all duration-300 text-sm font-medium text-foreground hover:text-primary"
          >
            <Github className="w-5 h-5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/kalilurrahman"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-glow transition-all duration-300 text-sm font-medium text-foreground hover:text-primary"
          >
            <Linkedin className="w-5 h-5" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
          <a
            href="https://linktr.ee/kalilur.rahman"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-glow transition-all duration-300 text-sm font-medium text-foreground hover:text-primary"
          >
            <ExternalLink className="w-5 h-5" />
            <span className="hidden sm:inline">Linktree</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialLinksSection;
