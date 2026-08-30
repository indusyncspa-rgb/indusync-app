import React from 'react';
import { SystemProvider } from './context/SystemContext';
import Header from './components/Header';
import FinancialMetrics from './components/FinancialMetrics';
import Telemetry from './components/Telemetry';
import Marketplace from './components/Marketplace';
import AuditLogs from './components/AuditLogs';

export default function App() {
  return (
    <SystemProvider>
      <div style={{ fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#090d16', color: '#f8fafc', minHeight: '100vh', padding: '25px' }}>
        <Header />
        <FinancialMetrics />
        <main style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', marginBottom: '20px' }}>
          <Telemetry />
          <Marketplace />
        </main>
        <AuditLogs />
      </div>
    </SystemProvider>
  );
}