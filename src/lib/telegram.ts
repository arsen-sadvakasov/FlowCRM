export async function sendTelegramNotification(message: string) {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn("Telegram уведомление пропущено: не заданы TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID");
    return;
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      console.error("Ошибка при отправке Telegram уведомления:", await response.text());
    }
  } catch (error) {
    console.error("Ошибка сети при отправке Telegram уведомления:", error);
  }
}
