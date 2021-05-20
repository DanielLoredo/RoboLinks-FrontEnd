import React from "react";
import { useDispatch } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { GoogleLogin } from "react-google-login";
import { AccountCircle } from "@material-ui/icons";

import { getUserType as getUserTypeAction } from "../../store/auth";
import { getUserTypeByEmail } from "../../scripts/apiScripts";

import { baby_blue } from "../colors";
import "./index.scss";

import { selectUser } from "../../store/auth/selectors";
import { useSelector } from "react-redux";

const StyledMenu = withStyles({
  paper: {
    backgroundColor: baby_blue,
  },
})((props) => (
  <Menu
    style={{ position: "absolute" }}
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
));

const StyledButton = withStyles((theme) => ({
  root: {
    "& .MuiButton-startIcon": {
      marginLeft: 0,
      marginRight: 0,
    },
    "& .MuiButton-text": {
      padding: 0,
    },
  },
}))(Button);

function SignUser() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [signedIn, setSignedIn] = React.useState(false);
  const user = useSelector(selectUser);

  const responseGoogle = (response) => {
    let userEmail = response.profileObj.email;
    getUserTypeByEmail(userEmail)
      .then((response) => {
        dispatch(getUserTypeAction({ auth: response.data }));
        setSignedIn(true);
      })
      .catch((error) => {
        throw new Error(`Could not get the user type.\n\nReason: ${error}`);
      });
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(user);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <StyledButton
        aria-controls="customized-menu"
        aria-haspopup="true"
        onClick={handleClick}
        startIcon={
          <AccountCircle
            alt="Avatar fallback icon"
            className={
              signedIn ? "Navbar-avatar Navbar-avatar-logged" : "Navbar-avatar"
            }
          />
        }
      ></StyledButton>
      {signedIn === false && (
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem style={{ padding: "0px 8px 0px 8px" }}>
            <GoogleLogin
              clientId="573398896027-gp705519dusk7m5n5467be89mt3jug8q.apps.googleusercontent.com"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />
          </MenuItem>
        </StyledMenu>
      )}
    </div>
  );
}

export default SignUser;