import React, { useState, useEffect } from 'react';
import SalfaGeoMapModal from './SalfaGeoMapModal';

export default function SalfaOmniCommand() {
  const [capitalProtegido, setCapitalProtegido] = useState(124500000);
  const [vehiculos, setVehiculos] = useState([
    {
      id: 'S-4092', patente: 'DR-XZ91', estado: 'CRÍTICO', velocidad: 0,
      conexion: 'Starlink Híbrido', bateria: 'BMS Litio (Principal Cortada)', sabotaje: true, latencia: '42ms'
    },
    {
      id: 'S-4105', patente: 'PZ-LK22', estado: 'OPERATIVO', velocidad: 85,
      conexion: '4G Entel', bateria: 'Normal (13.8V)', sabotaje: false, latencia: '28ms'
    },
    {
      id: 'S-3850', patente: 'KL-MN34', estado: 'OPERATIVO', velocidad: 112,
      conexion: '4G Entel', bateria: 'Normal (14.1V)', sabotaje: false, latencia: '35ms'
    }
  ]);

  const [procesando, setProcesando] = useState(null);
  const [simulandoAtaque, setSimulandoAtaque] = useState(false);
  const [modalMapaPatente, setModalMapaPatente] = useState(null); // Estado para abrir el mapa interactivo

  // Efecto visual para el contador de ROI
  useEffect(() => {
    const interval = setInterval(() => {
      setCapitalProtegido(prev => prev + Math.floor(Math.random() * 5000));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleArmarInterlock = (id) => {
    setProcesando(id);
    setTimeout(() => {
      setVehiculos(prev => prev.map(v => 
        v.id === id ? { ...v, estado: 'ARMADO (ESPERANDO < 15km/h)', latencia: '12ms' } : v
      ));
      setProcesando(null);
    }, 1500);
  };

  const handleDisparoMosfet = (id) => {
    setProcesando(id);
    setTimeout(() => {
      setVehiculos(prev => prev.map(v => 
        v.id === id ? { ...v, estado: 'MOTOR INMOVILIZADO', bateria: 'Corte Relé Exitoso', latencia: '0ms' } : v
      ));
      setProcesando(null);
    }, 2000);
  };

  // BOTÓN MÁGICO PARA DEMOSTRACIONES (Sandbox Mode)
  const ejecutarSimulacionSabotaje = () => {
    setSimulandoAtaque(true);
    
    // Paso 1: Falla de red normal
    setTimeout(() => {
      setVehiculos(prev => [
        {
          id: 'S-9999 (DEMO)', patente: 'XX-YY99', estado: 'ZONA SOMBRA DETECTADA', velocidad: 105,
          conexion: 'Conmutando a Satélite...', bateria: 'Normal (14.2V)', sabotaje: false, latencia: '999ms'
        },
        ...prev
      ]);
    }, 1000);

    // Paso 2: Corte de energía
    setTimeout(() => {
      setVehiculos(prev => prev.map(v => 
        v.id === 'S-9999 (DEMO)' ? { ...v, estado: 'SABOTAJE EN CURSO', bateria: 'CORTE PRINCIPAL - BMS LITIO ACTIVA', conexion: 'Starlink Híbrido (Emergencia)', sabotaje: true, latencia: '12ms' } : v
      ));
    }, 3000);

    // Paso 3: Disminución de velocidad para Interlock
    setTimeout(() => {
      setVehiculos(prev => prev.map(v => 
        v.id === 'S-9999 (DEMO)' ? { ...v, estado: 'SABOTAJE CONFIRMADO', velocidad: 12 } : v
      ));
      setSimulandoAtaque(false);
    }, 5500);
  };

  return (
    <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl font-sans text-slate-100 space-y-6">
      
      {/* MODAL DE MAPA DE GEOLOCALIZACIÓN ZONAS ROJAS */}
      {modalMapaPatente && (
        <SalfaGeoMapModal 
          patente={modalMapaPatente} 
          onClose={() => setModalMapaPatente(null)} 
        />
      )}

      {/* CABECERA Y MÉTRICA DE ROI */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-wider flex items-center gap-2">
            🛡️ SALFA <span className="text-cyan-400">FLEET SHIELD (OMNI-COMMAND)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Orquestación Híbrida: MIGPS + Caja Negra InduSync (Edge AI)</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-emerald-950/40 border border-emerald-800/50 px-4 py-2 rounded-xl flex flex-col items-end">
            <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Capital Protegido (Mes)</span>
            <span className="text-lg font-black font-mono text-emerald-400">
              ${capitalProtegido.toLocaleString('es-CL')} <span className="text-xs text-emerald-600">CLP</span>
            </span>
          </div>

          <button 
            onClick={ejecutarSimulacionSabotaje}
            disabled={simulandoAtaque}
            className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/40 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition flex items-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.1)]"
            title="Sandbox Mode: Simular ataque en ruta en tiempo real"
          >
            {simulandoAtaque ? '⏳ SIMULANDO ATAQUE...' : '⚡ SIMULADOR DE SABOTAJE'}
          </button>
        </div>
      </div>

      {/* GRILLA DE VEHÍCULOS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {vehiculos.map((v) => {
          const isProcesando = procesando === v.id;
          const isInmovilizado = v.estado === 'MOTOR INMOVILIZADO';
          const isArmado = v.estado.includes('ARMADO');

          return (
            <div key={v.id} className={`p-5 rounded-xl border transition-all duration-500 relative overflow-hidden ${
              isInmovilizado ? 'bg-slate-950/80 border-cyan-800' :
              v.sabotaje ? 'bg-red-950/20 border-red-800/50' : 
              'bg-slate-950/50 border-slate-800'
            }`}>
              
              {/* Efecto visual de fondo para demo */}
              {v.id === 'S-9999 (DEMO)' && !isInmovilizado && (
                <div className="absolute inset-0 bg-amber-500/5 animate-pulse pointer-events-none" />
              )}

              <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                  <h3 className={`text-lg font-black font-mono cursor-pointer hover:underline flex items-center gap-2 ${isInmovilizado ? 'text-cyan-500' : v.id === 'S-9999 (DEMO)' ? 'text-amber-400' : 'text-slate-100'}`}
                      onClick={() => setModalMapaPatente(v.patente)}
                      title="Clic para ver mapa de calor y ruta clandestina"
                  >
                    {v.id} | {v.patente} <span className="text-xs">🗺️</span>
                  </h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded mt-1 inline-block uppercase ${
                    isInmovilizado ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' :
                    v.sabotaje ? 'bg-red-500/20 text-red-400' : 
                    isArmado ? 'bg-amber-500/20 text-amber-400' :
                    'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {v.estado}
                  </span>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-black font-mono ${isInmovilizado ? 'text-slate-600' : v.id === 'S-9999 (DEMO)' && v.velocidad < 15 ? 'text-red-400 animate-pulse' : 'text-cyan-400'}`}>
                    {v.velocidad} <span className="text-xs text-slate-500">km/h</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">Latencia: {v.latencia}</div>
                </div>
              </div>

              <div className="space-y-2 text-xs font-mono mb-4 relative z-10">
                <div className="flex justify-between">
                  <span className="text-slate-500">Enlace Red:</span>
                  <span className={v.sabotaje && !isInmovilizado ? 'text-amber-400 font-bold' : 'text-slate-300'}>{v.conexion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Energía / Bus CAN:</span>
                  <span className={v.sabotaje || isInmovilizado ? 'text-red-400 font-bold' : 'text-slate-300'}>{v.bateria}</span>
                </div>
              </div>

              <div className="mt-auto relative z-10 space-y-2">
                {/* BOTÓN RÁPIDO PARA ABRIR MAPA DE ZONA ROJA */}
                <button
                  onClick={() => setModalMapaPatente(v.patente)}
                  className="w-full bg-slate-800/80 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 font-bold py-1.5 rounded-lg text-[9px] uppercase tracking-wider transition flex items-center justify-center gap-1.5"
                >
                  🗺️ Ver Mapa de Calor / Ruta Clandestina
                </button>

                {v.sabotaje ? (
                  <div className="space-y-3">
                    {!isInmovilizado && (
                      <div className="text-[10px] text-red-300 bg-red-950/40 p-2 rounded border border-red-900/50 animate-pulse">
                        ⚠️ SABOTAJE DETECTADO (Corte CAN Bus). Modo Pánico Edge Activado.
                      </div>
                    )}

                    {/* BOTONES MULTICANAL (Disuasión y Bloqueo Legal) */}
                    {!isInmovilizado && (
                      <div className="grid grid-cols-2 gap-2">
                        <button 
                          className="bg-amber-600/20 hover:bg-amber-600/40 text-amber-400 border border-amber-600/30 font-bold py-2 rounded-lg text-[9px] uppercase transition"
                          title="Activa baliza y bocina codificada remotamente"
                        >
                          📢 Disuasión Táctica
                        </button>
                        <button 
                          className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-bold py-2 rounded-lg text-[9px] uppercase transition flex items-center justify-center gap-1"
                          title="Genera reporte inmutable para prevención de riesgos y Carabineros"
                        >
                          📄 Acta Legal (Sernageomin)
                        </button>
                      </div>
                    )}

                    <button 
                      onClick={() => handleDisparoMosfet(v.id)}
                      disabled={isProcesando || isInmovilizado || (v.velocidad > 15 && v.id === 'S-9999 (DEMO)')}
                      className={`w-full font-black py-2.5 rounded-lg text-[10px] uppercase tracking-widest transition flex justify-center items-center gap-2 ${
                        isInmovilizado ? 'bg-slate-900 text-cyan-600 border border-cyan-900 cursor-not-allowed' :
                        (v.velocidad > 15 && v.id === 'S-9999 (DEMO)') ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' :
                        isProcesando ? 'bg-amber-600 text-white' : 
                        'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                      }`}
                    >
                      {isInmovilizado ? '🔒 VEHÍCULO NEUTRALIZADO' : 
                       (v.velocidad > 15 && v.id === 'S-9999 (DEMO)') ? '⚠️ ESPERANDO VEL. < 15 KM/H' :
                       isProcesando ? 'Inyectando Comando CAN...' : 
                       'Ejecutar Disparo (Bloqueo Total)'}
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleArmarInterlock(v.id)}
                    disabled={isProcesando || isArmado || v.velocidad === 0}
                    className={`w-full font-bold py-2.5 rounded-lg text-[10px] uppercase tracking-widest transition border ${
                      isArmado ? 'bg-amber-900/30 text-amber-500 border-amber-800 cursor-not-allowed' :
                      v.velocidad === 0 ? 'bg-slate-900 text-slate-600 border-slate-800 cursor-not-allowed' :
                      isProcesando ? 'bg-slate-700 text-slate-300' :
                      'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                    }`}
                  >
                    {isArmado ? '🛡️ INTERLOCK ARMADO' :
                     v.velocidad === 0 ? 'ESTACIONADO (NO REQUIERE ARMAR)' :
                     isProcesando ? 'Estableciendo Enlace TCP...' : 
                     'Armar Safety Interlock'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}