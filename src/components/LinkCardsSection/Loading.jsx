import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';

import "./index.scss";

const Loading = () => (
  <div className="Links-cards-collection--loading">
    <CircularProgress />
  </div>
);

export default Loading;
