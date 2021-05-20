import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";

import "./index.scss";

import AddLinkCardButton from "./AddLinkCardButton";
import LinkCardsCollection from "./LinkCardsCollection";
import Alert from "../common/Alert";

import { useDynamicWidthOfComponent } from "../utils";
import { getAllLinks as getAllLinksAction } from "../../store/links";
import { getAllLinks as getAllLinksApiRequest } from "../../scripts/apiScripts";

import CreateLinkForm from "../CreateLinkForm";

const LinkCardsSection = () => {
  const dispatch = useDispatch();

  const linksContainerRef = useRef(null);
  // NOTE: no need for debounceTime, to minize update time as much as possible
  const linksContainerWidth = useDynamicWidthOfComponent(linksContainerRef, 0);

  const [isSnackbarOpened, setIsSnackbarOpened] = useState(false);

  const [editingUrl, setEditingUrl] = useState({ editing: false, url: {} });

  // Request all links data to API.
  // If the request succeeds, the data is stored in the redux-store through an Action.
  // Otherwise, an Error is thrown.
  useEffect(() => {
    getAllLinksApiRequest()
      .then((response) => dispatch(getAllLinksAction({ links: response.data })))
      .catch((error) => {
        throw new Error(`Could not get all links.\n\nReason: ${error}`);
      });
  }, [dispatch]);

  const handleCopySnackbar = () => setIsSnackbarOpened(true);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpened(false);
  };

  const handleCloseModal = () => {
    setEditingUrl({ editing: false, url: {} });
  };

  return (
    <div className="Links-section">
      <div className="Links-container" ref={linksContainerRef}>
        <LinkCardsCollection
          handleCopySnackbar={handleCopySnackbar}
          linksContainerWidth={linksContainerWidth}
          setEditingUrl={setEditingUrl}
        />
      </div>
      <AddLinkCardButton />
      {editingUrl.editing ? (
        <CreateLinkForm
          open={editingUrl.editing}
          handleClose={handleCloseModal}
          created_link_data={editingUrl.url}
          linkUpdate={true}
        />
      ) : null}
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isSnackbarOpened}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          Link copied to clipboard
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LinkCardsSection;
