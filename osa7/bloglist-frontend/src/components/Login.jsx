import { useState } from "react"
import { useDispatch } from "react-redux"
import { loginUser } from "../reducers/userReducer"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(loginUser({ username, password }))
  }

  const handleUsernameInput = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordInput = (event) => {
    setPassword(event.target.value)
  }

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>username</Form.Label>
        <Form.Control
          value={username}
          onChange={handleUsernameInput}
          type="text"
          id="username"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>password </Form.Label>
        <Form.Control
          value={password}
          onChange={handlePasswordInput}
          type="password"
          id="password"
        />
      </Form.Group>
      <Button variant="primary" type="submit" style={{ marginTop: 5 }}>
        login
      </Button>
    </Form>
  )
}

export default Login
