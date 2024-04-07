const axios = require('axios');
const { weatherApiKey } = require('../../config');

async function weatherHandler(bot, chatId, city) {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}`);

    const { main, weather } = response.data;

    const weatherDescription = weather[0].description;
    const temperature = main.temp;
    const formattedTemperature = Math.round(temperature - 273.15);
    const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1)
    const message = `Weather in ${capitalizedCity}: ${weatherDescription}. Temperature: ${formattedTemperature}°C`;
    
    bot.sendMessage(chatId, message);
  } catch (error) {
    console.error('Error fetching weather:', error);
    bot.sendMessage(chatId, 'Sorry, an error occurred while fetching the weather.');
  }
}

module.exports = weatherHandler;
