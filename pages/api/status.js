// Arquivo: pages/api/status.js

// Base de dados em memória
const DB = {
  'loja-exemplo': {
    config: {
      bot_name: 'Assistente da Loja',
      operation_mode: 'hybrid',
      ai_temperature: 0.7,
      token_limit: 150,
      is_active: true
    },
    messages: {
      welcome_message: 'Olá! 👋 Bem-vindo ao atendimento da Bora Atender! Como posso ajudar você hoje?',
      menu_message: '📋 Menu de Opções:\n\n🔸 1️⃣ Produtos e Serviços\n🔸 2️⃣ Suporte Técnico\n🔸 3️⃣ Falar com Vendas\n🔸 4️⃣ Horário de Funcionamento\n🔸 5️⃣ Atendente Humano\n\n🔄 0️⃣ Ver este menu novamente\n\nDigite o número da opção ou faça sua pergunta diretamente!',
      transfer_message: 'Vou conectar você com um atendente...',
      offline_message: 'Estamos fechados. Responderemos em breve!'
    }
  }
};

export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const response = {
    status: 'active',
    message: '🚀 Bora Atender API funcionando no Vercel!',
    timestamp: new Date().toISOString(),
    companies: Object.keys(DB).length,
    version: '5.0.0',
    platform: 'vercel'
  };

  console.log('Status endpoint called:', response);

  res.status(200).json(response);
}
