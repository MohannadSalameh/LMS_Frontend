// src/components/ui/errors/ErrorBoundary.jsx
import { Component } from "react";
import PropTypes from "prop-types";
import styles from "./ErrorBoundary.module.css";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorContainer}>
          <h2 className={styles.errorTitle}>Something went wrong</h2>
          <details className={styles.errorDetails}>
            {this.state.error && (
              <p className={styles.errorMessage}>{this.state.error.message}</p>
            )}
            {this.state.errorInfo && (
              <pre className={styles.errorStack}>
                {this.state.errorInfo.componentStack}
              </pre>
            )}
          </details>
          <button
            className={styles.retryButton}
            onClick={() => this.setState({ hasError: false })}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.element,
};

export default ErrorBoundary;