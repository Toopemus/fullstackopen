import { useState } from "react"
import PropTypes from "prop-types"

const Blog = ({ blog, currentUser, likeBlog, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const addedByCurrentUser = blog.user.username === currentUser.username

  return (
    <div className="blog">
      <div>{`${blog.title} by ${blog.author} `}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "hide" : "show"}
        </button>
      </div>
      {showDetails && <>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={() => likeBlog(blog)}>like</button></div>
        <div>{blog.user.name}</div>
        {addedByCurrentUser && <button onClick={() => removeBlog(blog)}>remove</button>}
      </>}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog
