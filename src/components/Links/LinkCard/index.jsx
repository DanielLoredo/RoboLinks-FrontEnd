
import React from "react";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

import './index.scss';

import CardUrlSection from './UrlSection';
import CardTagsSection from './TagsSection';

const LinkCard = ({ name, image, url, tags }) => (
  <Card className="Links-card" raised={true}>
    <span className="Links-card-name">{name}</span>
    <CardMedia
      className="Links-image-section"
      image={image}
    />
    <CardUrlSection url={url}/>
    <CardTagsSection tags={tags}/>
  </Card>
);

export default LinkCard;
