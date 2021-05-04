
import React from "react";
import IconButton from '@material-ui/core/IconButton';
import { Edit, FileCopy } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';

import './index.scss';

const LinkCardActionButtons = ({ url, handleCopySnackbar }) => {
  // TODO: implement edit function
  const editUrl = () => {}

  const copyUrlToClipboard = () => {
    if (!navigator?.clipboard?.writeText) {
      throw new Error('Your browser does not support copying to clipboard');
    }
    navigator.clipboard
      .writeText(url)
      .then(() => handleCopySnackbar())
      .catch((error) => {
        throw new Error(`Could not copy to clipboard.\n\nReason: ${error}`);
      });
  }

  return (
    <div className="Links-card-action-buttons">
      <Tooltip title="Copy link" placement="top" enterDelay={200} arrow={true}>
        <IconButton 
          className="Links-card-url-copy-button"
          onClick={copyUrlToClipboard}
          aria-label="copy-link" 
        >
          <FileCopy 
            className="Links-card-url-copy-icon darken-on-hover" 
            alt="Copy link url"
          />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit" placement="top" enterDelay={200} arrow={true}>
        <IconButton 
          className="Links-card-url-edit-button"        
          onClick={editUrl}
          aria-label="edit-link" 
        >
          <Edit 
            className="Links-card-url-edit-icon darken-on-hover" 
            alt="Edit link url"
          />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default LinkCardActionButtons;
