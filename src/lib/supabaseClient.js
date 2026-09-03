import { createClient } from '@supabase/supabase-js';

// Si no existen variables de entorno, se usa un fallback seguro para desarrollo
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo-indusync.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key-123456';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper para sincronizar eventos OT a la base de datos
export const registrarEventoOT = async (evento) => {
  try {
    const { data, error } = await supabase
      .from('telemetria_events')
      .insert([{ ...evento, timestamp: new Date().toISOString() }]);
    
    if (error) console.warn('Supabase Offline / Modo Mock:', error.message);
    return data;
  } catch (err) {
    console.warn('Ejecutando en modo local sin backend remoto.');
  }
};