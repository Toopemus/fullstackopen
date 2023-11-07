const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")
const User = require("../models/user")
const helper = require("./test_helper")
const bcrypt = require("bcrypt")

const api = supertest(app)

const testUser = { username: "root", password: "salasana" }

beforeEach(async () => {
  // Initialize a test user
  await User.deleteMany({})
  const hash = await bcrypt.hash(testUser.password, 10)
  const user = new User({
    username: testUser.username,
    name: "root user",
    passwordHash: hash
  })
  const savedUser = await user.save()

  // Initialize blogs
  await Blog.deleteMany({})
  let blog = new Blog({
    ...helper.initialBlogs[0],
    user: savedUser._id
  })
  await blog.save()
  blog = new Blog({
    ...helper.initialBlogs[1],
    user: savedUser._id
  })
  await blog.save()
})

describe("GET /api/blogs", () => {
  test("returns all notes", async () => {
    const response = await api.get("/api/blogs")

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  test("returned objects have field 'id'", async () => {
    const response = await api.get("/api/blogs")

    expect(response.body[0].id).toBeDefined()
  })
})

describe("POST /api/blogs", () => {
  test("adds a new blog", async () => {
    const loginInfo = await api
      .post("/api/login")
      .send(testUser)

    const authToken = loginInfo.body.token

    const blog = {
      title: "testeissä lisätty blogi",
      author: "tiina testaaja",
      url: "testaaja.net",
      likes: 0
    }

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${authToken}`)
      .send(blog)
      .expect(201)

    const blogsAfterPost = await helper.blogsInDb()

    expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length + 1)
  })
  test("sets likes to 0 when they're not specified", async () => {
    const loginInfo = await api
      .post("/api/login")
      .send(testUser)

    const authToken = loginInfo.body.token

    const blog = {
      title: "tälle blogille ei määritetä tykkäyksiä",
      author: "tiina testaaja",
      url: "testaaja.net"
    }

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${authToken}`)
      .send(blog)
      .expect(201)

    expect(response.body.likes).toBeDefined()
    expect(response.body.likes).toBe(0)
  })
  test("rejects request when title is missing", async () => {
    const loginInfo = await api
      .post("/api/login")
      .send(testUser)

    const authToken = loginInfo.body.token

    const blog = {
      author: "tiina testaaja",
      url: "testaaja.net",
      likes: 0
    }

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${authToken}`)
      .send(blog)
      .expect(400)
  })
  test("rejects request when url is missing", async () => {
    const loginInfo = await api
      .post("/api/login")
      .send(testUser)

    const authToken = loginInfo.body.token

    const blog = {
      title: "tälle blogille ei määritetä tykkäyksiä",
      author: "tiina testaaja",
      likes: 0
    }

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${authToken}`)
      .send(blog)
      .expect(400)
  })
  test("rejects request and responds with 401 when token is not specified", async () => {
    const blog = {
      title: "testeissä lisätty blogi",
      author: "tiina testaaja",
      url: "testaaja.net",
      likes: 0
    }

    await api
      .post("/api/blogs")
      .send(blog)
      .expect(401)
    const blogsAfterPost = await helper.blogsInDb()

    expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length)
  })
})

describe("DELETE /api/blogs/:id", () => {
  test("deletes blog with given id", async () => {
    const loginInfo = await api
      .post("/api/login")
      .send(testUser)

    const authToken = loginInfo.body.token

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${authToken}`)
      .expect(204)

    const blogsAfterDelete = await helper.blogsInDb()
    const blogIds = blogsAfterDelete.map(blog => blog.id)

    expect(blogsAfterDelete).toHaveLength(blogsAtStart.length - 1)
    expect(blogIds).not.toContain(blogToDelete.id)
  })
})

describe("PUT /api/blogs/:id", () => {
  test("updates blog with given id", async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const blogUpdate = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogUpdate)
      .expect(200)

    const blogsAfterUpdate = await helper.blogsInDb()
    const updatedBlog = blogsAfterUpdate.find(blog => blog.id === blogToUpdate.id)

    expect(updatedBlog.likes).toBe(blogToUpdate.likes + 1)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
