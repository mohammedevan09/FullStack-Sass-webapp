const { createSlice } = require('@reduxjs/toolkit')

const affiliateSlice = createSlice({
  name: 'Affiliate',
  initialState: {
    ref: '',
  },
  reducers: {
    setRef: (state, action) => {
      return { ...state, ref: action.payload }
    },
  },
})

export const { setRef } = affiliateSlice.actions
export default affiliateSlice.reducer
