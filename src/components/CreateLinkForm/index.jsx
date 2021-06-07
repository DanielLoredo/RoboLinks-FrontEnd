import React, { useState } from "react";
import "./index.scss";
import Grid from "@material-ui/core/Grid";
import WallpaperIcon from "@material-ui/icons/Wallpaper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { PrivateSwitch, FormTextField, a11yProps } from "./FormComponents";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { postLink } from "../../scripts/imageScript";
import { deleteLink } from "../../scripts/apiScripts";
import Alert from "../common/Alert";
// import { getDefaultImage } from '../../scripts/imageScript';

import { blue_color, baby_blue, deep_blue } from "../colors";

const link_tags = [
  "github",
  "presentation",
  "workshop",
  "social",
  "youtube",
  "sponsors",
  "electronics",
  "programming",
  "mechanics",
  "contests",
  "sideProjects",
  "docs",
  "candidates",
  "covid",
  "@home",
  "vsss",
  "larcOpen",
  "robocup",
  "drones",
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    height: "25vh",
    overflow: "auto",
    width: "100%",
    "& .MuiTabs-scroller": {
      color: "black",
      overflow: "auto",
    },
    "& .MuiTab-root": {
      minWidth: "100%",
      borderRadius: "30px",
      border: "2px solid " + baby_blue,
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      height: "3vh",

      lineHeight: "90%",
      backgroundColor: "red",
    },
    "& .MuiTabs-scrollButtons": {
      height: "3vh",
    },
  },
  tabs: {
    width: "100%",
  },
  input: {
    display: "none",
  },
  paper: {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7);",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(10, 10, 10),
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function CreateLinkForm({
  open,
  handleClose,
  created_link_data,
  linkUpdate,
  triggerSnackbar,
}) {
  const classes = useStyles();

  const tag_color = ["transparent", blue_color];
  const tag_text = [blue_color, deep_blue];
  const defaultLinkData = {
    title: "",
    URL: "",
    short_link: "",
    tags: [],
    private: false,
  };

  const [private_button_state, setPrivateButtonState] = useState(
    created_link_data ? created_link_data.private : false
  );

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);

  const [image_selected, setImageSelected] = useState(null);

  const [validations, setValidation] = useState(["", "", ""]);
  
  const [link_data, setLinkData] = useState(
    created_link_data ? created_link_data : defaultLinkData
  );

  const handleChangeTag = (event, newValue) => {
    const update = defaultLinkData
    Object.assign(update, link_data);
    let tag_update = [...update.tags];

    if (tag_update.includes(link_tags[newValue])) {
      tag_update.splice(tag_update.indexOf(link_tags[newValue]), 1);
    } else {
      tag_update.push(link_tags[newValue]);
    }
    update.tags = tag_update;
    setLinkData(update);
  };

  const handleChangePrivateSwitch = (event) => {
    setPrivateButtonState(!private_button_state);
  };

  const handleChangeTitle = (event) => {
    let update = link_data;
    update.title = event.target.value;
    setLinkData(update);
    let validations_update = [...validations];
    validations_update[0] = "";
    setValidation(validations_update);
  };

  const handleChangeURL = (event) => {
    let update = link_data;
    update.URL = event.target.value;
    setLinkData(update);
    let validations_update = [...validations];
    validations_update[1] = "";
    setValidation(validations_update);
  };

  const handleChangeShortLink = (event) => {
    let update = link_data;
    update.short_link = event.target.value;
    setLinkData(update);
    let validations_update = [...validations];
    validations_update[2] = "";
    setValidation(validations_update);
  };

  const deleteForm = () => {
    deleteLink(created_link_data.id).then(
      (result) => {
        if (result.status === 200) {
          setLinkData(defaultLinkData);
          handleClose()
          triggerSnackbar("Link deleted")
        } else {
          throw new Error("Email-Server Error, Retry Later");
        }
      },
      (error) => {
        alert(`Something went wrong when deleting link! \n${error.text}`);
      }
    );
  };

  const submitForms = () => {
    // Function that makes a POST to the project's database
    // if (image_selected === "") {
    //   setImageSelected(getDefaultImage(link_data.tags[0]))
    // }

    if (link_data.title && link_data.URL && link_data.short_link) {
      let update = link_data;

      update.tags = link_data.tags;

      //If the user didn´t chose a tag, one is given by default
      if (update.tags.length === 0) {
        update.tags = ["contests"];
      }

      update.private = private_button_state

      // Cloudinary image upload
      postLink(image_selected, update, linkUpdate).then(
        (result) => {
          if (result.status === 200) {
            let message = created_link_data != null ? "Link updated" : "Link saved"
            triggerSnackbar(message)
            setLinkData(defaultLinkData)
            handleClose()
          } else if (result.status === 500) {
            triggerSnackbar(
              "Repeated title, URL, or short link, please change it"
            )
          } else {
            alert(JSON.stringify(update, null, 4))
            alert(JSON.stringify(result, null, 4))
            triggerSnackbar("Email-Server error, retry later")
            // throw new Error("Email-Server Error, Retry Later");
          }
        },
        (error) => {
          triggerSnackbar(
            `Something went wrong when saving link! \n${error.text}`
          );
        }
      );
    } else {
      let title_helperText = link_data.title ? "" : "Please fill title";
      let short_link_helperText = link_data.short_link
        ? ""
        : "Please fill short link";
      let url_helperText = link_data.URL ? "" : "Please fill URL";
      setValidation([title_helperText, short_link_helperText, url_helperText]);
    }
  };

  return (
    <Modal
      style={modalStyle}
      className={classes.paper}
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <form className="LinkForm" noValidate autoComplete="off">
        <Grid
          container
          justify="space-evenly"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12}>
            <FormTextField
              label="Link Title"
              variant="outlined"
              id="link-title-input"
              defaultValue={link_data ? link_data.title : ""}
              onChange={handleChangeTitle}
              error={validations[0]}
              helperText={validations[0]}
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              label="URL"
              variant="outlined"
              id="url-input"
              defaultValue={link_data ? link_data.URL : ""}
              disabled={created_link_data ? true : false}
              onChange={handleChangeURL}
              error={validations[1]}
              helperText={validations[1]}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <FormTextField
              label="Short URL"
              defaultValue="rbgs.xyz/"
              InputProps={{
                readOnly: true,
              }}
              disabled
              id="shorturl-readonly"
            />
          </Grid>
          <Grid item xs={6} md={9}>
            <FormTextField
              variant="outlined"
              id="shorturl-input"
              defaultValue={link_data ? link_data.short_link : null}
              onChange={handleChangeShortLink}
              error={validations[2]}
              helperText={validations[2]}
            />
          </Grid>
          <Grid item xs={6} className="tags">
            <p className="icon-tag">Tags</p>
            <div className={classes.root}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={false}
                onChange={handleChangeTag}
                aria-label="Vertical tabs example"
                className={classes.tabs}
                scrollButtons="on"
              >
                {link_tags.map((tag, id) => (
                  <Tab
                    key={id}
                    label={tag}
                    {...a11yProps(id)}
                    style={{
                      backgroundColor:
                        tag_color[link_data.tags.includes(tag) ? 1 : 0],
                      color: tag_text[link_data.tags.includes(tag) ? 1 : 0],
                      margin: "1vh 0 0 0",
                    }}
                  />
                ))}
              </Tabs>
            </div>
          </Grid>
          <Grid container item spacing={0} xs={6}>
            <Grid item xs={6}>
              <p className="icon-tag">Subir imagen</p>
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                onChange={(e) => {
                  setImageSelected(e.target.files[0]);
                }}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  aria-label="upload-image"
                  className="icon-btn"
                  component="span"
                >
                  <WallpaperIcon style={{ fontSize: 40 }} />
                </IconButton>
              </label>
            </Grid>
            <Grid item xs={6}>
              <IconButton
                aria-label="delete"
                className="single-icon-btn"
                onClick={deleteForm}
              >
                <DeleteIcon style={{ fontSize: 60 }} />
              </IconButton>
            </Grid>
            <Grid item xs={6}>
              <p className="icon-tag">Privado</p>
              <div className="switch-private">
                <PrivateSwitch
                  checked={private_button_state}
                  onChange={handleChangePrivateSwitch}
                  name="checkedA"
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <IconButton
                aria-label="submit"
                className="single-icon-btn"
                onClick={submitForms}
              >
                <CheckCircleIcon
                  style={{ fontSize: 60, color: blue_color }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Modal>
  );
}
