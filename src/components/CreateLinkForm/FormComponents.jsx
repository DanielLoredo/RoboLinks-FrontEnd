import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import {
  withStyles,
} from '@material-ui/core/styles';
import {
  blue_color,
  baby_blue,
  light_gray,
  tame_blue,
} from '../colors';


export const PrivateSwitch = withStyles({
    height: "10vh",
    switchBase: {
      color: tame_blue,
      '&$checked': {
        color: blue_color,
      },
      '&$checked + $track': {
        backgroundColor: light_gray,
      },
    },
    checked: {},
    track: {},
  })(Switch);

export const FormTextField = withStyles({
    root: {
      color: baby_blue,
      borderColor: baby_blue,
      width: "100%",
      '& input:valid:focus + fieldset': {
        borderColor: baby_blue,
      },
      '& .MuiInput-underline': {
        color: baby_blue,
      },
      '& .MuiInput-input:disabled': {
        borderBottom: '2px solid ' + baby_blue,
      },
      '& .MuiInputLabel-root': {
        color: baby_blue,
      },
      '& .MuiOutlinedInput-root': {
        color: "white",
        '& fieldset': {
          borderColor: baby_blue,
        },
        '&:hover fieldset': {
          borderColor: baby_blue,
        },
        '& .Mui-disabled': {
          backgroundColor: 'black',
          borderRadius: '5px'
        },
      },
    },
})(TextField);

export function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}