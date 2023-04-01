const Query = require("./src/query")
const ChatMessage = require("prismarine-chat")

module.exports.inject = function inject(bot) {
    bot.hologram = new Plugin(bot)
}

function Plugin(bot) {
    this.Query = Query.inject(bot, ChatMessage(bot.majorVersion))
}