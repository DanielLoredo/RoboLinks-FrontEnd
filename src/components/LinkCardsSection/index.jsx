
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';

import './index.scss';

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

  const handleCopySnackbar = () => setIsSnackbarOpened(true);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') { return; }
    setIsSnackbarOpened(false);
  };

  return (
    <div className="Links-section">
      <div className="Links-container" ref={linksContainerRef}>
        {showLinksCollection && <LinkCardsCollection 
          handleCopySnackbar={handleCopySnackbar}
          linksContainerWidth={linksContainerWidth}
        />}
        {isLoadingLinks && <Loading />}
        {showZeroState && <ZeroState/>}
        {showNoResults && <NoResults/>}
      </div>
      <AddLinkCardButton />
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
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
