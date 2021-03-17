
import React from "react";

import './index.scss';

import LinkCard from './LinkCard';
import AddLinkButton from './AddLinkButton';

import { MOCKED_LINKS } from './MOCKED_LINKS';

const Links = () => (
  <div className="Links">
    <div className="Links-container">
      {/* TODO: replace MOCKED_LINKS with real links data */}
      {MOCKED_LINKS?.map(({ name, image, url, tags }, index) => (
        <LinkCard
          // Create unique key (in case 2 equal urls are given) 
          key={`${index}-${url}`}
          name={name}
          image={image}
          url={url}
          tags={tags}
        />
      ))}
    </div>
    <AddLinkButton />
  </div>
);

export default Links;
