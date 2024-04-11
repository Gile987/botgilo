const axios = require("axios");
const { weatherApiKey } = require("../../config");

const KELVIN_TO_CELSIUS = 273.15;
const CUTE_EMOJIS = [
  "🐻",
  "🐱",
  "🐶",
  "🐼",
  "🐰",
  "🦄",
  "🌸",
  "🌈",
  "💖",
  "✨",
  "🐞",
];

async function weatherHandler(bot, chatId, args) {
  try {
    const city = args.join(' ');
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}`
    );

    const { main, weather } = response.data;

    if (!weather || weather.length === 0) {
      throw new Error("Weather data is not available");
    }

    const weatherDescription = weather[0].description;
    const temperature = main.temp;
    const formattedTemperature = Math.round(temperature - KELVIN_TO_CELSIUS);
    const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);
    const randomEmoji = CUTE_EMOJIS[Math.floor(Math.random() * CUTE_EMOJIS.length)];
    const message = `${randomEmoji} Weather in ${capitalizedCity}: ${weatherDescription}. Temperature: ${formattedTemperature}°C. ${randomEmoji}`;

    bot.sendMessage(chatId, message);
  } catch (error) {
    console.error("Error fetching weather:", error);
    bot.sendMessage(
      chatId,
      "Sorry, an error occurred while fetching the weather."
    );
  }
}

module.exports = weatherHandler;