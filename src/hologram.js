module.exports.inject = function inject(bot, ChatMessage) {
    return class Hologram {
        constructor(data) {
            this.components = data.map(string => new ChatMessage(string))
        }

        toString() {
            return this.data.map(chatMsg => chatMsg.toString()).join('\n')
        }

        toMotd() {
            return this.data.map(chatMsg => chatMsg.toMotd()).join('\n')
        }
    }
}