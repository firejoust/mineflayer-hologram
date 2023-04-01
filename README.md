<div align="center">
  <h1>Mineflayer Hologram</h1>
  <img src="https://img.shields.io/npm/v/mineflayer-hologram?style=flat-square">
  <img src="https://img.shields.io/github/license/firejoust/mineflayer-hologram?style=flat-square">
  <img src="https://img.shields.io/github/issues/firejoust/mineflayer-hologram?style=flat-square">
  <img src="https://img.shields.io/github/issues-pr/firejoust/mineflayer-hologram?style=flat-square">
</div>

### Features
- Get the general position of a hologram
- Query holograms from text, regex or a position
- Extract text components from a hologram

### Installation
- In your project root directory, install the module using NPM:
```sh
npm install mineflayer-hologram
```

### API
#### Types
```ts
class Vec3;        // https://github.com/PrismarineJS/node-vec3
class ChatMessage; // https://github.com/PrismarineJS/prismarine-chat

class Hologram {
  position: Vec3,
  components: ChatMessage[]
}
```
#### Loading the plugin
```js
const mineflayer = require("mineflayer")
const hologram = require("mineflayer-hologram").plugin

const bot = mineflayer.createBot( ... )

bot.loadPlugin(hologram)
```
#### Methods
```js
/*
  Creates structured data, allowing high level queries to be made
*/
const Query = new bot.hologram.Query()

/*
  Returns the first hologram matching the text. Returns null if nothing was found.
  
  Arguments:
  query (String | Regex): The text matching a hologram's text
  colour (boolean?): If the query includes formatting codes
  
  Returns: Hologram
*/
const hologram = Query.match(query, colour?)

/*
  Returns the hologram at the coordinates specified. (x and z components only)
  
  Arguments:
  position (Vec3): The position of the hologram (x and z)
  
  Returns: Hologram or null
*/
const hologram = Query.matchPos(position)

/*
  Returns all holograms matching the text.
  
  Arguments:
  query (String | Regex): The text matching a hologram's text
  colour (boolean?): If the query includes formatting codes
  
  Returns: Hologram or null
*/
const holograms = Query.matchAll(query, colour?)
```
#### Hologram Methods
```js
/*
  Returns the hologram as a string without formatting.
*/
const string = hologram.toString()

/*
  Returns the hologram as a string with formatting.
*/
const motd = hologram.toMotd()

/*
  Returns the hologram as a string with terminal/console formatting.
*/
const ansi = hologram.toAnsi()
console.log(ansi)
```
