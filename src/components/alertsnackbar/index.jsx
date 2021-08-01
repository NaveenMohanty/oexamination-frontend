import React, { useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useSelector, useDispatch } from "react-redux";
import { UNSET_ALERT } from "../../redux/types";

function Alert(props) {
  return <MuiAlert elevation={6} {...props} />;
}

// types can be error(red),info(blue),success(green and is default),warning(yellow)
export default function CustomizedSnackbars() {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
    type: "success",
    duration: null,
  });
  const { vertical, horizontal, open, message, type, duration } = state;
  useEffect(() => {
    const { message, type, duration } = alert;
    let timer = null;
    if (message && type && duration) {
      setState({
        ...state,
        open: true,
        message: message,
        type: type,
        duration: duration,
      });
      timer = setInterval(() => {
        dispatch({ type: UNSET_ALERT, payload: {} });
        setState({
          ...state,
          open: false,
        });
      }, duration + 100);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };
  }, [alert, dispatch]);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState((x) => ({ ...x, open: false }));
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration || 3000}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
    >
      <Alert onClose={handleClose} severity={type || "success"}>
        {message || ""}
      </Alert>
    </Snackbar>
  );
}
