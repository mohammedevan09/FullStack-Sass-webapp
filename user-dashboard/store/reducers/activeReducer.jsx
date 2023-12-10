const { createSlice } = require('@reduxjs/toolkit')

const activeSlice = createSlice({
  name: 'Active',
  initialState: {
    currentActiveMenu: null,
  },
  reducers: {
    setActiveMenu: (state, action) => {
      return { ...state, currentActiveMenu: action.payload }
    },
  },
})

export const { setActiveMenu } = activeSlice.actions
export default activeSlice.reducer
