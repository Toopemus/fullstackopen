const { oneBlog, multipleBlogs } = require("./test_data")
const listHelper = require("../utils/list_helper")

test("dummy returns one", () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})



describe("totalLikes", () => {
  test("equals the likes of one blog when the list contains only one blog", () => {
    const result = listHelper.totalLikes(oneBlog)
    expect(result).toBe(5)
  })
  test("equals the sum of likes in list with multiple blogs", () => {
    const result = listHelper.totalLikes(multipleBlogs)
    expect(result).toBe(36)
  })
  test("equals zero on an empty list", () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
})
describe("favoriteBlog", () => {
  test("returns the blog with most likes", () => {
    const result = listHelper.favoriteBlog(multipleBlogs)
    expect(result).toEqual(
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      }
    )
  })
  test("returns null on empty list", () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(null)
  })
})
describe("mostBlogs", () => {
  test("returns the author with most blogs", () => {
    const result = listHelper.mostBlogs(multipleBlogs)
    expect(result).toEqual(
      { "author": "Robert C. Martin", "blogs": 3 }
    )
  })
  test("returns null on empty list", () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(null)
  })
})
describe("mostLikes", () => {
  test("returns the author with most combined likes", () => {
    const result = listHelper.mostLikes(multipleBlogs)
    expect(result).toEqual(
      { "author": "Edsger W. Dijkstra", "likes": 17 }
    )
  })
  test("returns null on empty list", () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(null)
  })
})
