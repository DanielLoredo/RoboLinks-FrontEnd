
import React from "react";

import './TagsSection.scss';

const LinkCardTagsSection = ({ tags }) => (
  <div className="Links-card-tags-section">
    {tags?.map((tag, index) => (
      <div
        // Create unique key (in case 2 equal urls are given) 
        key={`${index}-${tag}`}         
        className="Links-card-tag"
      >
        {tag}
      </div>
    ))}
  </div>
);

export default LinkCardTagsSection;
