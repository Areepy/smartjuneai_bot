import TelegramBot from "node-telegram-bot-api";
import fetch from "node-fetch";

// 🔑 MUHIMMAN KEYS (za mu saka a Render later)
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const JUNE_API_KEY = process.env.JUNE_API_KEY;

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

bot.on("message", async (msg) => {

  const chatId = msg.chat.id;
  const userText = msg.text;

  try {

    const res = await fetch("https://api.june.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${JUNE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are Smart Hustle AI. Help users with money, study, and business ideas."
          },
          {
            role: "user",
            content: userText
          }
        ]
      })
    });

    const data = await res.json();

    const reply = data?.choices?.[0]?.message?.content || "No response";

    bot.sendMessage(chatId, reply);

  } catch (err) {
    console.log(err);
    bot.sendMessage(chatId, "Error connecting to AI");
  }
});
