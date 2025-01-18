import { createSlice } from "@reduxjs/toolkit"
 
const initialState = {
  userInfo: localStorage.getItem('userInfo') 
            ? JSON.parse(localStorage.getItem('userInfo')) 
            : null,
   isAuthenticated: false         
}

const authSlice = createSlice({
  name: 'auth',
  initialState,

    reducers: {
      setCredentials: (state, action) => {
        state.userInfo = action.payload
        localStorage.setItem("userInfo", JSON.stringify(action.payload))
        const expirationTime = new Date().getTime() + 10 * 24 * 60 * 60 * 1000
        localStorage.setItem('expirationTime', expirationTime)
        state.isAuthenticated = true
      },

      logout: (state) => {
        state.userInfo = null
        state.isAuthenticated = false
        localStorage.clear()
      }
    }
})

export const {setCredentials, logout} = authSlice.actions
export default authSlice.reducer