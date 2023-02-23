// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const express = require('express')
const app = express()
const port = 4000

app.get('/photos', (req, res) => {
    res.send('Who is anybody?')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

export default function handler(req, res) {
  res.status(200).json({ name: 'Steve Eugenio', age: 27 })
}
