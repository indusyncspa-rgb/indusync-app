import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchMetricasFinancieras, solicitarAsignacionIA } from '@/services/apiService';

const SystemContext = createContext();

export function SystemProvider({ children }) {
  const [equipoSeleccionado, setEquipoSeleccionado] = useState('Camión CAEX 04');
  const [estadoSistema, setEstadoSistema] = useState('Operativo - Monitoreo Activo');
  const [alertaActiva, setAlertaActiva] = useState(false);
  const [procesandoIA, setProcesandoIA] = useState(false);
  const [metricas, setMetricas] = useState({ tiempoDetencionEvitado: '0 hrs', ahorroEstimadoUSD: '$0', eficienciaRed: '100%' });
  const [proveedores, setProveedores] = useState([
    { id: 1, nombre: 'Servicios Hidráulicos del Norte SpA', insumo: 'Kit Cilindro CAEX', tiempo: '35 min', estado: 'Certificado', precioUSD: '$12,500' },
    { id: 2, nombre: 'Logística y Repuestos Antofagasta', insumo: 'Filtros de Alta Presión', tiempo: '20 min', estado: 'Certificado', precioUSD: '$3,200' }
  ]);
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const cargarMetricas = async () => {
      const data = await fetchMetricasFinancieras();
      setMetricas(data);
      agregarHistorial('Conexión establecida con el Motor de Métricas Financieras.');
    };
    cargarMetricas();
  }, []);

  const agregarHistorial = (msg) => {
    const horaActual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setHistorial(prev => [{ hora: horaActual, evento: msg }, ...prev]);
  };

  const dispararAlertaPredictiva = async () => {
    setProcesandoIA(true);
    agregarHistorial(`Analizando patrones de telemetría en ${equipoSeleccionado}...`);
    
    const respuesta = await solicitarAsignacionIA(equipoSeleccionado);
    
    setAlertaActiva(true);
    setProcesandoIA(false);
    setEstadoSistema(respuesta.alertaMsg);
    setProveedores(respuesta.proveedoresActualizados);
    setMetricas(prev => ({
      ...prev,
      ahorroEstimadoUSD: `$${(parseInt(prev.ahorroEstimadoUSD.replace(/[^0-9]/g, '')) + 45000).toLocaleString()}`
    }));
    
    agregarHistorial(`IA asignó proveedor óptimo. Ahorro estimado en el evento: ${respuesta.ahorroEventoUSD}`);
  };

  const solicitarRepuestoManual = (insumoNombre) => {
    if (!insumoNombre.trim()) return;
    const nuevoProv = {
      id: Date.now(),
      nombre: 'Proveedor Asignado Express',
      insumo: insumoNombre,
      tiempo: '10 min',
      estado: 'Solicitado',
      precioUSD: 'Cotizando...'
    };
    setProveedores(prev => [nuevoProv, ...prev]);
    agregarHistorial(`Solicitud manual express enviada: "${insumoNombre}"`);
  };

  return (
    <SystemContext.Provider value={{
      equipoSeleccionado,
      setEquipoSeleccionado,
      estadoSistema,
      alertaActiva,
      procesandoIA,
      metricas,
      proveedores,
      historial,
      dispararAlertaPredictiva,
      solicitarRepuestoManual
    }}>
      {children}
    </SystemContext.Provider>
  );
}

export const useSystem = () => useContext(SystemContext);
