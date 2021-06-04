import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { Edit, FileCopy } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import { useSelector } from "react-redux";

import { selectAllLinks } from "../../../../../store/links";

import "./index.scss";

const LinkCardActionButtons = ({
  short_url,
  handleCopySnackbar,
  setEditingUrl,
}) => {
  // TODO: implement edit function

  const links = useSelector(selectAllLinks);

  const editUrl = () => {
    let link = links.filter((el) => el.short_url.substring(7) === short_url);
    console.log(link);
    let priv = link[0].private === 0 ? false : true;

    setEditingUrl({
      editing: true,
      url: {
        id: link[0].id,
        title: link[0].title,
        URL: link[0].url,
        short_link: link[0].short_url.substring(16),
        tags: link[0].tags,
        private: priv,
      },
    });
  };

  const copyUrlToClipboard = () => {
    if (!navigator?.clipboard?.writeText) {
      throw new Error("Your browser does not support copying to clipboard");
    }
    navigator.clipboard
      .writeText(short_url)
      .then(() => handleCopySnackbar())
      .catch((error) => {
        throw new Error(`Could not copy to clipboard.\n\nReason: ${error}`);
      });
  };

  return (
    <div className="Links-card-action-buttons">
      <Tooltip title="Copy link" placement="top" enterDelay={200} arrow={true}>
        <IconButton
          className="Links-card-url-copy-button"
          onClick={copyUrlToClipboard}
          aria-label="copy-link"
        >
          <FileCopy
            className="Links-card-url-copy-icon darken-on-hover"
            alt="Copy link url"
          />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit" placement="top" enterDelay={200} arrow={true}>
        <IconButton
          className="Links-card-url-edit-button"
          onClick={editUrl}
          aria-label="edit-link"
        >
          <Edit
            className="Links-card-url-edit-icon darken-on-hover"
            alt="Edit link url"
          />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default LinkCardActionButtons;
