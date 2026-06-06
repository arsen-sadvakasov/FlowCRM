// Заглушка для отправки писем
// TODO: Напомнить пользователю о необходимости настройки SMTP сервера (например Resend, SendGrid)

export async function sendPasswordResetEmail(email: string, token: string) {
  console.log(`[EMAIL STUB] Восстановление пароля для ${email}`);
  console.log(`[EMAIL STUB] Ссылка для сброса: http://localhost:3000/reset-password?token=${token}`);
  // Имитация задержки сети
  await new Promise((resolve) => setTimeout(resolve, 500));
  return true;
}
