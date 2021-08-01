import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DateAndTimePicker({
  onChange,
  title = "",
  defaultValue = null,
}) {
  const classes = useStyles();
  // const [timeDefault, setTimeDefault] = useState("");
  // useEffect(() => {
  //   setTimeDefault(defaultValue);
  // }, [defaultValue]);
  const handel = (e) => {
    let value = e.target.value;
    let year = parseInt(value.slice(0, 4));
    let month = parseInt(value.slice(5, 7)) - 1;
    let day = parseInt(value.slice(8, 10));
    let hours = parseInt(value.slice(11, 13));
    let minutes = parseInt(value.slice(14, 16));
    let date = new Date(year, month, day, hours, minutes, 0, 0);
    onChange(date.toString());
  };

  const timeConverter = (date = Date()) => {
    if (date) {
      var D = new Date(date);
      let option = { hour12: false };
      let dateString = `${D.getFullYear()}-${
        D.getMonth() + 1 < 10 ? `0${D.getMonth() + 1}` : `${D.getMonth() + 1} `
      }-${
        D.getDate() < 10 ? `0${D.getDate()}` : `${D.getDate()}`
      }T${D.toLocaleTimeString("en-US", option)}`;
      return dateString;
    }
  };

  return (
    <TextField
      id="datetime-local"
      label={title}
      type="datetime-local"
      value={timeConverter(defaultValue) || ""}
      className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={handel}
    />
  );
}
