const Eris = require('eris')

const ConfessionChannel = "563592900168908821"

class DiscordBot
{
    constructor()
    {
        if (!process.env.TOKEN)
        {
            console.error("\x1b[31m%s\x1b[0m", "Discord bot token missing. Please check if you have created a \".env\" file at project root with \"TOKEN=YOUR_ACTUAL_DISCORD_BOT_TOKEN\" in it.")
            return
        }
        console.log("Starting Discord Bot.")

        this.bot = new Eris.CommandClient(process.env.TOKEN, {}, { prefix: ["@mention ", ">"], owner: "Cerlancism CY" })
        this.bot.on("ready", () => this.onReady())

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

            const output = Array.from(encapselatedLies(input, target)).join(" ")

            await msg.channel.createMessage(output)
        })

        this.bot.registerCommand("strip", async (msg, args) =>
        {
            const splitIndex = args.indexOf("|")
            const input = args.slice(0, splitIndex).join(" ")
            const target = args.slice(splitIndex + 1, args.length).join(" ")
            console.log("input", input)
            console.log("output", target)

            const output = Array.from(stripLies(input, target)).join("")

            await msg.channel.createMessage(output)
        })

        this.bot.connect()

    }

    onReady()
    {
        this.ready = true
        console.log("Discord Bot Ready!")
    }

    /**
     * 
     * @param {string} title 
     * @param {string} message 
     * @param {string} image 
     */
    async sendConfession(title, message, image)
    {
        if (this.ready)
        {
            await this.bot.createMessage(ConfessionChannel,
                {
                    content: "**New Confession**\n",
                    embed:
                    {
                        title: title,
                        description: message,
                        image:
                        {
                            url: image
                        }
                    }
                })
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
 * she believed | he lied => s **h** **e**   b e **l** **i** **e** v e **d**
 * @param {string} messsage eg: she believed
 * @param {string} target eg: he lied
 * @param {string} wrapper default value "**" 
 */
function* encapselatedLies(messsage, target, wrapper = "**")
{
    const targetArr = target.split("").filter(x => x !== " ")
    let targetChar = targetArr.shift()
    for (let char of messsage)
    {
        if (char === targetChar)
        {
            yield wrapper
            yield char
            yield wrapper
            targetChar = targetArr.shift()
            continue
        }
        yield char
    }
}

/**
 * she believed | he lied => s beve
 * @param {string} messsage eg: she believed
 * @param {string} target eg: he lied
 */
function* stripLies(messsage, target)
{
    const targetArr = target.split("").filter(x => x !== " ")
    let targetChar = targetArr.shift()
    for (let char of messsage)
    {
        if (char === targetChar)
        {
            targetChar = targetArr.shift()
            continue
        }
        yield char
    }
}

module.exports = new DiscordBot()