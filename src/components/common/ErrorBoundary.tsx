/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  declare props: Props;
  declare state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Portfolio App caught error:', error, errorInfo);
  }

  private handleReset = () => {
    localStorage.removeItem('tofayel_portfolio_data_v1');
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-6">
          <div className="max-w-md w-full p-8 rounded-3xl bg-neutral-900 border border-neutral-800 text-center space-y-5 shadow-2xl">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
              <AlertTriangle className="w-7 h-7" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-bold font-display text-white">Something went wrong</h2>
              <p className="text-xs text-neutral-400">
                A rendering issue occurred. Click below to reload with clean defaults.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 rounded-xl bg-neutral-950 text-[11px] font-mono text-rose-300 text-left overflow-x-auto max-h-32 border border-neutral-800">
                {this.state.error.message}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="flex-1 py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Reload Page
              </button>
              <button
                type="button"
                onClick={this.handleReset}
                className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Cache</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
