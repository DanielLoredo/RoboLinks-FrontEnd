import React from "react";

import "./index.scss";

const NO_RESULTS_TITLE = "No results found";
const NO_RESULTS_MESSAGE = "Try adjusting your search to find what you are looking for.";

const NoResults = () => (
  <div className="Links-cards-collection--no-results">
    <span className="No-results-title">{NO_RESULTS_TITLE}</span>
    <span className="No-results-message truncate-text--single-line">{NO_RESULTS_MESSAGE}</span>
  </div>
);

export default NoResults;
