import React from 'react';

export class ErrorBoundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div id="fatal-runtime-error" style={{ color: "red", padding: "50px", background: "#000", zIndex: 999999, position: "fixed", inset: 0 }}>
          <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>FATAL REACT CRASH</h1>
          <pre style={{ fontSize: '14px', whiteSpace: 'pre-wrap' }}>{this.state.error.message}</pre>
          <pre style={{ fontSize: '12px', whiteSpace: 'pre-wrap', marginTop: '20px', color: '#ffaaaa' }}>{this.state.error.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
