
import { createSlice } from '@reduxjs/toolkit'

const linksSlice = createSlice({
  name: 'links',
  initialState: {
    links: [],
    isLoading: false,
    isFiltering: false,
  },
  reducers: {
    getAllLinks: (state, { type, payload }) => {
      state.isLoading = false;
      state.isFiltering = false;
      state.links = payload.links;
    },
    getLinksByFilter: (state, { type, payload }) => {
      state.isLoading = false;
      state.isFiltering = true;
      state.links = payload.links;
    },
    setIsLoadingLinks: (state, { type, payload }) => {
      state.isLoading = payload.isLoading;
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  getAllLinks,
  getLinksByFilter,
  setIsLoadingLinks,
} = linksSlice.actions

export const linksReducer = linksSlice.reducer