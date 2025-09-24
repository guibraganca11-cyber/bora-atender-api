// Arquivo: pages/api/config.js

// Simulação de banco de dados em memória
let DB = {};

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
    const { company_id = 'loja-exemplo' } = req.query;

    console.log(`GET Config para: ${company_id}`);

    // Criar empresa se não existir
    if (!DB[company_id]) {
      DB[company_id] = {
        config: {
          bot_name: `Assistente ${company_id}`,
          operation_mode: 'hybrid',
          ai_temperature: 0.7,
          token_limit: 150,
          is_active: true
        }
      };
    }

    res.status(200).json({
      success: true,
      data: DB[company_id].config,
      company_id: company_id
    });
    return;
  }

  if (req.method === 'POST') {
    const { company_id = 'loja-exemplo', config = {} } = req.body;

    console.log(`POST Config para: ${company_id}`, config);

    if (!DB[company_id]) {
      DB[company_id] = { config: {} };
    }

    // Atualizar configuração
    DB[company_id].config = { ...DB[company_id].config, ...config };

    res.status(200).json({
      success: true,
      message: 'Configuração salva!',
      company_id: company_id
    });
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
