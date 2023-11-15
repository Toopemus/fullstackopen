import PropTypes from "prop-types"
import Blog from "./Blog"
import { Table } from "react-bootstrap"
import { useRef } from "react"
import Togglable from "./Togglable"
import NewBlog from "./NewBlog"

const BlogList = ({ blogs }) => {
  const newBlogRef = useRef()
  return (
    <>
      <h2>Blogs</h2>
      <Table striped>
        <tbody>
          <tr>
            <th>Blog title</th>
            <th>author</th>
            <th>likes</th>
          </tr>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </tbody>
      </Table>
      <Togglable buttonLabel="new blog" ref={newBlogRef}>
        <NewBlog togglableHandle={newBlogRef} />
      </Togglable>
    </>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
}

export default BlogList
