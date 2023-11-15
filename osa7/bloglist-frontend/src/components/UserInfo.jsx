import { useLocation } from "react-router-dom"
import { Card, ListGroup } from "react-bootstrap"

const UserInfo = () => {
  const user = useLocation().state
  console.log(user)
  return (
    <Card>
      <Card.Body>
        <Card.Title>{user.name}</Card.Title>
        <p>Users blogs: </p>
        <ListGroup>
          {user.blogs.map((blog) => (
            <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

export default UserInfo
