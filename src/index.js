require('dotenv').config()
const server = require('./server')
const bot = require('./discordBot')

server.withBot(bot)
bot.withServer(server)

console.log("Discord Bot Token", process.env.TOKEN)