import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function MultiSelect({
  options = null,
  name = null,
  secondName = null,
  label = "",
  placeholder = "",
  value = null,
  onChange = null,
}) {
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={options}
      disableCloseOnSelect
      limitTags={3}
      getOptionLabel={(option) => option[name]}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {secondName
            ? `${option[name]}
          ${option[secondName]}`
            : option[name]}
        </React.Fragment>
      )}
      style={{
        width: "100%",
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          id="outlined-basic"
          multiline={false}
          label={label}
          placeholder={placeholder}
          variant="outlined"
        />
      )}
      onChange={(_, newv) => onChange(newv)}
      value={value}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
