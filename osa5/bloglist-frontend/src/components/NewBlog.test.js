import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import NewBlog from "./NewBlog"

test("createBlog-handler registers a hit with correct input when form is submitted", async () => {
  const user = userEvent.setup()
  const mockCreateBlog = jest.fn()
  render(
    <NewBlog createBlog={mockCreateBlog} />
  )

  const titleInput = screen.getByLabelText("title:")
  const authorInput = screen.getByLabelText("author:")
  const urlInput = screen.getByLabelText("url:")
  const createButton = screen.getByText("create")

  await user.type(titleInput, "this is the title")
  await user.type(authorInput, "this is the author")
  await user.type(urlInput, "this is the url")
  await user.click(createButton)

  expect(mockCreateBlog.mock.calls).toHaveLength(1)
  expect(mockCreateBlog.mock.calls[0][0]).toEqual({
    title: "this is the title",
    author: "this is the author",
    url: "this is the url"
  })
})
