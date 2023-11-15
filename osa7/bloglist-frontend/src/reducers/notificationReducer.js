import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
  },
})

export const { setMessage } = notificationSlice.actions

export const setNotification = (message, duration) => {
  return async (dispatch) => {
    dispatch(setMessage(message))
    setTimeout(() => dispatch(setMessage(null)), duration)
  }
}

export default notificationSlice.reducer
