module.exports.inject = function inject(ChatMessage) {
    return class Hologram {
        constructor(position, data) {
            this.position = position
            // parse JSON from newer versions
            try {
                this.components = data.map(string => new ChatMessage(JSON.parse(string)))
            } catch (e) {
                this.components = data.map(string => new ChatMessage(string))
            }
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