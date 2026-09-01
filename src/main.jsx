import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';
import * as SystemModule from './context/SystemContext';
import './index.css';

// Soporte flexible para SystemProvider si existe en tu proyecto
const SystemProvider = SystemModule.SystemProvider || SystemModule.default || (({ children }) => children);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Error de renderizado capturado:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-slate-950 text-red-400 min-h-screen font-mono text-xs">
          <h1 className="text-lg font-bold mb-2 text-red-500">⚠️ Error de Ejecución Detectado</h1>
          <p className="mb-4 text-slate-300">Detalle del problema para corregir:</p>
          <pre className="p-4 bg-slate-900 border border-slate-800 rounded-lg text-red-300 overflow-auto whitespace-pre-wrap">
            {this.state.error?.stack || this.state.error?.toString()}
          </pre>
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