import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "../notificationContext"

const AnecdoteForm = () => {
  const messageDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] })
    },
    onError: () => {
      messageDispatch({ type: "ADD_NOTIF", payload: "anecdote too short, must be 5 characters or longer" })
      setTimeout(() => messageDispatch({ type: "RESET_NOTIF" }), 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    newAnecdoteMutation.mutate({ content, votes: 0 })
    messageDispatch({ type: "ADD_NOTIF", payload: `added '${content}'` })
    setTimeout(() => messageDispatch({ type: "RESET_NOTIF" }), 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
