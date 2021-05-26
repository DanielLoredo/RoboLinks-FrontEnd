import React from "react";

import "./index.scss";

const ZERO_STATE_TITLE = "No link cards yet";
const ZERO_STATE_MESSAGE = "Create a link card using the bottom-right button on your screen.";

const ZeroState = () => (
  <div className="Links-cards-collection--zero-state">
    <span className="No-results-title">{ZERO_STATE_TITLE}</span>
    <span className="No-results-message truncate-text--single-line">{ZERO_STATE_MESSAGE}</span>
  </div>
);

export default ZeroState;
