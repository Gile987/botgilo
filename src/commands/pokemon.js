const axios = require("axios");

async function getRandomPokemon() {
  try {
    const randomPokemonId = Math.floor(Math.random() * 898) + 1;
    
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`);
    const { name, sprites } = response.data;

    const spriteUrl = sprites.front_default;

    return { name, spriteUrl };
  } catch (error) {
    console.error("Error fetching random Pokémon:", error);
    throw error;
  }
}

async function pokemonHandler(bot, chatId) {
  try {
    const { name, spriteUrl } = await getRandomPokemon();
    capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

    bot.sendPhoto(chatId, spriteUrl, { caption: `You encountered a wild ${capitalizedName}!` });
  } catch (error) {
    console.error("Error handling Pokémon command:", error);
    bot.sendMessage(chatId, "Sorry, an error occurred while fetching a Pokémon.");
  }
}

module.exports = pokemonHandler;
