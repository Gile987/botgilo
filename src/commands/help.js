function helpHandler(bot, chatId) {
  const message = `
    Here are the available commands:

    1. /help: Display this help message.
    2. /weather <city>: Get the current weather for the specified city.
    3. /pokemon: Get a random Pokémon.
    4. /stocks <stock_symbol>: Get the current stock price for the specified stock symbol.
  `;
  bot.sendMessage(chatId, message);
}

module.exports = helpHandler;
