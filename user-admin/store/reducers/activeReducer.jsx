const { createSlice } = require('@reduxjs/toolkit')

const activeSlice = createSlice({
  name: 'Active',
  initialState: {
    openMenu: false,
  },
  reducers: {
    setOpenMenu: (state, action) => {
      return { ...state, openMenu: action.payload }
    },
  },
})

export const { setOpenMenu } = activeSlice.actions
export default activeSlice.reducer
