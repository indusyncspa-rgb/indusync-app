import React, { useEffect, useState } from 'react';
import { fetchMetricasFinancieras } from '../services/apiService';

const FinancialMetrics = () => {
  const [metrics, setMetrics] = useState({
    tiempoDetencionEvitado: '0 hrs',
    ahorroEstimadoUSD: '$0',
    eficienciaRed: '0%',
    toneladasSalvadas: '0 Ton'
  });

  useEffect(() => {
    const loadMetrics = async () => {
      const data = await fetchMetricasFinancieras();
      setMetrics(data);
    };
    loadMetrics();
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '24px' }}>
      <div style={{ backgroundColor: '#131b29', border: '1px solid #1f2d40', borderRadius: '8px', padding: '16px', textCenter: 'center' }}>
        <p style={{ color: '#8b9bb4', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', margin: 0 }}>Detención Evitada</p>
        <p style={{ color: '#38bdf8', fontSize: '24px', fontWeight: 'bold', margin: '8px 0 0 0' }}>{metrics.tiempoDetencionEvitado}</p>
      </div>
      <div style={{ backgroundColor: '#131b29', border: '1px solid #22c55e', borderRadius: '8px', padding: '16px', textCenter: 'center' }}>
        <p style={{ color: '#22c55e', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', margin: 0 }}>Ahorro Recuperado (ROI)</p>
        <p style={{ color: '#22c55e', fontSize: '24px', fontWeight: 'bold', margin: '8px 0 0 0' }}>{metrics.ahorroEstimadoUSD}</p>
      </div>
      <div style={{ backgroundColor: '#131b29', border: '1px solid #1f2d40', borderRadius: '8px', padding: '16px', textCenter: 'center' }}>
        <p style={{ color: '#8b9bb4', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', margin: 0 }}>Producción Salvada</p>
        <p style={{ color: '#eab308', fontSize: '24px', fontWeight: 'bold', margin: '8px 0 0 0' }}>{metrics.toneladasSalvadas}</p>
      </div>
      <div style={{ backgroundColor: '#131b29', border: '1px solid #1f2d40', borderRadius: '8px', padding: '16px', textCenter: 'center' }}>
        <p style={{ color: '#8b9bb4', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', margin: 0 }}>Eficiencia de Red</p>
        <p style={{ color: '#f97316', fontSize: '24px', fontWeight: 'bold', margin: '8px 0 0 0' }}>{metrics.eficienciaRed}</p>
      </div>
    </div>
  );
};

export default FinancialMetrics;