const Hologram = require("./hologram")

module.expors.inject = function inject(bot, ChatMessage) {
    const Hologram = Hologram.inject(bot, ChatMessage)

    return class Query {
        data = {}

        constructor() {
            // create structured data from holograms
            {
                bot.entities
                    .filter(entity => entity.mobType === "Armor Stand")
                    .forEach(entity => {
                        const key = ""
                        key += Math.floor(entity.position.x) + ','
                        key += Math.floor(entity.position.z)

                        if (this.data[key]) {
                            if (entity.metadata[2].length > 0) { // armour stand has a display
                                this.data[key][0].push(entity.position.y)
                                this.data[key][1].push(entity.metadata[2])
                            }
                        } else {
                            this.data[key] = [[],[]]
                        }
                    })
            }

            // sort hologram data by vertical position
            {
                for (let key in this.data) {
                    // unsorted data (numbers and strings)
                    const unsorted_num = this.data[key][0]
                    const unsorted_str = this.data[key][1]

                    // sorted data (strings only)
                    const length = unsorted_num.length
                    const sorted_str = new Array(length)

                    // implement selection sort
                    for (let i = 0; i < length; i++) {
                        const largest = i
                        for (let j = i; j < length; j++) {
                            if (unsorted_num[i] > unsorted_num[largest]) {
                                largest = i
                            }
                        }
                        sorted_str[i] = unsorted_str[largest]
                    }

                    this.data[key] = new Hologram(sorted_str)
                }
            }
        }

        fromPos(position) {
            const key = ""
            key += Math.floor(position.x) + ','
            key += Math.floor(position.z)
            // return hologram from key
            return this.data[key] || null
        }

        matching(query, colour) {
            if (colour) {
                for (let key in this.data) {
                    const hologram = this.data[key]
                    if (hologram.toMotd().match(query)) {
                        return hologram
                    }
                }
            } else {
                for (let key in this.data) {
                    const hologram = this.data[key]
                    if (hologram.toString().match(query)) {
                        return hologram
                    }
                }
            }
            // no matches found
            return null
        }
    }
}