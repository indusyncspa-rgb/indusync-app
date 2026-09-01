import React, { useState } from 'react';

const MarketplaceB2B = () => {
  const [excedentes, setExcedentes] = useState([
    { id: 'EXC-104', item: 'Lote Neumáticos CAEX 59/80R63 (Nuevos)', origen: 'Minera Sierra Gorda', valor: '$145,000 USD', feeComision: '3.5%', estado: 'Disponible' },
    { id: 'EXC-109', item: 'Motor Diésel QSK60 CUMMINS (Reacondicionado)', origen: 'Faena Cordillera', valor: '$210,000 USD', feeComision: '3.5%', estado: 'En Negociación' }
  ]);

  const comprarExcedente = (id) => {
    setExcedentes(prev => prev.map(item => item.id === id ? { ...item, estado: 'Transacción Procesada (Fee Retenido)' } : item));
  };

  return (
    <div style={{ backgroundColor: '#131b29', border: '1px solid #1f2d40', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
        <h3 style={{ color: '#f8fafc', fontSize: '16px', fontWeight: 'bold', margin: 0 }}>
          🛒 Marketplace B2B & Valorización de Excedentes Industriales
        </h3>
        <span style={{ backgroundColor: '#1e1b4b', color: '#818cf8', fontSize: '10px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px', border: '1px solid #4338ca' }}>
          Monetización por Fee Transaccional (Módulo 4)
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {excedentes.map((item) => (
          <div key={item.id} style={{ backgroundColor: '#0b1120', padding: '12px', borderRadius: '6px', border: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <span style={{ color: '#38bdf8', fontSize: '11px', fontWeight: 'bold' }}>[{item.id}] {item.origen}</span>
              <h4 style={{ color: '#f8fafc', fontSize: '13px', margin: '2px 0' }}>{item.item}</h4>
              <span style={{ color: '#94a3b8', fontSize: '11px' }}>Valor Remate: <strong style={{ color: '#34d399' }}>{item.valor}</strong> (Fee INDUSYNC®: {item.feeComision})</span>
            </div>
            <button 
              onClick={() => comprarExcedente(item.id)}
              disabled={item.estado !== 'Disponible'}
              style={{ backgroundColor: item.estado === 'Disponible' ? '#10b981' : '#334155', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: item.estado === 'Disponible' ? 'pointer' : 'default' }}>
              {item.estado === 'Disponible' ? '⚡ Adquirir con Fee B2B' : item.estado}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketplaceB2B;

