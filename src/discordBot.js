class DiscordBot
{
    constructor()
    {
        console.log("Starting Discord Bot.")
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