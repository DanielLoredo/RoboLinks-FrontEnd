
import React from "react";
import CardMedia from '@material-ui/core/CardMedia';

import './index.scss';

import CardActionButtons from '../ActionButtons';
import CardTags from '../Tags';

import { removeProtocolFromUrl } from '../utils';

// NOTE: For big- and medium-sized cards, the same content is displayed,
// but the sizes are changed depending on the class of the <Card> component.
const StandardCardContent = ({ title, image, short_url, tags, handleCopySnackbar }) => {
  const reducedUrl = removeProtocolFromUrl(short_url);

  return (
    <>
      <span className="Links-card-title truncate-text--single-line" title={title}>
        {title}
      </span>
      <div className="Links-image-section">
        {image && <CardMedia
          image={image}
        />}
      </div>
      <div className="Links-card-url-section">
        <span className="Links-card-url truncate-text--single-line" title={reducedUrl}>
          {reducedUrl}
        </span>
        <CardActionButtons
          short_url={reducedUrl}
          handleCopySnackbar={handleCopySnackbar}
        />
      </div>
      <CardTags tags={tags}/>
    </>
  );
}

export default StandardCardContent;
