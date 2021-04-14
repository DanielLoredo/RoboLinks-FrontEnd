import React from 'react';
import TextField from '@material-ui/core/TextField';
import './index.scss';
import Grid from '@material-ui/core/Grid';
import {
  withStyles,
  makeStyles,
} from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const blue_color = "#97DFFC";

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

const CssTextField = withStyles({
  root: {
    color: '#79B3CC',
    borderColor: '#79B3CC',
    '& .MuiInput-underline': {
      color: '#79B3CC',
    },
    '& .MuiInput-input:disabled': {
      borderBottom: '2px solid #79B3CC',
    },
    '& .MuiInputLabel-root': {
      color: "#79B3CC",
    },
    '& .MuiOutlinedInput-root': {
      color: "white",
      '& fieldset': {
        borderColor: '#79B3CC',
      },
      '&:hover fieldset': {
        borderColor: '#79B3CC',
      },
      '& .Mui-disabled': {
        backgroundColor: 'black',
      },
    },
  },
})(TextField);

const PrivateSwitch = withStyles({
  height: "10vh",
  switchBase: {
    color: "#6b98a8",
    '&$checked': {
      color: blue_color,
    },
    '&$checked + $track': {
      backgroundColor: '#E5E5E5',
    },
  },
  checked: {},
  track: {},
})(Switch);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      styles={{backgroundColor: "white"}}
    >
    <Box p={3}>
      <Typography>{children}</Typography>
    </Box>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles2 = makeStyles((theme) => ({
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
      border:  '2px solid #79B3CC',
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
}));

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    // flexWrap: 'wrap',
    color: "#79B3CC",
    borderColor: '#79B3CC',
    width: "100%",
  },
  input: {
    display: 'none',
  }
}));

export default function CreateLinkForm(props) {
  const classes = useStyles();
  const classes2 = useStyles2();

  const tag_color = ["transparent", blue_color]
  const tag_text = [blue_color, "#101935"]

  const [link_data, setLinkData] = React.useState(props.link_data);

  const getDefinedTags = () =>{
    var tags = new Array(link_tags.length).fill(0)
    for (var i = 0; i<link_data.tags.length; i++) {
      tags[link_tags.indexOf(link_data.tags[i])] = 1
    }
    return tags
  }

  const [private_button_state, setPrivateButtonState] = React.useState(false);

  const [selected_tag, setSelectedTag] = React.useState(getDefinedTags());

  const handleChangeTag = (event, newValue) => {
    var new_array = [...selected_tag]
    new_array[newValue] = (new_array[newValue] === 0) ? 1 : 0;
    setSelectedTag(new_array)
  };

  const handleChangePrivateSwitch = (event) => {
    setPrivateButtonState(!private_button_state);
  };

  const handleChangeTitle = (event) => {
    var update = link_data
    update.title = event.target.value
    setLinkData(update);
  };

  const handleChangeURL = (event) => {
    var update = link_data
    update.URL = event.target.value
    setLinkData(update);
  };

  const handleChangeShortLink = (event) => {
    var update = link_data
    update.short_link = event.target.value
    setLinkData(update);
  };

  const deleteForm = () => {
    alert("Delete data")
  }

  const submitForms = (event) => {
    var tags = []
    for (var i = 0; i<selected_tag.length; i++) {
      if (selected_tag[i]){
        tags.push(link_tags[i])
      }
    }
    var update = link_data
    update.tags = tags
    update.private = private_button_state
    var str = JSON.stringify(link_data, null, 4);
    alert(str)
  };

  return (
    <form className="LinkForm" noValidate autoComplete="off" >
        <Grid container justify="space-evenly" alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <CssTextField
              className={classes.root}
              label="Link Title"
              variant="outlined"
              id="link-title-input"
              defaultValue={link_data.title}
              onChange={handleChangeTitle}
            />
          </Grid>
          <Grid item xs={12}>
            <CssTextField
              className={classes.root}
              label="URL"
              variant="outlined"
              id="url-input"
              defaultValue={link_data.URL}
              disabled={link_data? true: false}
              onChange={handleChangeURL}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <CssTextField
              className={classes.root}
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
            <CssTextField
              className={classes.root}
              variant= "outlined"
              id="shorturl-input"
              defaultValue={link_data.short_link}
              onChange={handleChangeShortLink}
            />
          </Grid>
          <Grid item xs={6} className='tags'>
              <p className='icon-tag'>Tags</p>
              <div className={classes2.root}>
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={false}
                  onChange={handleChangeTag}
                  aria-label="Vertical tabs example"
                  className={classes2.tabs}
                  scrollButtons="on"
                >
                  { link_tags.map((tag, id) => (
                    <Tab label={tag} {...a11yProps(id)} style={{backgroundColor: tag_color[selected_tag[id]], color: tag_text[selected_tag[id]], margin: "1vh 0 0 0"}}/>))}
                </Tabs>
              </div>
          </Grid>
          <Grid container item spacing={0} xs={6}>
            <Grid item xs={6}>
              <p className='icon-tag'>Subir imagen</p>
              <input accept="image/*" className={classes.input} id="icon-button-file" type="file"/>
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