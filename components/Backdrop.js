import React from "react";

export const Backdrop = (props) => {
  return (
    <div style={backdropStyle}>
      <div style={componentStyle}>{props.children}</div>
    </div>
  );
};

const backdropStyle = {
  position: "fixed",
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "solid 3px black",
  top: "0",
  left: "0",
  backgroundColor: "rgba(0,0,0,0.4)",
};

const componentStyle = {};

export default Backdrop;
