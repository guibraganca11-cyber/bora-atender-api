// Arquivo: pages/api/messages.js

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

    console.log(`GET Messages para: ${company_id}`);

    // Criar empresa se não existir
    if (!DB[company_id]) {
      DB[company_id] = {
        messages: {
          welcome_message: 'Olá! 👋 Como posso ajudar você hoje?',
          menu_message: '📋 Menu:\n1️⃣ Produtos\n2️⃣ Suporte\n3️⃣ Vendas',
          transfer_message: 'Vou conectar você com um atendente...',
          offline_message: 'Estamos fechados. Responderemos em breve!'
        }
      };
    }

    res.status(200).json({
      success: true,
      data: DB[company_id].messages,
      company_id: company_id
    });
    return;
  }

  if (req.method === 'POST') {
    const { company_id = 'loja-exemplo', messages = {} } = req.body;

    console.log(`POST Messages para: ${company_id}`, messages);

    if (!DB[company_id]) {
      DB[company_id] = { messages: {} };
    }

    // Atualizar mensagens
    DB[company_id].messages = { ...DB[company_id].messages, ...messages };

    res.status(200).json({
      success: true,
      message: 'Mensagens salvas!',
      company_id: company_id
    });
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
