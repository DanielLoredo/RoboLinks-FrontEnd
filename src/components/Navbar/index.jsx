
import React from "react";
import { AccountCircle } from '@material-ui/icons';

import './index.scss';

import SearchLinks from './SearchLinks';

const Navbar = () => (
  <div className="Navbar">
    <img src={"/images/Roborregos_logo.png"} alt="Logo" className="Navbar-logo"/>
    <SearchLinks />
    <AccountCircle alt="Avatar fallback icon" className="Navbar-avatar"/>
  </div>
);

export default Navbar;
