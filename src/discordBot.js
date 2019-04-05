const Eris = require('eris')

const DefaultChannel = "382566156504137728"

class DiscordBot
{
    constructor()
    {
        console.log("Starting Discord Bot.")

        this.bot = new Eris.CommandClient(process.env.TOKEN, {}, { prefix: ["@mention", "."] })

        this.bot.on("ready", () => this.onReady());
        this.bot.registerCommand("ping", async (msg, args) =>
        {
            const time = Date.now()
            await msg.channel.createMessage("Ping Received: " + args)
            return "pong! " + `\`${Date.now() - time}ms\``
        })

        this.bot.connect();

    }

    onReady()
    {
        this.ready = true
        console.log("Discord Bot Ready!");
        this.bot.createMessage(DefaultChannel, { content: "Bot Started." })
    }

    async sendConfession(message)
    {
        if (this.ready)
        {
            this.bot.createMessage(DefaultChannel, { content: "Confession:\n" + message })
        }
    }

    /**
     * 
     * @param {import('express')} server 
     */
    withServer(server)
    {
        this.server = server
        return this
    }
}

module.exports = new DiscordBot()