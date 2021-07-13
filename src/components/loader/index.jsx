import React from "react";
import PortalWrapper from "../portal";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector } from "react-redux";

const Loader = () => {
  const { loader } = useSelector((state) => state);
  return (
    <>
      {loader > 0 && (
        <PortalWrapper
          top="0"
          background="rgb(0, 0, 0,0.5)"
          justify="center"
          align="center"
        >
          <CircularProgress
            style={{ height: "60px", width: "60px", color: "green" }}
          />
        </PortalWrapper>
      )}
    </>
  );
};

export default Loader;
