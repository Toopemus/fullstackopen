import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import NewBlog from "./components/NewBlog"
import Login from "./components/Login"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [sortedBlogs, setSortedBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [notification, setNotification] = useState(null)

  const newBlogRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("user")
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    setSortedBlogs([...blogs].sort((a, b) => b.likes - a.likes))
  }, [blogs])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        "user", JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (error) {
      setNotification({
        message: `${error.response.data.error}`,
        isError: true
      })
      setTimeout(() => {
        setNotification(null)
      }, 4000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("user")
    setNotification({
      message: "logout successful, refresh the page",
      isError: false
    })
    setTimeout(() => {
      setNotification(null)
    }, 4000)
  }

  const handleUsernameInput = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordInput = (event) => {
    setPassword(event.target.value)
  }

  const createBlog = (newBlog) => {
    newBlogRef.current.toggleVisibility()
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        returnedBlog = { ...returnedBlog, user } // Append user data to object to display correctly
        setBlogs(blogs.concat(returnedBlog))
        setNotification({
          message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
          isError: false
        })
        setTimeout(() => {
          setNotification(null)
        }, 4000)
      })
  }

  const likeBlog = (blog) => {
    blog = {
      ...blog,
      likes: blog.likes + 1
    }
    blogService
      .updateBlog(blog)
      .then(likedBlog => {
        const updatedBlogs = blogs.map(blog => {
          if (blog.id === likedBlog.id) {
            return {
              ...blog,
              likes: blog.likes + 1
            }
          }
          return blog
        })
        setBlogs(updatedBlogs)
        setNotification({
          message: `liked ${blog.title} by ${blog.author}`,
          isError: false
        })
        setTimeout(() => {
          setNotification(null)
        }, 4000)
      })
  }

  const removeBlog = (blog) => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}?`)) {
      blogService
        .remove(blog.id)
        .then(response => {
          setBlogs(blogs.filter(item => item.id !== blog.id))
          setNotification({
            message: `removed ${blog.title} by ${blog.author}`,
            isError: false
          })
          setTimeout(() => {
            setNotification(null)
          }, 4000)
        })
    }
  }

  if (!user) {
    return (
      <div>
        <h2>log in to bloglist</h2>
        <Notification notification={notification} />
        <Login
          handleLogin={handleLogin}
          username={username}
          password={password}
          usernameHandler={handleUsernameInput}
          passwordHandler={handlePasswordInput}
        />
      </div>
    )
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification notification={notification} />
      <div>{user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>

      <Togglable buttonLabel="new blog" ref={newBlogRef}>
        <NewBlog createBlog={createBlog}
          setNotification={setNotification}
        />
      </Togglable>

      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} currentUser={user} likeBlog={likeBlog} removeBlog={removeBlog} />
      )}
    </div>
  )
}

export default App
