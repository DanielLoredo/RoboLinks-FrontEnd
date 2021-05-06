
import React from "react";

import './index.scss';

import CardActionButtons from '../ActionButtons';
import CardTags from '../Tags';

import { removeProtocolFromUrl } from '../utils';

// NOTE: Content for small-sized cards
const AlternativeCardContent = ({ title, short_url, tags, handleCopySnackbar }) => {
  const reducedUrl = removeProtocolFromUrl(short_url);

  return (
    <>
      <div className="Links-card-description">
        <span className="Links-card-title truncate-text--single-line" title={title}>
          {title}
        </span>
        <span className="Links-card-url truncate-text--single-line" title={reducedUrl}>
          {reducedUrl}
        </span> 
        <CardTags tags={tags}/>
      </div>
      <CardTags tags={tags}/>
      <CardActionButtons
        short_url={reducedUrl}
        handleCopySnackbar={handleCopySnackbar}
      />
    </>
  );
}

export default AlternativeCardContent;
