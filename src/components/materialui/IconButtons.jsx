import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

const IconButtons = ({
  tooltipTitle = null,
  tooltipPlacement = "bottom",
  onClick = null,
  children = null,
  ...rest
}) => {
  return (
    <>
      <Tooltip
        style={{ zIndex: 500 }}
        title={tooltipTitle}
        placement={tooltipPlacement}
      >
        <IconButton style={rest} onClick={onClick}>
          {children}
        </IconButton>
      </Tooltip>
    </>
  );
};

export default IconButtons;
