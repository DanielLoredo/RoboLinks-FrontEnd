
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import { 
  getAllLinks,
  getLinksByFilter,
  setIsLoadingLinks,
} from "../../store/links";
import { getAllLinks as getAllLinksApiRequest } from "../../scripts/apiScripts";

import './index.scss';

const SEARCH_BAR_PLACEHOLDER = "Search by title...";
// NOTE: after testing, 600ms proves to be a good estimation of the 
// maximum time we should wait for another keyboard key to be pressed.
const DEBOUNCE_SEARCH_TIME_MS = 500;


const SearchLinks = () => {
  const dispatch = useDispatch();
  
  const [searchBarText, setSearchBarText] = useState("");
  const [lastQueryText, setLastQueryText] = useState("");
  // NOTE: the (debouncer.cancel) implementation only needs the SET function,
  // therefore, the following (eslint-disable-line) is needed to avoid warning.
  const [_not_used_, setPrevSearchRequest] = useState({}); // eslint-disable-line no-unused-vars

  const handleSearch = async (searchQueryText) => {
    // No need to make request if query text did not change
    if(searchQueryText === lastQueryText) { return; }
    setLastQueryText(searchQueryText);
    // TODO: filter also by url, short-url and tags.
    const filters = { title: searchQueryText };
    dispatch(setIsLoadingLinks({ isLoading: true }));
    await getAllLinksApiRequest(filters)
      .then((response) => {
        const payload = { links: response.data };
        // if (searchQueryText) is not empty, notify redux-state that a filter was applied.
        const reduxAction = (searchQueryText === "")? getAllLinks : getLinksByFilter;
        dispatch(reduxAction(payload));
      })
      .catch((error) => {
        dispatch(getLinksByFilter({ links: [] }));
        throw new Error(`Could not get all links.\n\nReason: ${error}`);
      });    
  }

  const handleChange = ({ target: { value } }) => {
    setSearchBarText(value);
    // (handleSearch) will be executed after (DEBOUNCE_SEARCH_TIME_MS) when called
    const executeSearch = debounce(handleSearch, DEBOUNCE_SEARCH_TIME_MS);
    // Verify if there is a pending debounced search-request, if there is one, the 
    // (cancel) function (provided by debounce) is executed to make sure that request 
    // does not execute after the debounce time (since a new one will be requested).
    setPrevSearchRequest(pendingSearchRequest => {
      pendingSearchRequest.cancel && pendingSearchRequest.cancel();
      return executeSearch;
    });    
    // Start executing a new debounced search-request
    executeSearch(value);
  }

  return (
    <Paper className='Navbar-search-links'>
      <InputBase
        className='Navbar-search-links-input'
        placeholder={SEARCH_BAR_PLACEHOLDER}
        autoFocus={true}
        value={searchBarText}
        onChange={handleChange}
      />
      <SearchIcon className='Navbar-search-links-icon'/>
    </Paper>
  );
}

export default SearchLinks;
