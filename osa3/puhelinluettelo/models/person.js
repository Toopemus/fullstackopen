const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

mongoose.set("strictQuery", false)

console.log(`connecting to ${url}`)
mongoose.connect(url)
  .then(result => {
    console.log("connected to db")
  })
  .catch((error) => {
    console.log("error connecting to db: ", error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: function(v) {
        return /\d{2,3}-\d{4,}/.test(v)
      }
    },
    required: true
  }
})

personSchema.set("toJSON", {
  transform: (document, returned) => {
    returned.id = returned._id.toString()
    delete returned._id
    delete returned.__v
  }
})

module.exports = mongoose.model("Person", personSchema)
