module.exports.inject = function inject(bot, ChatMessage) {
    return class Hologram {
        constructor(data, position) {
            this.components = data.map(string => new ChatMessage(string))
            this.position = position
        }

        toString() {
            return this.components.map(chatMsg => chatMsg.toString()).join('\n')
        }

        toMotd() {
            return this.components.map(chatMsg => chatMsg.toMotd()).join('\n')
        }

        toAnsi() {
            return this.components.map(chatMsg => chatMsg.toAnsi()).join('\n')
        }
    }
}