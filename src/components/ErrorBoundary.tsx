import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          background: "hsl(225 20% 7%)",
          color: "hsl(40 15% 92%)",
          fontFamily: "'Inter', system-ui, sans-serif",
          textAlign: "center",
        }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem", fontFamily: "'Space Grotesk', sans-serif" }}>
            Something went wrong
          </h1>
          <p style={{ color: "hsl(220 10% 50%)", marginBottom: "1.5rem", maxWidth: "400px" }}>
            The app encountered an error. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "0.75rem 1.5rem",
              background: "hsl(210 75% 52%)",
              color: "white",
              border: "none",
              borderRadius: "0.5rem",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Reload App
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
