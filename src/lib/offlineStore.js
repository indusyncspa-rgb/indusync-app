// src/lib/offlineStore.js
// Motor de Cola Offline e IndexedDB / LocalStorage para INDUSYNC Meta-OS

const STORAGE_KEYS = {
  PENDING_SYNC: 'indusync_pending_sync_queue',
  CACHE_PREFIX: 'indusync_cache_',
  USER_SESSION: 'indusync_offline_session',
};

export const offlineStore = {
  // Guardar un registro pendiente de sincronizar cuando no hay señal
  savePendingAction: (table, actionType, payload) => {
    try {
      const currentQueue = offlineStore.getPendingQueue();
      const newItem = {
        id: `offline_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        table,
        actionType, // 'INSERT' | 'UPDATE' | 'DELETE'
        payload,
        createdAt: new Date().toISOString(),
        attempts: 0,
      };

      currentQueue.push(newItem);
      localStorage.setItem(STORAGE_KEYS.PENDING_SYNC, JSON.stringify(currentQueue));
      console.log('📦 [OfflineStore] Acción guardada en la cola local:', newItem);
      return newItem;
    } catch (error) {
      console.error('❌ Error al guardar en cola offline:', error);
      return null;
    }
  },

  // Obtener toda la cola pendiente
  getPendingQueue: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PENDING_SYNC);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },

  // Eliminar un ítem ya sincronizado con exito
  removePendingItem: (id) => {
    try {
      const currentQueue = offlineStore.getPendingQueue();
      const updated = currentQueue.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEYS.PENDING_SYNC, JSON.stringify(updated));
    } catch (e) {
      console.error('❌ Error actualizando cola offline:', e);
    }
  },

  // Guardar datos en caché para lectura rápida sin internet (Ej: Lista de Palas, Usuarios)
  cacheData: (key, data) => {
    try {
      localStorage.setItem(`${STORAGE_KEYS.CACHE_PREFIX}${key}`, JSON.stringify({
        timestamp: Date.now(),
        data,
      }));
    } catch (e) {
      console.error('Error guardando caché:', e);
    }
  },

  // Leer datos cacheados
  getCachedData: (key) => {
    try {
      const raw = localStorage.getItem(`${STORAGE_KEYS.CACHE_PREFIX}${key}`);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed.data;
    } catch (e) {
      return null;
    }
  },
};