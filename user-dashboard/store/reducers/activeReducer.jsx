const { createSlice } = require('@reduxjs/toolkit')

const activeSlice = createSlice({
  name: 'Active',
  initialState: {
    currentActiveMenu: null,
    openMenu: true,
  },
  reducers: {
    setActiveMenu: (state, action) => {
      return { ...state, currentActiveMenu: action.payload }
    },
    setOpenMenu: (state, action) => {
      return { ...state, openMenu: action.payload }
    },
  },
})

export const { setActiveMenu, setOpenMenu } = activeSlice.actions
export default activeSlice.reducer
