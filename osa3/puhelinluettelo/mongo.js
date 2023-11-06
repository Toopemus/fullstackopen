const mongoose = require("mongoose")

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log("check arguments")
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://puhelinluettelo_dev:${password}@puhelinluettelo.1qd1bs7.mongodb.net/puhelinluetteloApp?retryWrites=true&w=majority`

mongoose.set("strictQuery", false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model("Person", personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(result => {
    console.log(`added ${result.name} ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}
