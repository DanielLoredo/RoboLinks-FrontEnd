
import React, { useState } from "react";

import './index.scss';

import LinkCard from './LinkCard';
import AddLinkButton from './AddLinkButton';
import Snackbar from '@material-ui/core/Snackbar';

import Alert from '../common/Alert';

import { MOCKED_LINKS } from './MOCKED_LINKS';

const Links = () => {
  const [open, setOpen] = useState(false);

  const handleCopySnackbar = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="Links-section">
      <div className="Links-container">
        {/* TODO: replace MOCKED_LINKS with real links data */}
        {/* TODO: replace size property with proposed counter coming
         from Backend model */}
        {MOCKED_LINKS?.map(({ name, image, url, tags, size }, index) => (
          <LinkCard
            // Create unique key (in case 2 equal urls are given) 
            key={`${index}-${url}`}
            name={name}
            image={image}
            url={url}
            tags={tags}
            size={size}
            handleCopySnackbar={handleCopySnackbar}
          />
        ))}
      </div>
      <AddLinkButton />
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
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

export default Links;
