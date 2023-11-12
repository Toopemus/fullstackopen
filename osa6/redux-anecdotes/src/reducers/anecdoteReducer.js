/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      return [...state, action.payload]
    },
    replaceAnecdote(state, action) {
      return state.map(anecdote =>
        anecdote.id !== action.payload.id
          ? anecdote
          : action.payload
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, replaceAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const giveVoteTo = (anecdote) => {
  return async dispatch => {
    anecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const newAnecdote = await anecdoteService.update(anecdote)
    dispatch(replaceAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer
