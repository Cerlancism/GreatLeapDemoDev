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
    }
}

module.exports = new DiscordBot()