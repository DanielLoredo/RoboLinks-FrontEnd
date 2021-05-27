import React from "react";
import Card from "@material-ui/core/Card";

import "./index.scss";

import StandardCardContent from "./StandardContent";
import AlternativeCardContent from "./AlternativeContent";

const BigLinkCard = (props) => (
  <Card className="Links-card Links-card--big" raised={true}>
    <StandardCardContent {...props} />
  </Card>
);
const MediumLinkCard = (props) => (
  <Card className="Links-card Links-card--medium" raised={true}>
    <StandardCardContent {...props} />
  </Card>
);
const SmallLinkCard = (props) => (
  <Card className="Links-card Links-card--small" raised={true}>
    <AlternativeCardContent {...props} />
  </Card>
);

// NOTE: This constant dictionary is useful to pick the right component
// to render by a size-key.
// NOTE: It is important to create this constant AFTER the creation
// of all the components it picks from.
const CARD_COMPONENT_BY_SIZE_KEY = {
  BIG: BigLinkCard,
  MEDIUM: MediumLinkCard,
  SMALL: SmallLinkCard,
};
const LinkCard = ({
  title,
  image,
  short_url,
  tags,
  size,
  handleCopySnackbar,
  setEditingUrl,
}) => {
  const LinkCardComponent = CARD_COMPONENT_BY_SIZE_KEY[size];
  return (
    <LinkCardComponent
      title={title}
      image={image}
      short_url={short_url}
      tags={tags}
      handleCopySnackbar={handleCopySnackbar}
      setEditingUrl={setEditingUrl}
    />
  );
};

export default LinkCard;
