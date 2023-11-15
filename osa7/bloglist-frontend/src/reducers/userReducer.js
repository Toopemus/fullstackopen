import { createSlice } from "@reduxjs/toolkit"
import loginService from "../services/login"
import { setNotification } from "./notificationReducer"
import blogService from "../services/blogs"

const initUser = () => {
  const loggedUser = window.localStorage.getItem("user")
  if (loggedUser) {
    const user = JSON.parse(loggedUser)
    blogService.setToken(user.token)
    return user
  }
  return null
}

const userSlice = createSlice({
  name: "user",
  initialState: initUser,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    logoutUser(state, action) {
      return null
    },
  },
})

export const { setUser, logoutUser } = userSlice.actions

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      dispatch(setUser(user))
      window.localStorage.setItem("user", JSON.stringify(user))
      blogService.setToken(user.token)
    } catch (error) {
      dispatch(
        setNotification(
          {
            message: `${error.response.data.error}`,
            isError: true,
          },
          5000,
        ),
      )
    }
  }
}

export default userSlice.reducer
