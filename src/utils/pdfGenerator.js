import jsPDF from 'jspdf';

export const generateDossierPDF = () => {
  const doc = new jsPDF();

  // Encabezado Meta-OS
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.text("INDUSYNC® Meta-OS", 14, 20);
  doc.setFontSize(10);
  doc.text("Dossier Ejecutivo de Innovación & Continuidad Operacional Minera", 14, 30);

  // Sección 1
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(13);
  doc.text("1. Resumen Ejecutivo & Propuesta de Valor", 14, 55);
  
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  const text1 = "INDUSYNC Meta-OS es el sistema operativo con IA diseñado para la alta minería que elimina la latencia entre la telemetría predictiva de planta/mina y la ejecución de órdenes de trabajo en SAP PM y la cadena de suministro B2B.";
  doc.text(doc.splitTextToSize(text1, 180), 14, 65);

  // Sección 2
  doc.setFontSize(13);
  doc.setTextColor(30, 41, 59);
  doc.text("2. Módulos Clave de Impacto EBITDA", 14, 90);
  
  const text2 = "- Gemelo Digital & Motor Predictivo: Cero detenciones catastroficas P0 en Molinos SAG.\n- Despacho Autónomo IA: Reducción de tiempos de cola en Palas y CAEX.\n- Conector OPC UA Zero-Trust: Integración segura directa con DCS/SCADA industriales.\n- Gestión Hídrica & ESG: Cumplimiento automatizado de estándares GISTM y SERNAGEOMIN.";
  doc.text(doc.splitTextToSize(text2, 180), 14, 100);

  // Pie de página
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text("Propiedad Industrial Registrada INAPI N° 1508687 - INDUSYNC SpA (Chile)", 14, 280);

  // Descarga el archivo de forma limpia
  doc.save("Dossier_Ejecutivo_Indusync_MetaOS.pdf");
};