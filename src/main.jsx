import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { SystemProvider } from './context/SystemContext.jsx';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error en ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: '#fff', backgroundColor: '#090d16', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h2>⚠️ Ocurrió un detalle al cargar el módulo</h2>
          <pre style={{ color: '#f87171', whiteSpace: 'pre-wrap' }}>{this.state.error?.toString()}</pre>
          <button 
            onClick={() => window.location.reload()}
            style={{ padding: '8px 16px', marginTop: '12px', background: '#38bdf8', color: '#000', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Reintentar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <SystemProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SystemProvider>
    </ErrorBoundary>
  </React.StrictMode>
);