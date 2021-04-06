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
    '& label.Mui-focused': {
      color: '#79B3CC',
    },
    '& label.Mui-root': {
      color: '#79B3CC',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#79B3CC',
      color: '#79B3CC',
    },
    '& .MuiInput-underline': {
      color: '#79B3CC',
    },
    '& .MuiInput-input:disabled': {
      color: '#79B3CC',
      borderBottom: '2px solid #79B3CC',
    },
    '& .MuiInput-root': {
      color: "white",
      borderColor: '#79B3CC',
    },
    '& .Mui-focused': {
      color: "white",
    },
    '& .Mui-root': {
      color: "white",
    },
    '& .MuiOutlinedInput-root': {
      color: "white",
      borderColor: '#79B3CC',
      '& fieldset': {
        borderColor: '#79B3CC',
        color: '#79B3CC',
      },
      '& label': {
        color: '#79B3CC',
      },
      '&:hover fieldset': {
        borderColor: '#79B3CC',
        color: '#79B3CC',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#79B3CC',
        color: '#79B3CC',
      },
    },
  },
})(TextField);

const PrivateSwitch = withStyles({
  switchBase: {
    color: 'cyan',
    '&$checked': {
      color: 'cyan',
    },
    '&$checked + $track': {
      backgroundColor: 'cyan',
    },
  },
  checked: {},
  track: {},
})(Switch);

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

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <form className="LinkForm" noValidate autoComplete="off">
        <Grid container justify="space-evenly" alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <CssTextField
              className={classes.root}
              label="Nombre"
              variant="outlined"
              id="name-input"
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
          <Grid item xs={2}>
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
          <Grid item xs={10}>
            <CssTextField
              className={classes.root}
              variant= "outlined"
              id="shorturl-input"
            />
          </Grid>
          <Grid item xs={6}>
              <p>Tags</p>
          </Grid>
          <div>
            <Grid container spacing={0}>
              <Grid item xs={6} style={{ backgroundColor: "black"}}>
                <p>Subir imagen</p>
                <IconButton aria-label="delete" className="icon-btn">
                  <WallpaperIcon fontSize="large"/>
                </IconButton>
              </Grid>
              <Grid item xs={6}>
                <IconButton aria-label="delete" className="icon-btn">
                  <DeleteIcon fontSize="large"/>
                </IconButton>
              </Grid>
              <Grid item xs={6}>
                <p>Privado</p>
                <PrivateSwitch
                  className="switch-private"
                  checked={state.checkedA}
                  onChange={handleChange}
                  name="checkedA"
                  />
              </Grid>
              <Grid item xs={6} style={{ backgroundColor: "black"}}>
                <IconButton aria-label="delete" className="icon-btn">
                  <CheckCircleIcon style={{ fontSize: 60 }}/>
                </IconButton>
              </Grid>
            </Grid>
          </div>
        </Grid>
    </form>
  );
}