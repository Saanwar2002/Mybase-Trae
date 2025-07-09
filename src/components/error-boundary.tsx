"use client";

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log chunk loading errors specifically
    if (error.name === 'ChunkLoadError' || error.message.includes('Loading chunk')) {
      console.error('Chunk loading error detected:', error);
      // Attempt to reload the page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  retry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error!} retry={this.retry} />;
      }

      // Default fallback for chunk loading errors
      if (this.state.error?.name === 'ChunkLoadError' || 
          this.state.error?.message.includes('Loading chunk')) {
        return (
          <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Loading Error</h2>
              <p className="text-gray-600 mb-4">
                There was an issue loading the application. Refreshing the page...
              </p>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          </div>
        );
      }

      // Generic error fallback
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={this.retry}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;