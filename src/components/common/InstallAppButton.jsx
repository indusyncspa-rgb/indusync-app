import React, { useState, useEffect } from 'react';

const InstallAppButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [mostrarGuiaIos, setMostrarGuiaIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Detectar si la app ya se ejecuta instalada (modo standalone)
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsStandalone(true);
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    // Si ya está corriendo como App instalada
    if (isStandalone) {
      alert('¡INDUSYNC® ya está instalada y ejecutándose en tu dispositivo!');
      return;
    }

    // Caso Android / Chrome / Windows / Edge
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
      return;
    }

    // Detectar iOS / Safari
    const isIos = /iPhone|iPad|iPod/.test(navigator.userAgent);
    if (isIos) {
      setMostrarGuiaIos(true);
    } else {
      alert('Para instalar: abre el menú de tu navegador y selecciona "Agregar a la pantalla de inicio" o "Instalar aplicación".');
    }
  };

  if (isStandalone) {
    return (
      <span style={{ backgroundColor: '#10b98122', color: '#34d399', border: '1px solid #10b981', padding: '8px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
        ✅ App Instalada
      </span>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <button 
        onClick={handleInstallClick}
        style={{ 
          backgroundColor: '#10b981', 
          color: '#fff', 
          border: 'none', 
          padding: '8px 14px', 
          borderRadius: '6px', 
          fontSize: '12px', 
          fontWeight: 'bold', 
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
          transition: 'all 0.2s'
        }}>
        📱 Descargar App
      </button>

      {/* Modal / Guía de Instalación para iOS (iPhone/iPad) */}
      {mostrarGuiaIos && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          zIndex: 9999,
          display: 'flex',
          justify: 'center',
          alignItems: 'center',
          padding: '20px'
        }}>
          <div style={{ backgroundColor: '#131b29', border: '1px solid #38bdf8', padding: '24px', borderRadius: '12px', maxWidth: '360px', textAlign: 'center' }}>
            <h3 style={{ color: '#38bdf8', marginTop: 0 }}>📲 Instalar en iPhone / iPad</h3>
            <p style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.5' }}>
              1. Toca el botón <strong>Compartir</strong> <span style={{ fontSize: '16px' }}>⎋</span> en la barra inferior de Safari.<br/><br/>
              2. Selecciona <strong>"Agregar a Inicio"</strong> <span style={{ fontSize: '16px' }}>➕</span>.<br/><br/>
              3. ¡Listo! Tendrás el acceso directo con el icono oficial de INDUSYNC®.
            </p>
            <button 
              onClick={() => setMostrarGuiaIos(false)}
              style={{ backgroundColor: '#38bdf8', color: '#090d16', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', marginTop: '12px', cursor: 'pointer' }}>
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstallAppButton;
