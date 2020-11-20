import React, { useEffect, useRef, useState } from "react";

export const Drawing = () => {
  const canvasRef = useRef(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [context, setContext] = useState(null);
  const [currentDrawing, setCurrentDrawing] = useState([]);

  const handleMouseDown = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMouseDown(true);
    console.log(x, y);
    context.fillStyle = "black";
    context.fillRect(x, y, 5, 5);
  };

  const handleMouseUp = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMouseDown(false);
    console.log(x, y);
    context.fillStyle = "black";
    context.fillRect(x, y, 5, 5);
  };

  const handleClick = (e) => {
    if (mouseDown) {
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      console.log(x, y);
      context.fillStyle = "black";
      context.fillRect(x, y, 5, 5);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    setContext(ctx);

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 600, 600);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={canvasStyle}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleClick}
      width="600px"
      height="600pxtargetY"
    >
      You need JavaScript
    </canvas>
  );
};

const canvasStyle = {
  border: "solid 1px black",
};
