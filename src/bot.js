const TelegramBot = require('node-telegram-bot-api');
const { token } = require('../config');
const { registerCommand, registerMessageHandler, dispatchCommand } = require('./dispatcher');
const helpHandler = require('./commands/help');
const weatherHandler = require('./commands/weather');
const helloHandler = require('./messages/hello');


const bot = new TelegramBot(token, {polling: true});

// register commands
registerCommand('help', helpHandler);
registerCommand('weather', weatherHandler);

// register message handlers
registerMessageHandler(helloHandler);

bot.on('message', (msg) => {
  dispatchCommand(bot, msg);
});