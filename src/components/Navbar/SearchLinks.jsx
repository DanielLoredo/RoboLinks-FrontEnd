
import React from "react";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import './index.scss';

const SEARCH_BAR_PLACEHOLDER = "Pueba Github, @HOME, Candidates...";

const SearchLinks = () => (
  <Paper component="form" className='Navbar-search-links'>
    <InputBase
      className='Navbar-search-links-input'
      placeholder={SEARCH_BAR_PLACEHOLDER}
      autoFocus={true}
    />
    <SearchIcon className='Navbar-search-links-icon'/>
  </Paper>
);

export default SearchLinks;
