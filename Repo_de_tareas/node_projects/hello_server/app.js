
import express from 'express'

import fs from 'fs'

const app = express()

const port = 3000

app.use(express.json())

app.get('/', (req, res) =>
{
    fs.readFile('./html/home.html', 'utf8',
    (err, html) =>{
        if(err)
        {
            res.status(500).send('There was an error: ' + err)
            return
        }

        console.log("Sending page...")
        res.send(html)
        console.log("Page sent!")
    })
})

app.get('/person ', (req, res) =>
{
    console.log("Hello server")
    const person={
        name: "Antonio",
        email: "A01424547@tec.mx",
        message: "Hello world from server"
    }
    res.json(person)
})

app.listen(port,()=>
{
    console.log(`Example app listening on port ${port}`)
})