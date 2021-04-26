
import React from "react";

import './index.scss';

import CardActionButtons from '../ActionButtons';
import CardTags from '../Tags';

// NOTE: Content for small-sized cards
const AlternativeCardContent = ({ name, url, tags, handleCopySnackbar }) => (
  <>
    <div className="Links-card-description">
      <span className="Links-card-name truncate-text--single-line">{name}</span>
      <span className="Links-card-url truncate-text--single-line">{url}</span>    
      <CardTags tags={tags}/>
    </div>
    <CardTags tags={tags}/>
    <CardActionButtons
      url={url}
      handleCopySnackbar={handleCopySnackbar}
    />
  </>
);

export default AlternativeCardContent;
