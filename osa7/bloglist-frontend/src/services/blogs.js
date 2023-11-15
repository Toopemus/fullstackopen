import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = (newBlog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const request = axios.post(baseUrl, newBlog, config)
  return request.then((response) => response.data)
}

const updateBlog = (blog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const sendFormat = {
    user: blog.user.id,
    likes: blog.likes,
    author: blog.author,
    title: blog.title,
    url: blog.url,
  }
  const url = `${baseUrl}/${blog.id}`
  const request = axios.put(url, sendFormat, config)
  return request.then((response) => response.data)
}

const remove = (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const url = `${baseUrl}/${id}`
  const request = axios.delete(url, config)
  return request.then((response) => response.data)
}

const addComment = (id, comment) => {
  const url = `${baseUrl}/${id}/comments`
  const request = axios.post(url, { comment })
  return request.then((response) => response.data)
}

export default { setToken, getAll, create, updateBlog, remove, addComment }
