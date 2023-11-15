import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const Blog = ({ blog }) => {
  return (
    <tr className="justify-content-between">
      <td>
        <Link to={`/blogs/${blog.id}`} state={blog}>
          {blog.title}
        </Link>
      </td>
      <td>{blog.author}</td>
      <td>{blog.likes}</td>
    </tr>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
