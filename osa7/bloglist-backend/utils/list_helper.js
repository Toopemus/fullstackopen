const _ = require("lodash")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  let mostLikes = blogs[0]
  for (const blog of blogs) {
    if (blog.likes > mostLikes.likes) {
      mostLikes = blog
    }
  }
  return mostLikes
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authorFrequencies = _.countBy(blogs, "author")
  const mostBlogs = _.maxBy(
    _.keys(authorFrequencies),
    (author) => authorFrequencies[author],
  )

  return { author: mostBlogs, blogs: authorFrequencies[mostBlogs] }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const authorBlogs = _.groupBy(blogs, "author")
  const authorLikes = _.mapValues(authorBlogs, (blogs) => {
    return _.sumBy(blogs, "likes")
  })
  const mostLiked = _.maxBy(
    _.keys(authorLikes),
    (author) => authorLikes[author],
  )

  return { author: mostLiked, likes: authorLikes[mostLiked] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
