import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';

import "./index.scss";

import AddLinkCardButton from './AddLinkCardButton';
import LinkCardsCollection from './LinkCardsCollection';
import Loading from './Loading.jsx';
import ZeroState from './ZeroState.jsx';
import NoResults from './NoResults.jsx';
import Alert from '../common/Alert';

import { useDynamicWidthOfComponent } from '../utils';
import { 
  getAllLinks as getAllLinksAction,
  setIsLoadingLinks,
  selectIsLoadingLinks,
  selectShowLinksCollection,
  selectShowZeroState,
  selectShowNoResults,  
} from "../../store/links";
import { getAllLinks as getAllLinksApiRequest } from "../../scripts/apiScripts";

import CreateLinkForm from "../CreateLinkForm";

const LinkCardsSection = () => {
  const dispatch = useDispatch();
  const isLoadingLinks = useSelector(selectIsLoadingLinks);
  const showLinksCollection = useSelector(selectShowLinksCollection);
  const showZeroState = useSelector(selectShowZeroState);
  const showNoResults = useSelector(selectShowNoResults);  

  const linksContainerRef = useRef(null);
  // NOTE: no need for debounceTime, to minize update time as much as possible
  const linksContainerWidth = useDynamicWidthOfComponent(linksContainerRef, 0);

  const [isSnackbarOpened, setIsSnackbarOpened] = useState(false);

  const [editingUrl, setEditingUrl] = useState({ editing: false, url: {} });

  const [snackBarMessage, setSnackBarMessage] = useState("");

  // Request all links data to API.
  // If the request succeeds, the data is stored in the redux-store through an Action.
  // Otherwise, an Error is thrown.
  useEffect(() => {
    dispatch(setIsLoadingLinks({ isLoading: true }));
    getAllLinksApiRequest()
      .then((response) => dispatch(getAllLinksAction({ links: response.data })))
      .catch((error) => {
        dispatch(getAllLinksAction({ links: [] }));
        throw new Error(`Could not get all links.\n\nReason: ${error}`);
      });
  }, [dispatch]);

  const handleCopySnackbar = () => {
    setSnackBarMessage("Link copied to clipboard")
    setIsSnackbarOpened(true)
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpened(false);
  };

  const handleCloseModal = () => {
    setEditingUrl({ editing: false, url: {} });
  };

  const handleOpenModal = () => {
    setEditingUrl({
      editing: true,
      url: null
    });
  };

  const triggerSnackbarMessage = (message) => {
    setSnackBarMessage(message)
    setIsSnackbarOpened(true)
  };

  return (
    <div className="Links-section">
      <div className="Links-container" ref={linksContainerRef}>
        {showLinksCollection && <LinkCardsCollection 
          handleCopySnackbar={handleCopySnackbar}
          linksContainerWidth={linksContainerWidth}
          setEditingUrl={setEditingUrl}
        />}
        {isLoadingLinks && <Loading />}
        {showZeroState && <ZeroState/>}
        {showNoResults && <NoResults/>}
      </div>
      <AddLinkCardButton
        handleOpen={handleOpenModal}
      />
      {editingUrl.editing ? (
        <CreateLinkForm
          open={editingUrl.editing}
          handleClose={handleCloseModal}
          created_link_data={editingUrl.url}
          linkUpdate={true}
          triggerSnackbar={triggerSnackbarMessage}
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
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LinkCardsSection;
