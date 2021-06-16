import { createSlice } from "@reduxjs/toolkit";

const linksSlice = createSlice({
  name: "links",
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

      //If the filter search term is also a tag
      if (payload.filter === 1) {
        state.links = payload.links;
      } else if (payload.filter === 2) {
        var ids = new Set(state.links.map((d) => d.short_url));
        var merged = [
          ...state.links,
          ...payload.links.filter((d) => !ids.has(d.short_url)),
        ];
        state.links = merged;
      }
    },
    setIsLoadingLinks: (state, { type, payload }) => {
      state.isLoading = payload.isLoading;
    },
    removeLink: (state, { type, payload }) => {
      state.links = [...state.links.filter((link) => link.id !== payload.id)];
    },
    createLink: (state, { type, payload }) => {
      state.links = [...state.links, payload.link];
    },
    updateLink: (state, { type, payload }) => {
      const newLinks = [
        ...state.links.filter((link) => link.id !== payload.link.id),
      ];
      console.log(newLinks);
      state.links = [...newLinks, payload.link];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getAllLinks,
  getLinksByFilter,
  setIsLoadingLinks,
  removeLink,
  createLink,
  updateLink,
} = linksSlice.actions;

export const linksReducer = linksSlice.reducer;
