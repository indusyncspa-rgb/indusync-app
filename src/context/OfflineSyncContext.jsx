// src/context/OfflineSyncContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { offlineStore } from '../lib/offlineStore';
import { supabase } from '../lib/supabase';

const OfflineSyncContext = createContext();

export const OfflineSyncProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingCount, setPendingCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');

  // Actualizar contador de la cola
  const updatePendingCount = () => {
    const queue = offlineStore.getPendingQueue();
    setPendingCount(queue.length);
  };

  // Motor de Sincronización Automática con la Nube
  const processOfflineQueue = async () => {
    if (!navigator.onLine || isSyncing) return;

    const queue = offlineStore.getPendingQueue();
    if (queue.length === 0) return;

    setIsSyncing(true);
    setSyncMessage(`Sincronizando ${queue.length} registros con Supabase...`);

    for (const item of queue) {
      try {
        if (item.actionType === 'INSERT') {
          const { error } = await supabase.from(item.table).insert([item.payload]);
          if (!error) {
            offlineStore.removePendingItem(item.id);
          }
        }
      } catch (err) {
        console.warn(`⏳ Error temporal sincronizando item ${item.id}, reintentando luego:`, err);
      }
    }

    updatePendingCount();
    setIsSyncing(false);
    setSyncMessage(' Sincronización completada');
    setTimeout(() => setSyncMessage(''), 3000);
  };

  useEffect(() => {
    updatePendingCount();

    const handleOnline = () => {
      setIsOnline(true);
      processOfflineQueue();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Intento periódico de sincronización cada 30 segundos si hay red
    const interval = setInterval(() => {
      if (navigator.onLine) {
        processOfflineQueue();
      }
    }, 30000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  return (
    <OfflineSyncContext.Provider
      value={{
        isOnline,
        pendingCount,
        isSyncing,
        syncMessage,
        saveOfflineAction: (table, actionType, payload) => {
          const result = offlineStore.savePendingAction(table, actionType, payload);
          updatePendingCount();
          if (navigator.onLine) {
            processOfflineQueue();
          }
          return result;
        },
        forceSync: processOfflineQueue,
      }}
    >
      {children}
      
      {/* BANNER FLOTANTE DE ESTADO RED / OFFLINE EN TERRENO */}
      {!isOnline && (
        <div className="fixed bottom-4 right-4 z-[9999] bg-amber-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-3 border border-amber-300 text-xs font-mono animate-bounce">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-950 animate-ping" />
          <span>📡 MODO SUBTERRÁNEO / OFF-GRID ({pendingCount} PENDIENTES)</span>
        </div>
      )}

      {isSyncing && (
        <div className="fixed bottom-4 right-4 z-[9999] bg-cyan-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-3 border border-cyan-300 text-xs font-mono">
          <span className="animate-spin text-sm">🔄</span>
          <span>{syncMessage}</span>
        </div>
      )}
    </OfflineSyncContext.Provider>
  );
};

export const useOfflineSync = () => useContext(OfflineSyncContext);