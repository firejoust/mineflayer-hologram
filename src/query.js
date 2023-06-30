const Vec3 = require("vec3")

const Defaults = {
    mobTypes: {
        "Armor Stand": true,
        "Area Effect Cloud": true
    }
}

module.exports.inject = function inject(bot, ChatMessage) {
    const Hologram = require("./hologram").inject(ChatMessage)

    return class Query {
        mobTypes = Defaults.mobTypes
        data = {}

        constructor(mobTypes) {
            this.mobTypes = mobTypes || Defaults.mobTypes

            // create structured data from holograms
            {
                Object.values(bot.entities)
                    .filter(entity => this.mobTypes[entity.mobType])
                    .forEach(entity => {
                        let key = ""
                        key += Math.floor(entity.position.x) + ','
                        key += Math.floor(entity.position.z)
                        // armour stand has a display name
                        if (entity.metadata[2]?.length > 0) {
                            if (this.data[key] === undefined) {
                                this.data[key] = [[],[]]
                            }
                            this.data[key][0].push(entity.position.y)
                            this.data[key][1].push(entity.metadata[2])
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
                    const sorted_num = new Array(length)
                    const sorted_str = new Array(length)

                    // implement selection sort
                    for (let i = 0; i < length; i++) {
                        const largest = i
                        for (let j = i; j < length; j++) {
                            if (unsorted_num[i] > unsorted_num[largest]) {
                                largest = i
                            }
                        }
                        sorted_num[i] = unsorted_num[largest]
                        sorted_str[i] = unsorted_str[largest]
                    }

                    // split horizontal components
                    const pos = key.split(',')

                    // set position to where the hologram starts
                    this.data[key] = new Hologram(
                        new Vec3(
                            Number(pos[0]),
                            sorted_num[length - 1],
                            Number(pos[1])
                        ).offset(0.5, 0, 0.5), 
                        sorted_str
                    )
                }
            }
        }

        matchPos(position) {
            let key = ""
            key += Math.floor(position.x) + ','
            key += Math.floor(position.z)
            // return hologram from key
            return this.data[key] || null
        }

        matchAll(query, colour) {
            const arr = new Array()
            if (colour) {
                for (let key in this.data) {
                    const hologram = this.data[key]
                    if (hologram.toMotd().match(query)) {
                        arr.push(hologram)
                    }
                }
            } else {
                for (let key in this.data) {
                    const hologram = this.data[key]
                    if (hologram.toString().match(query)) {
                        arr.push(hologram)
                    }
                }
            }
            return arr
        }

        match(query, colour) {
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

            // no matches were found
            return null
        }
    }
}