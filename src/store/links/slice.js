
import { createSlice } from '@reduxjs/toolkit'

const linksSlice = createSlice({
  name: 'links',
  initialState: [],
  reducers: {
    getAllLinks: (state, { type, payload }) => {
      // Returns a new array of links to replace the existing array state.
      // NOTE: (state = payload.links) does not actually mutate or return anything new.
      return payload.links
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  getAllLinks,
} = linksSlice.actions

export const linksReducer = linksSlice.reducer