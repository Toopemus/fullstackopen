require("dotenv").config()
const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./models/person")

// morgan config
morgan.token("data", (request, response) => {
  if (request.method === "POST") {
    return JSON.stringify(request.body)
  }
  return null
})

// Middleware
app.use(express.static("dist"))
app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :data"))
app.use(cors())

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then(result => {
      response.json(result)
    })
    .catch(error => next(error))
})

app.post("/api/persons", (request, response, next) => {

  const person = new Person({
    "name": request.body.name,
    "number": request.body.number
  })

  person.save()
    .then(saved => {
      response.json(saved)
    })
    .catch(error => next(error))
})

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.put("/api/persons/:id", (request, response, next) => {
  const person = {
    name: request.body.name,
    number: request.body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: "query" })
    .then(updated => {
      if(updated === null) {
        response.status(404).json({ error: "person already removed from server" })
      } else {
        response.json(updated)
      }
    })
    .catch(error => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.get("/info", (request, response, next) => {
  Person.find({})
    .then(result => {
      const requestTimeStamp = new Date().toUTCString()
      response.send(`
        <p>Phonebook has info for ${result.length} people</p>
        <p>${requestTimeStamp}</p>
      `)
    })
    .catch(error => next(error))
})

const errorMiddleware = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === "CastError") {
    return response.status(400).json({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorMiddleware)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`)
})
