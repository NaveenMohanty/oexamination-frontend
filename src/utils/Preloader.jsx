import React from "react";
import Loader from "../components/loader";
import AlertSnackBar from "../components/alertsnackbar";

const Preloader = () => {
  return (
    <>
      <AlertSnackBar />
      <Loader />
    </>
  );
};

export default Preloader;
