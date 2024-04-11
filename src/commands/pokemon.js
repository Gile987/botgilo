const axios = require("axios");

const MAX_POKEMON_NUMBER = 898;

async function getRandomPokemon() {
  try {
    const randomPokemonId = Math.floor(Math.random() * MAX_POKEMON_NUMBER) + 1;
    
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`);
    const { name, sprites } = response.data;

    if (!sprites || !sprites.front_default) {
      throw new Error("Sprite data not found");
    }

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
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

    bot.sendPhoto(chatId, spriteUrl, { caption: `You encountered a wild ${capitalizedName}!` });
  } catch (error) {
    console.error("Error handling Pokémon command:", error);
    bot.sendMessage(chatId, "Sorry, an error occurred while fetching a Pokémon.");
  }
}

module.exports = pokemonHandler;