import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

const blog = {
  title: "Testausblogi",
  author: "Testaaja",
  url: "blogi.net",
  likes: 0,
  user: {
    name: "testikayttaja"
  }
}

test("renders author and title but not url or likes", () => {
  render(
    <Blog blog={blog} currentUser={{}} likeBlog={() => { }} removeBlog={() => { }} />
  )
  const titleElement = screen.getByText(`${blog.title} by ${blog.author}`)
  const urlElement = screen.queryByText(blog.url)
  const likesElement = screen.queryByText(`likes ${blog.likes}`)

  expect(titleElement).toBeDefined()
  expect(urlElement).toBeNull()
  expect(likesElement).toBeNull()
})
test("renders url, likes and user when 'show' has been pressed", async () => {
  render(
    <Blog blog={blog} currentUser={{}} likeBlog={() => { }} removeBlog={() => { }} />
  )
  const user = userEvent.setup()
  const button = screen.getByText("show")
  await user.click(button)

  const urlElement = screen.getByText(blog.url)
  const likesElement = screen.getByText(`likes ${blog.likes}`)
  const userElement = screen.getByText(blog.user.name)

  expect(urlElement).toBeDefined()
  expect(likesElement).toBeDefined()
  expect(userElement).toBeDefined()
})
test("likeBlog-handler registers two hits when 'like' is pressed twice", async () => {
  const mockLikeBlog = jest.fn()
  render(
    <Blog blog={blog} currentUser={{}} likeBlog={mockLikeBlog} removeBlog={() => { }} />
  )
  const user = userEvent.setup()
  const showButton = screen.getByText("show")
  await user.click(showButton)

  const likeButton = screen.getByText("like")
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockLikeBlog.mock.calls).toHaveLength(2)
})
