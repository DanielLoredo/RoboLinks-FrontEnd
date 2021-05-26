
import { createSelector } from 'reselect';


export const selectLinksState = (state) => state.links;


export const selectAllLinks = createSelector(
  selectLinksState,
  (linksState) => linksState.links
);

export const selectIsLoadingLinks = createSelector(
  selectLinksState,
  (linksState) => linksState.isLoading
);
export const selectIsFilteringLinks = createSelector(
  selectLinksState,
  (linksState) => linksState.isFiltering
);

export const selectShowLinksCollection = createSelector(
  selectAllLinks,
  selectIsLoadingLinks,
  (links, isLoading) => links?.length>0 && !isLoading
);
// NOTE: (ZeroState) happens when a request with no filters
// was made (already finished) and no links where returned.
export const selectShowZeroState = createSelector(
  selectAllLinks,
  selectIsFilteringLinks,
  selectIsLoadingLinks,
  (links, isFiltering, isLoading) => links?.length===0 && !isFiltering && !isLoading
);
// NOTE: (NoResults) happens when a request with filters
// was made (already finished) and no links where returned.
export const selectShowNoResults = createSelector(
  selectAllLinks,
  selectIsFilteringLinks,
  selectIsLoadingLinks,
  (links, isFiltering, isLoading) => links?.length===0 && isFiltering && !isLoading
);