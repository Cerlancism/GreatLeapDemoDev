require('dotenv').config()
const server = require('./server')
const bot = require('./discordBot')

server.withBot(bot)
bot.withServer(server)

console.log(process.env.TOKEN)