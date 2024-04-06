function helloHandler(bot, chatId, message) {
  const lowerCaseMessage = message.toLowerCase();
  const greetingPattern = /\b(hello|hi|zdravo|cao)\b/;
  
  if (greetingPattern.test(lowerCaseMessage)) {
    bot.sendMessage(chatId, 'Zdravo, ja sam G1L3 bot :3');
    return true;
  }
  
  return false;
}

module.exports = helloHandler;
