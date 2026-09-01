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
    console.error("Error capturado por ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: '#fff', backgroundColor: '#121212', minHeight: '100vh' }}>
          <h2>Ha ocurrido un error al cargar la aplicación.</h2>
          <pre style={{ color: '#ff6b6b' }}>{this.state.error?.toString()}</pre>
          <button 
            onClick={() => window.location.reload()}
            style={{ padding: '8px 16px', marginTop: '10px', cursor: 'pointer' }}
          >
            Reintentar
          </button>
        </div>
      );
    }

    // ¡CRÍTICO!: Si no hay error, se deben retornar los componentes hijos
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