import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

const IconButtons = ({
  tooltipTitle = null,
  onClick = null,
  Icon = null,
  children = null,
  ...rest
}) => {
  return (
    <>
      <Tooltip title={tooltipTitle}>
        <IconButton style={rest} onClick={onClick}>
          {children}
        </IconButton>
      </Tooltip>
    </>
  );
};

export default IconButtons;
