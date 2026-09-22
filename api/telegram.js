export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).send("GameVault bot is running");
  }

  try {
    const update = req.body;

    if (update.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text;

      if (text === "/start") {
        const response = await fetch(
          `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              chat_id: chatId,
              text: "🎮 Добро пожаловать в GameVault!\n\nЗдесь ты можешь покупать игровую валюту, смотреть баланс и свои заказы.",
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: "🛒 Открыть магазин",
                      web_app: {
                        url: "https://gamevault-mini-app-rose.vercel.app"
                      }
                    }
                  ]
                ]
              }
            })
          }
        );

        const data = await response.json();

        return res.status(200).json(data);
      }
    }

    return res.status(200).send("OK");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Bot error" });
  }
}
