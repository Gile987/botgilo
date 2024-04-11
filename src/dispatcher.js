const commandRegistry = new Map();
const messageHandlers = [];

function registerCommand(command, handler) {
  commandRegistry.set(command, handler);
}

function registerMessageHandler(handler) {
  messageHandlers.push(handler);
}

function dispatchCommand(bot, msg) {
  const text = msg.text;
  const chatId = msg.chat.id;

  // Check if the message starts with "/"
  if (text.startsWith('/')) {
    const [command, ...args] = text.substring(1).split(' ');
    const handler = commandRegistry.get(command);

    // If command exists, handle it
    if (handler) {
      handler(bot, chatId, args);
      return true;
    } else {
      // If command doesn't exist, display unknown command error
      bot.sendMessage(chatId, 'Unknown command 😞');
      return false;
    }
  } else {
    // Check if the message has a handler
    const hasMessageHandler = messageHandlers.some(handler => handler(bot, chatId, text));

    // If message has no handler, do nothing
    if (!hasMessageHandler) {
      return false;
    }

    return true;
  }
}

module.exports = {
  registerCommand,
  registerMessageHandler,
  dispatchCommand
};