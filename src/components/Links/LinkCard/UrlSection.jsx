
import React from "react";
import IconButton from '@material-ui/core/IconButton';
import { Edit, FileCopy } from '@material-ui/icons';

import './UrlSection.scss';

const LinkCardUrlSection = ({ url }) => {

  // TODO: implement edit function
  const editUrl = () => {}

  const copyUrlToClipboard = () => {
    if (!navigator?.clipboard?.writeText) {
      throw new Error('Your browser does not support copying to clipboard');
    }
    navigator.clipboard
      .writeText(url)
      // TODO: trigger a notification/message for better UX?
      .then()
      .catch((error) => {
        throw new Error(`Could not copy to clipboard.\n\nReason: ${error}`);
      });
  }

  return (
    <div className="Links-card-url-section">
      <span className="Links-card-url">{url}</span>
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
    </div>
  );
};

export default LinkCardUrlSection;
