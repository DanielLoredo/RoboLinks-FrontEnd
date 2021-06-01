import React, { useState } from "react";
import { AddCircle } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import CreateLinkForm from "../../CreateLinkForm";
import "./index.scss";

export default function AddLinkButton() {

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
      <CreateLinkForm
        open={open}
        handleClose={handleClose}
      />
    </>
  );
}
