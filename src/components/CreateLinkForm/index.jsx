import React, { useState } from 'react'
import './index.scss';
import Grid from '@material-ui/core/Grid';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { PrivateSwitch, FormTextField, a11yProps } from './FormComponents';
import {
  makeStyles,
} from '@material-ui/core/styles';
import { blue_color, baby_blue, deep_blue } from '../colors';

const link_tags = [
  "Github",
  "Presentation",
  "Classes/ Workshops",
  "Social",
  "YouTube",
  "Sponsors",
  "Electronics",
  "Programming",
  "Mechanics",
  "Competition",
  "Side-project",
  "Docs",
  "Candidates",
  "Covid response",
  "Smart Factory",
  "@HOME",
  "VSSS",
  "Autonomous Drones",
  "LARC Open",
  "Robocup",
]

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    height: "25vh",
    overflow: "auto",
    width: "100%",
    '& .MuiTabs-scroller': {
      color: 'black',
      overflow: "auto",
    },
    '& .MuiTab-root': {
      minWidth: "100%",
      borderRadius: "30px",
      border:  '2px solid '+ baby_blue,
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      height: "3vh",
      
      lineHeight: '90%',
      backgroundColor: 'red',
    },
    '& .MuiTabs-scrollButtons': {
      height: "3vh",
    }
  },
  tabs: {
    width: "100%",
  },
  input: {
    display: 'none',
  }
}));

export default function CreateLinkForm({ created_link_data }) {
  const classes = useStyles();

  const tag_color = ["transparent", blue_color];
  const tag_text = [blue_color, deep_blue];

  const [private_button_state, setPrivateButtonState] = useState(created_link_data ? created_link_data.private : null);

  const [link_data, setLinkData] = useState(created_link_data ? created_link_data : null);

  const handleChangeTag = (event, newValue) => {
    const update = {
      title: "",
      URL: "",
      short_link: "ROS",
      tags: [],
      private: false
    }
    Object.assign(update, link_data);
    let tag_update = update.tags;
    if (tag_update.includes(link_tags[newValue])) {
      tag_update.splice(tag_update.indexOf(link_tags[newValue]), 1);
    }else{
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
  };

  const handleChangeURL = (event) => {
    let update = link_data;
    update.URL = event.target.value;
    setLinkData(update);
  };

  const handleChangeShortLink = (event) => {
    let update = link_data;
    update.short_link = event.target.value;
    setLinkData(update);
  };

  const deleteForm = () => {
    alert("Delete data")
  }

  const submitForms = () => {
    // Function that makes a POST to the project's database
    // TODO: add POST function request and send json to backend
    let update = link_data;
    update.tags = link_data.tags;
    update.private = private_button_state;
    let short_link_data = JSON.stringify(link_data, null, 4);
    alert(short_link_data);
  };

  return (
    <form className="LinkForm" noValidate autoComplete="off" >
        <Grid container justify="space-evenly" alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <FormTextField
              label="Link Title"
              variant="outlined"
              id="link-title-input"
              defaultValue={link_data ?link_data.title:""}
              onChange={handleChangeTitle}
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              label="URL"
              variant="outlined"
              id="url-input"
              defaultValue={link_data ?link_data.URL:""}
              disabled={link_data? true: false}
              onChange={handleChangeURL}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <FormTextField
              label="Short URL"
              defaultValue="robolinks/"
              InputProps={{
                readOnly: true,
              }}
              disabled
              id="shorturl-readonly"
            />
          </Grid>
          <Grid item xs={6} md={9}>
            <FormTextField
              variant= "outlined"
              id="shorturl-input"
              defaultValue={link_data ? link_data.short_link:null}
              onChange={handleChangeShortLink}
            />
          </Grid>
          <Grid item xs={6} className='tags'>
              <p className='icon-tag'>Tags</p>
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
                  { link_tags.map((tag, id) => (
                    <Tab
                      key={id}
                      label={tag}
                      {...a11yProps(id)}
                      style={{backgroundColor: tag_color[link_data.tags.includes(tag)?1:0], color: tag_text[link_data.tags.includes(tag)?1:0], margin: "1vh 0 0 0"}}
                    />
                  ))}
                </Tabs>
              </div>
          </Grid>
          <Grid container item spacing={0} xs={6}>
            <Grid item xs={6}>
              <p className='icon-tag'>Subir imagen</p>
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"/>
              <label htmlFor="icon-button-file">
                <IconButton aria-label="upload-image" className="icon-btn" component="span">
                  <WallpaperIcon style={{ fontSize: 40 }}/>
                </IconButton>
              </label>
            </Grid>
            <Grid item xs={6}>
              <IconButton aria-label="delete" className="single-icon-btn" onClick={deleteForm}>
                <DeleteIcon style={{ fontSize: 60 }}/>
              </IconButton>
            </Grid>
            <Grid item xs={6}>
              <p className='icon-tag'>Privado</p>
              <div className="switch-private">
                <PrivateSwitch
                  checked={private_button_state}
                  onChange={handleChangePrivateSwitch}
                  name="checkedA"
                  />
              </div>
            </Grid>
            <Grid item xs={6}>
              <IconButton aria-label="submit" className="single-icon-btn" onClick={submitForms}>
                <CheckCircleIcon style={{ fontSize: 60, color: blue_color}}/>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
    </form>
  );
}