function helpHandler(bot, chatId) {
  const message = `
    Here are the available commands:

    1. /help: Display this help message.
    2. /weather <city>: Get the current weather for the specified city.
  `;
  bot.sendMessage(chatId, message);
}

module.exports = helpHandler;
