
import React, { useState, useRef } from "react";
import Snackbar from '@material-ui/core/Snackbar';

import './index.scss';

import AddLinkCardButton from './AddLinkCardButton';
import LinkCardsCollection from './LinkCardsCollection';
import Alert from '../common/Alert';

import { useDynamicWidthOfComponent } from '../utils';


const LinkCardsSection = () => {
  const linksContainerRef = useRef(null);
  // NOTE: no need for debounceTime, to minize update time as much as possible
  const linksContainerWidth = useDynamicWidthOfComponent(linksContainerRef, 0);  

  const [isSnackbarOpened, setIsSnackbarOpened] = useState(false);

  const handleCopySnackbar = () => setIsSnackbarOpened(true);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') { return; }
    setIsSnackbarOpened(false);
  };

  return (
    <div className="Links-section">
      <div className="Links-container" ref={linksContainerRef}>
        <LinkCardsCollection 
          handleCopySnackbar={handleCopySnackbar}
          linksContainerWidth={linksContainerWidth}
        />
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
