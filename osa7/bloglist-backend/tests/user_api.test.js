const mongoose = require("mongoose")
const supertest = require("supertest")
const bcrypt = require("bcrypt")
const app = require("../app")
const User = require("../models/user")
const helper = require("./test_helper")

const api = supertest(app)

const INIT_USERNAME = "root"

describe("when there's one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash("alustus", 10)
    const user = new User({ username: INIT_USERNAME, passwordHash })
    await user.save()
  })

  describe("GET /api/users", () => {
    test("returns all users", async () => {
      const response = await api.get("/api/users")
      expect(response.body).toHaveLength(1)
    })
  })

  describe("POST /api/users", () => {
    test("succeeds with new user", async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        username: "testikayttaja",
        name: "Testikäyttäjä",
        password: "salasana",
      }

      await api
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    })
    test("returns 400 and appropriate error message when username is not unique", async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        username: INIT_USERNAME,
        name: "Tämä ei mene läpi",
        password: "salasana",
      }
      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/)

      const usersAtEnd = await helper.usersInDb()

      expect(result.body.error).toContain("expected `username` to be unique")
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
    test("returns 400 and appropriate error message when username is too short", async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        username: "ab",
        name: "Tässä on liian lyhyt käyttäjänimi",
        password: "salasana",
      }

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/)

      const usersAtEnd = await helper.usersInDb()

      expect(result.body.error).toContain(
        "is shorter than the minimum allowed length",
      )
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
    test("returns 400 and appropriate error message when username is not given", async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        name: "Tästä puuttuu käyttäjänimi",
        password: "salasana",
      }

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/)

      const usersAtEnd = await helper.usersInDb()

      expect(result.body.error).toContain(
        "username: Path `username` is required",
      )
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
    test("returns 400 and appropriate error message when password is too short", async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        username: "testikayttaja",
        name: "Tässä on liian lyhyt salasana",
        password: "sa",
      }

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/)

      const usersAtEnd = await helper.usersInDb()

      expect(result.body.error).toContain("password missing or too short")
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
    test("returns 400 and appropriate error message when password is not given", async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        username: "testikayttaja",
        name: "Tästä puuttuu salasana",
      }

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/)

      const usersAtEnd = await helper.usersInDb()

      expect(result.body.error).toContain("password missing or too short")
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
