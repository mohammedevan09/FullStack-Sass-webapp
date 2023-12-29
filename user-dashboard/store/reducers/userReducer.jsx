const { createSlice } = require('@reduxjs/toolkit')

const userSlice = createSlice({
  name: 'User',
  initialState: {
    userInfo: {},
  },
  reducers: {
    setUsers: (state, action) => {
      return { ...state, userInfo: action.payload }
    },
    setToken: (state, action) => {
      return {
        ...state,
        userInfo: { ...state.userInfo, token: action.payload },
      }
    },
    setEmailVerified: (state, action) => {
      return {
        ...state,
        userInfo: { ...state.userInfo, email_verified: action.payload },
      }
    },
  },
})

export const { setUsers, setToken, setEmailVerified } = userSlice.actions
export default userSlice.reducer
