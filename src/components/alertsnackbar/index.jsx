import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
//types can be error(red),info(blue),success(green and is default),warning(yellow)
export default function CustomizedSnackbars({
  message = "",
  type = "success",
  duration = "3000",
}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    open: true,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState((x) => ({ ...x, open: false }));
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
    >
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
}
