import React from "react";

import "./index.scss";

import SearchLinks from "./SearchLinks";
import SignUser from "./SignUser";
// Comment
const Navbar = () => (
  <div className="Navbar">
    <img
      src={"/images/Roborregos_logo.png"}
      alt="Logo"
      className="Navbar-logo"
    />
    <SearchLinks />
    <SignUser />
  </div>
);

export default Navbar;
