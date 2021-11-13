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

  const timeConverter = (d = Date()) => {
    const convert = (v) => {
      return parseInt(v) < 10 ? "0" + String(v) : String(v);
    };
    if (d) {
      let date = new Date(d);
      let year = String(date.getFullYear());
      let month = convert(date.getMonth() + 1);
      let dates = convert(date.getDate());
      let hour = convert(date.getHours());
      let min = convert(date.getMinutes());
      let x = year + "-" + month + "-" + dates + "T" + hour + ":" + min;
      return String(x);
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
