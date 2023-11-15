import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      return [...state, action.payload]
    },
    replaceBlog(state, action) {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload,
      )
    },
    setBlogs(state, action) {
      return action.payload
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export const { appendBlog, replaceBlog, setBlogs, removeBlog } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const deleteBlog = (content) => {
  return async (dispatch) => {
    await blogService.remove(content.id)
    dispatch(removeBlog(content.id))
  }
}

export const giveLikeTo = (blog) => {
  return async (dispatch) => {
    blog = { ...blog, likes: blog.likes + 1 }
    const newBlog = await blogService.updateBlog(blog)
    dispatch(replaceBlog(newBlog))
  }
}

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const newBlog = await blogService.addComment(id, comment)
    dispatch(replaceBlog(newBlog))
  }
}

export default blogSlice.reducer
