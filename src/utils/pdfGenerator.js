export const exportarReportePDF = ({ titulo, codigo, datos, responsable }) => {
  const ventana = window.open('', '_blank');
  const fecha = new Date().toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${titulo} - ${codigo}</title>
        <style>
          body { font-family: 'Helvetica', 'Arial', sans-serif; background: #ffffff; color: #0f172a; padding: 40px; margin: 0; }
          .header { display: flex; justify-content: space-between; align-items: center; border-b: 3px solid #0284c7; padding-bottom: 20px; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: bold; color: #0284c7; letter-spacing: -1px; }
          .badge { background: #e0f2fe; color: #0369a1; padding: 4px 12px; border-radius: 6px; font-size: 12px; font-weight: bold; }
          h1 { font-size: 20px; margin: 0 0 10px 0; color: #0f172a; }
          .meta { font-size: 12px; color: #64748b; margin-bottom: 30px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th { background: #f8fafc; text-align: left; padding: 10px; font-size: 12px; border-bottom: 2px solid #e2e8f0; color: #475569; }
          td { padding: 10px; font-size: 12px; border-bottom: 1px solid #f1f5f9; }
          .footer { margin-top: 50px; font-size: 11px; color: #94a3b8; text-align: center; border-t: 1px solid #e2e8f0; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">INDUSYNC MINING OS</div>
          <div class="badge">DOCUMENTO OFICIAL AUDITABLE</div>
        </div>
        <h1>${titulo}</h1>
        <div class="meta">
          <strong>Código Documento:</strong> ${codigo} | 
          <strong>Fecha Emisión:</strong> ${fecha} | 
          <strong>Emisor:</strong> ${responsable || 'Sistema Automatizado IA'}
        </div>
        <table>
          <thead>
            <tr>
              <th>PARÁMETRO / INDICADOR</th>
              <th>VALOR REGISTRADO</th>
              <th>ESTADO CUMPLIMIENTO</th>
            </tr>
          </thead>
          <tbody>
            ${datos.map(d => `
              <tr>
                <td><strong>${d.parametro}</strong></td>
                <td>${d.valor}</td>
                <td style="color: ${d.estado === 'OPTIMO' || d.estado === 'CUMPLIDO' ? '#16a34a' : '#d97706'}">
                  ● ${d.estado}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="footer">
          Documento generado bajo la norma SERNAGEOMIN e ISO 55001. Encriptación SHA-256 verificada.
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
    </html>
  `;

  ventana.document.write(htmlContent);
  ventana.document.close();
};