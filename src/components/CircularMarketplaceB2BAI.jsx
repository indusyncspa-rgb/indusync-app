import React, { useState } from 'react';

const CircularMarketplaceB2BAI = () => {
  const [publicando, setPublicando] = useState(false);
  const [ventaConfirmada, setVentaConfirmada] = useState(false);

  const [itemsCircular, setItemsCircular] = useState([
    { id: 'EXC-CHATARRA-40T', titulo: 'Lote 40 Toneladas Acero Estructural / Revestimiento Molino', estado: 'DISPONIBLE', valorEstimado: '$28,000 USD', compradorPotential: 'Reciclajes del Norte SpA' },
    { id: 'EXC-MOTOR-CAT', titulo: 'Motor Diésel CAEX 3516 (Para Reparación/Repuestos)', estado: 'DISPONIBLE', valorEstimado: '$45,000 USD', compradorPotential: 'Maquinarias Calama Ltda' },
    { id: 'EXC-ACEITE-3000L', titulo: '3,000 Litros Aceite Hidráulico Usado (Filtrable)', estado: 'DISPONIBLE', valorEstimado: '$6,500 USD', compradorPotential: 'EcoLubricantes Chile' }
  ]);

  const publicarYLiquidar = () => {
    setPublicando(true);
    setTimeout(() => {
      setItemsCircular(prev =>
        prev.map(item =>
          item.id === 'EXC-CHATARRA-40T'
            ? { ...item, estado: 'OFERTA ACEPTADA & VENDIDO', valorEstimado: '$31,500 USD (Subasta)' }
            : item
        )
      );
      setPublicando(false);
      setVentaConfirmada(true);
    }, 1500);
  };

  return (
    <div style={{ backgroundColor: '#0f172a', border: '1px solid #eab308', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
        <div>
          <h3 style={{ color: '#fde047', fontSize: '16px', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            ♻️ Marketplace B2B & Economía Circular Minera (Venta de Excedentes y Chatarra)
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '11px', margin: '2px 0 0 0' }}>
            Monetización inmediata de excedentes, insumos dados de baja y chatarra. Reducción de huella ambiental.
          </p>
        </div>
        <button
          onClick={publicarYLiquidar}
          disabled={publicando}
          style={{
            backgroundColor: publicando ? '#475569' : '#ca8a04',
            color: '#fff',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '11px',
            cursor: publicando ? 'not-allowed' : 'pointer'
          }}
        >
          {publicando ? '🔄 Corriendo Subasta B2B...' : '💰 Subastar Excedentes & Generar Ingreso ESG'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '14px' }}>
        {itemsCircular.map(item => (
          <div key={item.id} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '12px', borderRadius: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ color: '#fde047', fontWeight: 'bold', fontSize: '11px' }}>{item.id}</span>
              <span style={{
                backgroundColor: item.estado.includes('VENDIDO') ? '#065f46' : '#854d0e',
                color: item.estado.includes('VENDIDO') ? '#34d399' : '#fef08a',
                fontSize: '9px',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: 'bold'
              }}>
                {item.estado}
              </span>
            </div>
            <p style={{ color: '#f8fafc', fontSize: '11px', fontWeight: 'bold', margin: '0 0 4px 0' }}>{item.titulo}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '10px' }}>
              <span>Valor: <strong style={{ color: '#34d399' }}>{item.valorEstimado}</strong></span>
              <span>Comprador: <strong style={{ color: '#38bdf8' }}>{item.compradorPotential}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {ventaConfirmada && (
        <div style={{ backgroundColor: '#422006', border: '1px solid #eab308', padding: '10px 14px', borderRadius: '6px', fontSize: '11px', color: '#fef08a', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
          <span>🌱 <strong>Impacto Economía Circular:</strong> 40 Toneladas recicladas (+ $31,500 USD ingresados a caja)</span>
          <span>📜 <strong>Certificado ESG Generado:</strong> Reducción de huella de carbono Scope 3 por reutilización</span>
        </div>
      )}
    </div>
  );
};

export default CircularMarketplaceB2BAI;