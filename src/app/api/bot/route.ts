import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // Заглушка для будущего Telegram бота
  // Сюда будут приходить вебхуки от Telegram (Update objects)
  try {
    const body = await req.json();
    console.log('[BOT API] Получено сообщение от Telegram:', body);
    
    // TODO: В будущем здесь будет:
    // 1. Проверка подписи/секрета вебхука
    // 2. Обработка команд бота (например, /start, /tasks)
    // 3. Вызовы к Prisma (создание клиентов, смена статуса сделок)
    // 4. Отправка ответов через API Telegram
    
    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
