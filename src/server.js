//@ts-check
const express = require('express')
const serveIndex = require('serve-index');
const path = require('path')
const http = require('http')

/**
 * Wrapper for express server
 */
class Server
{
    constructor(port = 8080)
    {
        console.log("Starting Web Server")

        this.webServer = express()

        this.webServer
            .enable('trust proxy')
            .use(express.static('public/web'))
            .use('/downloads', serveIndex(__dirname + '/../public/downloads'))
            .use('/projects', serveIndex(__dirname + '/../public/web/projects'))
            .get('/downloads/:file', (req, res) => res.download(__dirname + `/../public/downloads/${req.params.file}`))
            .get('/stream/:file', (req, res) => res.sendFile(path.resolve(__dirname + `/../public/downloads/${req.params.file}`)))
            .get('/reflect/:p1/:p2/:p3', (req, res) => res.send(req.params))
            .get('/reflect', (req, res) => res.send(req.query))
            .get('/confess', (req, res) => this.handleConfession(req, res))
            .listen(port, () => console.log(`Example app listening on port ${port}!`))

        setInterval(() =>
        {
            http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`)
            console.log("Persistence ping")
        }, 280000);

        console.log(`Project hosted at: http://${process.env.PROJECT_DOMAIN}.glitch.me/`)
    }

    /**
    *
    * @param {import('./discordBot')} bot
    */
    withBot(bot)
    {
        this.bot = bot
        return this
    }

    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res
     */
    handleConfession(req, res)
    {
        res.send("You confessed: " + req.query.content)
        this.bot.sendConfession(req.query.title, decodeURIComponent(req.query.content), req.query.image, req.query.text)
        console.log(`${req.ip} confessed: ` + JSON.stringify(req.query))
    }
}

module.exports = new Server()