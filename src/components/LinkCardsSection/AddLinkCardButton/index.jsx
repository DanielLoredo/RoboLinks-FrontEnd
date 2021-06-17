import React from "react";
import { AddCircle } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import "./index.scss";

export default function AddLinkButton({handleOpen}) {
  return (
    <IconButton
      aria-label="add-link"
      className="Links-add-button"
      onClick={handleOpen}
    >
      <AddCircle
        alt="Add link icon"
        className="Links-add-icon darken-on-hover"
      />
    </IconButton>
  );
}
