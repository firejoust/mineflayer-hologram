const Query = require("./src/query")
const ChatMessage = require("prismarine-chat")

module.exports.plugin = function inject(bot) {
    bot.hologram = new Plugin(bot)
}

function Plugin(bot) {
    this.Query = Query.inject(bot, ChatMessage(bot.majorVersion))
}