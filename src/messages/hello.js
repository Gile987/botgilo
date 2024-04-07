function helloHandler(bot, chatId, message) {
  const lowerCaseMessage = message.toLowerCase();
  const greetingPattern = /\b(hello|hi|zdravo|cao)\b/;
  
  if (greetingPattern.test(lowerCaseMessage)) {
    bot.sendMessage(chatId, 'Hello, I am G1L3 bot _(:3 」∠)_');
    return true;
  }
  
  return false;
}

module.exports = helloHandler;
