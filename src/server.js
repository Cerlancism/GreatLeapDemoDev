//@ts-check
const express = require('express')
const serveIndex = require('serve-index');

class Server
{
    constructor(port = 8080)
    {
        console.log("Starting Web Server")

        this.webServer = express()

        this.webServer
            .use(express.static('public'))
            .use('/downloads', serveIndex(__dirname + '/../public/downloads'))
            .use('/projects', serveIndex(__dirname + '/../public/projects'))
            .get('/reflect/:p1/:p2/:p3', (req, res) => res.send(req.params))
            .get('/reflect', (req, res) => res.send(req.query))
            .get('/downloads/:file', (req, res) => res.download(__dirname + `/../public/downloads/${req.params.file}`))
            .get('/confession/:content', (req, res) => res.sendStatus(200) && console.log(`${req.ip} confessed: ` + req.params.content))
            .listen(port, () => console.log(`Example app listening on port ${port}!`))
    }

    /**
    *
    * @param {import('./discordBot')} bot
    */
    withBot(bot)
    {
        this.bot = bot
    }
}

module.exports = new Server()