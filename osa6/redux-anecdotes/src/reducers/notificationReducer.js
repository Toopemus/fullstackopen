/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "filter",
  initialState: null,
  reducers: {
    setMessage(state, action) {
      return action.payload
    }
  }
})

export const { setMessage } = notificationSlice.actions

export const setNotification = (message, duration) => {
  return async dispatch => {
    dispatch(setMessage(message))
    setTimeout(() => dispatch(setMessage(null)), duration * 1000)
  }
}

export default notificationSlice.reducer
