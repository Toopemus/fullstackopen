const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const middleware = require("../utils/middleware")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", "-blogs")

  response.json(blogs)
})

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const user = await User.findById(request.user.id)

  const blog = new Blog({
    ...request.body,
    likes: request.body.likes || 0,
    user: user._id,
  })

  const savedBlog = await blog.save()

  // Add blog id to user blogs
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  const populatedResponse = await Blog.findById(savedBlog.id).populate(
    "user",
    "-blogs",
  )
  response.status(201).json(populatedResponse)
})

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === request.user.id) {
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    } else {
      return response.status(401).json({ error: "unauthorized" })
    }
  },
)

blogsRouter.put("/:id", async (request, response) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate("user", "-blogs")
  response.json(updatedBlog)
})

blogsRouter.post("/:id/comments", async (request, response) => {
  let blog = await Blog.findById(request.params.id)

  blog = {
    comments: [...blog.comments, request.body.comment],
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate("user", "-blogs")
  response.json(updatedBlog)
})

module.exports = blogsRouter
