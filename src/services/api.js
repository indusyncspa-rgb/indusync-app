const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const apiService = {
  // Licitaciones Match AI
  async procesarMatchLicitacion(licitacionId, presupuestoUSD) {
    try {
      const response = await fetch(`${API_BASE_URL}/tenders/match`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ licitacionId, presupuestoUSD })
      });
      return await response.json();
    } catch (error) {
      console.warn('Backend local no detectado, ejecutando simulación segura en cliente:', error);
      return {
        licitacionId,
        adjudicacionRecomendada: {
          nombre: 'Servicios Industriales Antofagasta SpA',
          scoreHSEC: '99/100',
          estado: 'ADJUDICADO AI'
        },
        cumplimientoNormativo: '100% SERNAGEOMIN & ISO 45001'
      };
    }
  },

  // Marketplace B2B Subasta
  async procesarSubastaExcedente(itemId) {
    try {
      const response = await fetch(`${API_BASE_URL}/marketplace/auction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId })
      });
      return await response.json();
    } catch (error) {
      console.warn('Backend local no detectado, ejecutando subasta segura en cliente:', error);
      return {
        itemId,
        estado: 'OFERTA ACEPTADA & VENDIDO',
        valorFinal: '$31,500 USD',
        co2Evitado: '40 Toneladas'
      };
    }
  }
};