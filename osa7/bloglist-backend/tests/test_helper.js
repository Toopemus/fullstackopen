const Blog = require("../models/blog")
const User = require("../models/user")

const initialBlogs = [
  {
    title: "testiblogi",
    author: "roope",
    url: "testiblogi.com",
    likes: 10,
  },
  {
    title: "testiblogi 2",
    author: "jare",
    url: "testiblogi-2.com",
    likes: 2,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
}
