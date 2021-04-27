
import React from "react";
import { AddCircle } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import CreateLinkForm from '../../CreateLinkForm'
import Modal from '@material-ui/core/Modal';
import './index.scss';
import { makeStyles } from '@material-ui/core/styles';
import link_data from './data.json'

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'relative',
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7);",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(10, 10, 10),
  },
}));

export default function AddLinkButton(){
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
  <>
    <IconButton
      aria-label="add-link"
      className="Links-add-button"
      onClick={handleOpen}  
    >
      <AddCircle alt="Add link icon" className="Links-add-icon darken-on-hover"/>
    </IconButton>
    <Modal
      style={modalStyle} className={classes.paper}
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
        <CreateLinkForm />
    </Modal>
  </>
  )
}
