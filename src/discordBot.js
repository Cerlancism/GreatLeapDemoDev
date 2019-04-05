const Eris = require('eris')

const DefaultChannel = "382566156504137728"

class DiscordBot
{
    constructor()
    {
        console.log("Starting Discord Bot.")

        this.bot = new Eris.CommandClient(process.env.TOKEN, {}, { prefix: ["@mention ", "."] })

        this.bot.on("ready", () => this.onReady());
        this.bot.registerCommand("ping", async (msg, args) =>
        {
            const time = Date.now()
            await msg.channel.createMessage("Ping Received: " + args)
            return "pong! " + `\`${Date.now() - time}ms\``
        }, {})

        this.bot.registerCommand("lie", async (msg, args) =>
        {
            const splitIndex = args.indexOf("|")
            const input = args.slice(0, splitIndex).join(" ")
            const target = args.slice(splitIndex + 1, args.length).join(" ")
            console.log("input", input)
            console.log("output", target)

            const output = Array.from(encapselatedLies(input, target)).join("")

            await msg.channel.createMessage(output)
        })

        this.bot.connect();

    }

    onReady()
    {
        this.ready = true
        console.log("Discord Bot Ready!");
        this.bot.createMessage(DefaultChannel, { content: "Bot Started." })
    }

    /**
     * 
     * @param {string} message 
     */
    async sendConfession(message)
    {
        if (this.ready)
        {
            this.bot.createMessage(DefaultChannel, { content: "**New Confession:**\n" + message })
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

/**
 * 
 * @param {string} messsage 
 * @param {string} target 
 */
function* encapselatedLies(messsage, target)
{
    const targetArr = target.split("").filter(x => x !== " ")
    let targetChar = targetArr.shift()
    for (let char of messsage)
    {
        if (char === targetChar)
        {
            yield "**"
            yield char
            yield "**"
            yield " "
            targetChar = targetArr.shift()
            continue;
        }
        yield char
        yield " "
    }
}

module.exports = new DiscordBot()