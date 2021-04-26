
import React from "react";
import CardMedia from '@material-ui/core/CardMedia';

import './index.scss';

import CardActionButtons from '../ActionButtons';
import CardTags from '../Tags';

// NOTE: For big- and medium-sized cards, the same content is displayed,
// but the sizes are changed depending on the class of the <Card> component.
const StandardCardContent = ({ name, image, url, tags, handleCopySnackbar }) => (
  <>
    <span className="Links-card-name truncate-text--single-line">{name}</span>
    <CardMedia
      className="Links-image-section"
      image={image}
    />
    <div className="Links-card-url-section">
      <span className="Links-card-url truncate-text--single-line">{url}</span>
      <CardActionButtons
        url={url}
        handleCopySnackbar={handleCopySnackbar}
      />
    </div>
    <CardTags tags={tags}/>
  </>
);

export default StandardCardContent;
