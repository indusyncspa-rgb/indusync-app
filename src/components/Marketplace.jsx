import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';

export default function Marketplace() {
  const { proveedores, solicitarRepuestoManual } = useSystem();
  const [nuevoInsumo, setNuevoInsumo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    solicitarRepuestoManual(nuevoInsumo);
    setNuevoInsumo('');
  };

  return (
    <section style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
      <h2 style={{ fontSize: '16px', color: '#f1f5f9', marginTop: 0, marginBottom: '15px' }}>Orquestación Dinámica de Proveedores Locales</h2>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #475569', color: '#94a3b8' }}>
            <th style={{ padding: '10px' }}>Proveedor</th>
            <th style={{ padding: '10px' }}>Insumo / Servicio</th>
            <th style={{ padding: '10px' }}>ETA</th>
            <th style={{ padding: '10px' }}>Estado IA</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((prov) => (
            <tr key={prov.id} style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '10px', fontWeight: 'bold' }}>{prov.nombre}</td>
              <td style={{ padding: '10px', color: '#94a3b8' }}>{prov.insumo}</td>
              <td style={{ padding: '10px', color: '#38bdf8', fontWeight: 'bold' }}>{prov.tiempo}</td>
              <td style={{ padding: '10px', color: prov.estado.includes('Asignado') ? '#ef4444' : '#10b981', fontWeight: 'bold' }}>{prov.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleSubmit} style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Ingresar requerimiento manual express (ej: Manguera de alta presión)..." 
          value={nuevoInsumo}
          onChange={(e) => setNuevoInsumo(e.target.value)}
          style={{ flex: 1, padding: '10px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #475569', borderRadius: '6px', fontSize: '12px', outline: 'none' }}
        />
        <button type="submit" style={{ padding: '10px 16px', backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>
          + Solicitar
        </button>
      </form>
    </section>
  );
}