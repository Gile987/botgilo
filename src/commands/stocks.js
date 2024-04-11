const axios = require("axios");
const { alphaVantageApiKey } = require("../../config");

const API_URL_BASE = "https://www.alphavantage.co/query";

async function stockHandler(bot, chatId, symbol) {
  try {
    const response = await axios.get(
      `${API_URL_BASE}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${alphaVantageApiKey}`
    );

    const data = response.data["Global Quote"];
    if (!data || !data["01. symbol"] || !data["05. price"] || !data["09. change"] || !data["06. volume"] || !data["07. latest trading day"]) {
      throw new Error("Stock data not found or incomplete");
    }

    const name = data["01. symbol"];
    const price = data["05. price"];
    const change = data["09. change"];
    const volume = data["06. volume"];
    const latestTradingDay = data["07. latest trading day"];

    const message = `Stock: ${name}\nPrice: ${price}\nChange: ${change}\nVolume: ${volume}\nLatest Trading Day: ${latestTradingDay}`;

    bot.sendMessage(chatId, message);
  } catch (error) {
    console.error("Error fetching stock data:", error);
    bot.sendMessage(
      chatId,
      "Sorry, an error occurred while fetching stock data."
    );
  }
}

module.exports = stockHandler;