import { useEffect } from "react"
import Login from "./components/Login"
import Notification from "./components/Notification"
import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "./reducers/notificationReducer"
import { initializeBlogs } from "./reducers/blogreducer"
import { logoutUser } from "./reducers/userReducer"
import { Link, Route, Routes } from "react-router-dom"
import Users from "./components/Users"
import BlogList from "./components/BlogList"
import UserInfo from "./components/UserInfo"
import BlogInfo from "./components/BlogInfo"
import { Button, Navbar, Nav, Container } from "react-bootstrap"

const App = () => {
  const user = useSelector((state) => state.user)

  const blogs = useSelector((state) => {
    return [...state.blogs].sort((a, b) => b.likes - a.likes)
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogout = () => {
    window.localStorage.removeItem("user")
    dispatch(logoutUser())
    dispatch(
      setNotification(
        {
          message: "logout successful",
          isError: false,
        },
        5000,
      ),
    )
  }

  if (!user) {
    return (
      <Container>
        <Navbar className="justify-content-between">
          <Nav>
            <Navbar.Brand>Bloglist</Navbar.Brand>
          </Nav>
        </Navbar>
        <h2>log in to bloglist</h2>
        <Notification />
        <Login />
      </Container>
    )
  }

  return (
    <Container>
      <Navbar className="justify-content-between">
        <Nav>
          <Navbar.Brand>Bloglist</Navbar.Brand>
          <Nav.Link as="span">
            <Link to={"/"}>blogs</Link>
          </Nav.Link>
          <Nav.Link as="span">
            <Link to={"/users"}>users</Link>
          </Nav.Link>
        </Nav>
        <Nav.Link as="div">
          <span>{user.name} logged in </span>
          <Button variant="secondary" onClick={handleLogout}>
            logout
          </Button>
        </Nav.Link>
      </Navbar>

      <Notification />

      <Routes>
        <Route path="/" element={<BlogList blogs={blogs} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserInfo />} />
        <Route path="/blogs/:id" element={<BlogInfo />} />
      </Routes>
    </Container>
  )
}

export default App
