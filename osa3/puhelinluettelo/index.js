const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")

// morgan config
morgan.token("data", (req, res) => {
  if(req.method === "POST") {
    return JSON.stringify(req.body)
  }
  return null
})

// Middleware
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :data"))
app.use(cors())
app.use(express.json())

let phonebook = [
  {
    id: 1,
    name: "Ari Koodari",
    number: "213-4567790"
  },
  {
    id: 2,
    name: "Maija Meikäläinen",
    number: "456-7790294"
  },
  {
    id: 3,
    name: "Jari Iskuporakone",
    number: "567-7903757"
  },
  {
    id: 4,
    name: "Oikea Ihminen",
    number: "999-9123499"
  }
]

app.get("/api/persons", (req, res) => {
  res.json(phonebook)
})

app.post("/api/persons", (req, res) => {
  if (!req.body.name || !req.body.number) {
    return res.status(400).json({
      error: "content missing or incomplete"
    })
  }

  const names = phonebook.map(person => person.name)
  if (names.includes(req.body.name)) {
    return res.status(400).json({
      error: "name must be unique"
    })
  }

  const newId = Math.floor(Math.random() * 100000)
  const person = {
    "id": newId,
    "name": req.body.name,
    "number": req.body.number
  }

  phonebook = phonebook.concat(person)

  res.json(person)
})

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  const person = phonebook.find(person => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  phonebook = phonebook.filter(person => person.id !== id)

  res.status(204).end()
})

app.get("/info", (req, res) => {
  console.log(req.headers)
  const requestTimeStamp = new Date().toUTCString()
  res.send(`
    <p>Phonebook has info for ${phonebook.length} people</p>
    <p>${requestTimeStamp}</p>
  `)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`)
})
