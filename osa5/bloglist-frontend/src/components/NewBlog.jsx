import { useState } from "react"
import PropTypes from "prop-types"

const NewBlog = ({ createBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleNewBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          <label htmlFor="title">title: </label>
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            type="text"
            id="title"
          />
        </div>
        <div>
          <label htmlFor="author">author: </label>
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            type="text"
            id="author"
          />
        </div>
        <div>
          <label htmlFor="url">url: </label>
          <input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            type="text"
            id="url"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

NewBlog.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default NewBlog
