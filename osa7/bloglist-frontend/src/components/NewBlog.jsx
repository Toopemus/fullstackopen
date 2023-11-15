import { useState } from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import { createBlog } from "../reducers/blogreducer"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

const NewBlog = ({ togglableHandle }) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleNewBlog = (event) => {
    event.preventDefault()
    dispatch(
      createBlog({
        title,
        author,
        url,
      }),
    )
    togglableHandle.current.toggleVisibility()
    dispatch(
      setNotification(
        {
          message: `a new blog ${title} by ${author} added`,
          isError: false,
        },
        5000,
      ),
    )

    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <div>
      <h3>Create new</h3>
      <Form onSubmit={handleNewBlog}>
        <Form.Group>
          <Form.Label htmlFor="title">title: </Form.Label>
          <Form.Control
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            type="text"
            id="title"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="author">author: </Form.Label>
          <Form.Control
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            type="text"
            id="author"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="url">url: </Form.Label>
          <Form.Control
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            type="text"
            id="url"
          />
        </Form.Group>
        <Button type="submit" style={{ marginTop: 5, marginBottom: 5 }}>
          create
        </Button>
      </Form>
    </div>
  )
}

NewBlog.propTypes = {
  togglableHandle: PropTypes.object.isRequired,
}

export default NewBlog
