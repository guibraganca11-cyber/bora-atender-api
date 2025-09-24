// Arquivo: pages/api/logs.js

// Armazenamento em memória para logs
let LOGS = [];

export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    const { company_id, limit = '50' } = req.query;

    console.log(`GET Logs para: ${company_id || 'todas'}`);

    let filteredLogs = LOGS;

    // Filtrar por empresa se especificado
    if (company_id) {
      filteredLogs = LOGS.filter(log => log.company_id === company_id);
    }

    // Aplicar limite
    filteredLogs = filteredLogs.slice(0, parseInt(limit));

    // Se não há logs, criar alguns de exemplo
    if (filteredLogs.length === 0) {
      const mockLogs = [
        {
          id: Date.now(),
          company_id: company_id || 'sistema',
          activity_type: 'api_start',
          message: 'API Bora Atender iniciada com sucesso',
          created_at: new Date().toISOString(),
          metadata: { platform: 'vercel' }
        }
      ];
      
      // Adicionar aos logs
      LOGS.push(...mockLogs);
      filteredLogs = mockLogs;
    }

    res.status(200).json({
      success: true,
      data: filteredLogs,
      total: filteredLogs.length
    });
    return;
  }

  if (req.method === 'POST') {
    const { company_id, activity_type, message, metadata = {} } = req.body;

    const log = {
      id: Date.now(),
      company_id,
      activity_type,
      message,
      metadata,
      created_at: new Date().toISOString()
    };

    LOGS.unshift(log);

    // Manter apenas os últimos 1000 logs
    if (LOGS.length > 1000) {
      LOGS = LOGS.slice(0, 1000);
    }

    console.log('Log criado:', log);

    res.status(200).json({
      success: true,
      message: 'Log registrado',
      log_id: log.id
    });
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
