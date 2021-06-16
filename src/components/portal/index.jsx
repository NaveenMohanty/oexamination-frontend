import React from "react";
import ReactDom from "react-dom";
import { Container } from "../../styled";

const Index = (props) => {
  let params = { ...props };

  params.height = props.height || "100%";

  params.width = params.width || "100%";

  params.zIndex = props.zIndex || 2;

  if (!props.top || !props.bottom || !props.left || !props.right) {
    params.top = "0px";
  }
  params.position = "absolute";
  return ReactDom.createPortal(
    <Container {...params}>{props.children}</Container>,
    document.getElementById("portal")
  );
};

export default Index;
