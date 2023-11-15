import { useDispatch, useSelector } from "react-redux"
import { useMatch } from "react-router-dom"
import { addComment, deleteBlog, giveLikeTo } from "../reducers/blogreducer"
import { setNotification } from "../reducers/notificationReducer"
import { useState } from "react"
import { Button, Card, Form, ListGroup } from "react-bootstrap"

const BlogInfo = () => {
  const dispatch = useDispatch()
  const [commentField, setCommentField] = useState("")
  const currentUser = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)

  const match = useMatch("/blogs/:id")
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  const likeBlog = (blog) => {
    dispatch(giveLikeTo(blog))
    dispatch(
      setNotification(
        {
          message: `liked ${blog.title} by ${blog.author}`,
          isError: false,
        },
        5000,
      ),
    )
  }

  const removeBlog = (blog) => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
      dispatch(
        setNotification(
          {
            message: `removed ${blog.title} by ${blog.author}`,
            isError: false,
          },
          5000,
        ),
      )
    }
  }

  const handleComment = (event) => {
    event.preventDefault()
    dispatch(addComment(blog.id, commentField))
    setCommentField("")
    dispatch(
      setNotification(
        {
          message: "comment added!",
          isError: false,
        },
        5000,
      ),
    )
  }

  const handleCommentField = (event) => {
    setCommentField(event.target.value)
  }
  if (!blog) {
    return null
  }
  const addedByCurrentUser = blog.user.username === currentUser.username

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {blog.title} by {blog.author}
        </Card.Title>
        url: <a href={blog.url}>{blog.url}</a>
        <div style={{ marginBottom: 15 }}>
          likes {blog.likes}{" "}
          <Button onClick={() => likeBlog(blog)}>like</Button>
        </div>
        <h3>comments</h3>
        <ListGroup>
          {blog.comments.map((comment) => (
            <ListGroup.Item key={comment}>{comment}</ListGroup.Item>
          ))}
        </ListGroup>
        <Form onSubmit={handleComment} style={{ marginTop: 15 }}>
          <Form.Group>
            <Form.Control
              value={commentField}
              onChange={handleCommentField}
              type="text"
              placeholder="Add a comment"
            />
            <Button type="submit" style={{ marginTop: 5 }}>
              submit
            </Button>
          </Form.Group>
        </Form>
      </Card.Body>
      <Card.Footer>
        <div>
          <span>added by {blog.user.name} </span>
          {addedByCurrentUser && (
            <Button variant="danger" onClick={() => removeBlog(blog)}>
              remove
            </Button>
          )}
        </div>
      </Card.Footer>
    </Card>
  )
}

export default BlogInfo
