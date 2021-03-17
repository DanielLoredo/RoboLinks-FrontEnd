
import React from "react";
import { AddCircle } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

import './index.scss';

const AddLinkButton = () => (
  <IconButton aria-label="add-link" className="Links-add-button">
    <AddCircle alt="Add link icon" className="Links-add-icon darken-on-hover"/>
  </IconButton>
);

export default AddLinkButton;
