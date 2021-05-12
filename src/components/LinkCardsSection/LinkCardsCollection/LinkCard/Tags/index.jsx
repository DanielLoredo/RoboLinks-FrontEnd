
import React from "react";

import './index.scss';

const LinkCardTags = ({ tags }) => (
  <div className="Links-card-tags">
    {/* TODO: implement carrousel to properly display more than 3 tags */}
    {tags?.map((tag, index) => (
      <div
        // Create unique key (in case 2 equal tags are given) 
        key={`${index}-${tag}`}         
        className="Links-card-tag truncate-text--single-line"
      >
        {tag}
      </div>
    ))}
  </div>
);

export default LinkCardTags;
