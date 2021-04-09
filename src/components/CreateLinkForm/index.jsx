import React from 'react';
import TextField from '@material-ui/core/TextField';
import './index.scss';
import Grid from '@material-ui/core/Grid';
import {
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
  "Classes/Workshops",
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

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'cyan',
      light: '#757ce8',
      dark: '#002884',
      contrastText: '#fff',
    }
  },
});

const CssTextField = withStyles({
  root: {
    color: '#79B3CC',
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
      '&.Mui-focused fieldset': {
        borderColor: '#79B3CC',
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
    // backgroundColor: 'white',
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
    },
    '& .MuiTabs-scrollButtons': {
      // backgroundColor: "red",
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
}));

export default function CreateLinkForm() {
  const classes = useStyles();
  const classes2 = useStyles2();

  const tag_color = ["transparent", blue_color]
  const tag_text = [blue_color, "#101935"]

  // const [value, setValue] = React.useState(0);
  const [selected, setSelected] = React.useState(new Array(link_tags.length).fill(0));

  const handleChangeTag = (event, newValue) => {
    var new_array = [...selected]
    new_array[newValue] = (new_array[newValue] === 0) ? 1 : 0;
    setSelected(new_array)
  };

  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const submitForms = (event, newValue) => {
    alert("form submitted")
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
            />
          </Grid>
          <Grid item xs={12}>
            <CssTextField
              className={classes.root}
              label="URL"
              variant="outlined"
              id="url-input"
            />
          </Grid>
          <Grid item xs={3}>
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
          <Grid item xs={9}>
            <CssTextField
              className={classes.root}
              variant= "outlined"
              id="shorturl-input"
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
                    <Tab label={tag} {...a11yProps(id)} style={{backgroundColor: tag_color[selected[id]], color: tag_text[selected[id]], margin: "1vh 0 0 0"}}/>))}
                </Tabs>
              </div>
          </Grid>
          <Grid container item spacing={0} xs={6}>
            <Grid item xs={6}>
              <p className='icon-tag'>Subir imagen</p>
              <IconButton aria-label="add-image" className="icon-btn">
                <WallpaperIcon style={{ fontSize: 40 }}/>
              </IconButton>
            </Grid>
            <Grid item xs={6}>
              <IconButton aria-label="delete" className="single-icon-btn">
                <DeleteIcon style={{ fontSize: 60 }}/>
              </IconButton>
            </Grid>
            <Grid item xs={6}>
              <p className='icon-tag'>Privado</p>
              <div className="switch-private">
                <PrivateSwitch
                  checked={state.checkedA}
                  onChange={handleChange}
                  name="checkedA"
                  />
              </div>
            </Grid>
            <Grid item xs={6}>
              <IconButton aria-label="delete" className="single-icon-btn" onClick={submitForms}>
                <CheckCircleIcon style={{ fontSize: 60, color: blue_color}}/>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
    </form>
  );
}