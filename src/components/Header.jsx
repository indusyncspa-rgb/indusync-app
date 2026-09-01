import React from 'react';
import InstallAppButton from './InstallAppButton';

const Header = ({ modoEjecutivo, toggleModoEjecutivo }) => {
  const descargarDossier = () => {
    const textoDossier = `
===================================================================
             INDUSYNC® META-OS - DOSSIER EJECUTIVO ENTERPRISE
===================================================================
Fecha de Emisión: 30 de Agosto, 2026
Plataforma: Orquestación Logística & Mantenimiento Predictivo
Propiedad Intelectual: Marca Registrada INAPI Chile (INDUSYNC® SpA)

1. RESUMEN EJECUTIVO
-------------------------------------------------------------------
INDUSYNC® Meta-OS reduce hasta un 85% los tiempos de detención no 
programados en faenas de alta montaña conectando sensores telemétricos 
con redes locales de proveedores certificados en menos de 15 minutos.

2. IMPACTO FINANCIERO ESTIMADO
-------------------------------------------------------------------
- Costo hora promedio de detención: $120,000 USD
- Horas anuales recuperadas proyectadas: 18.5 hrs
- Retorno de Inversión (ROI) Mínimo: $2,775,000 USD
- Toneladas de mineral salvadas: 45,000 Ton

===================================================================
Contacto Comercial: contacto@indusync.com | Antofagasta, Chile
===================================================================
    `;
    const element = document.createElement("a");
    const file = new Blob([textoDossier], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "Dossier_Ejecutivo_INDUSYNC_2026.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', backgroundColor: '#131b29', padding: '16px 24px', borderRadius: '8px', border: '1px solid #1f2d40', flexWrap: 'wrap', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <svg width="48" height="52" viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 10 L180 45 V115 C180 165 100 200 100 200 C100 200 20 165 20 115 V45 L100 10 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="8"/>
          <path d="M100 20 L170 52 V110 C170 155 100 185 100 185 C100 185 30 155 30 110 V52 L100 20 Z" fill="#0f172a" stroke="#0284c7" strokeWidth="3"/>
          <path d="M60 85 L125 85 L145 105 L145 125 L55 125 Z" fill="#f59e0b" stroke="#fbbf24" strokeWidth="3"/>
          <path d="M120 85 L140 105 L120 105 Z" fill="#0f172a"/>
          <circle cx="75" cy="130" r="14" fill="#334155" stroke="#f59e0b" strokeWidth="5"/>
          <circle cx="125" cy="130" r="14" fill="#334155" stroke="#f59e0b" strokeWidth="5"/>
          <path d="M100 130 L100 165 M80 150 L120 150" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round"/>
          <circle cx="100" cy="165" r="4" fill="#38bdf8"/>
          <circle cx="80" cy="150" r="4" fill="#38bdf8"/>
          <circle cx="120" cy="150" r="4" fill="#38bdf8"/>
        </svg>

        <div>
          <h1 style={{ color: '#38bdf8', fontSize: '24px', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
            INDUSYNC<sup style={{ fontSize: '13px', color: '#38bdf8' }}>®</sup> <span style={{ color: '#f8fafc', fontSize: '18px', fontWeight: 'normal' }}>Meta-OS</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '11px', margin: '2px 0 0 0', letterSpacing: '0.5px' }}>
            SOFTWARE IA INDUSTRIAL PARA LA ALTA MINERÍA
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
        <InstallAppButton />

        <button 
          onClick={toggleModoEjecutivo}
          style={{ backgroundColor: modoEjecutivo ? '#f59e0b' : '#334155', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' }}>
          {modoEjecutivo ? '💼 Modo Pitch Activo (C-Level)' : '⚙️ Modo Técnico / Dev'}
        </button>

        <button 
          onClick={descargarDossier}
          style={{ backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
          📄 Descargar Dossier
        </button>
      </div>
    </header>
  );
};

export default Header;