import TelegramBot from 'node-telegram-bot-api';

let botInstance = null;

export function initTelegramBot() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.log('ℹ️ TELEGRAM_BOT_TOKEN not set; Telegram bot disabled');
    return null;
  }

  // Reuse existing instance when hot-reloaded in dev
  if (botInstance) return botInstance;

  const bot = new TelegramBot(token, { polling: true });

  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    // Simple heartbeat reply to confirm bot is running
    if (msg.text && /^\/start/i.test(msg.text)) {
      bot.sendMessage(chatId, 'HabitFlow boti ishga tushdi. Buyruqlar uchun /help yuboring.');
      return;
    }
    if (msg.text && /^\/help/i.test(msg.text)) {
      bot.sendMessage(chatId, 'Mavjud buyruqlar:\n/start - bot holatini tekshirish');
      return;
    }
  });

  bot.on('polling_error', (err) => {
    console.error('Telegram polling error:', err.message || err);
  });

  botInstance = bot;
  console.log('🤖 Telegram bot initialized');
  return botInstance;
}

export function getTelegramBot() {
  return botInstance;
}


