import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

const ScratchCard = ({ width = 300, height = 200, revealMessage = "You Won!" }) => {
  const canvasRef = useRef(null);
  const [isScratched, setIsScratched] = useState(false);
  const [scratchCount, setScratchCount] = useState(0); 

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;


    ctx.fillStyle = "#ccc";
    ctx.fillRect(0, 0, width, height);


    ctx.fillStyle = "#666";
    ctx.font = "20px Arial";
    ctx.fillText("Scratch Here!", width / 4, height / 2);

    const scratch = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2, false);
      ctx.fill();
    };

    const handleMouseMove = (e) => {
      if (isScratched) return;
      scratch(e);
    };

    const handleMouseDown = () => {
      setScratchCount((count) => count + 1);
      if (scratchCount >= 2) {  
        revealPrize();
      }
      canvas.addEventListener("mousemove", handleMouseMove);
    };

    const handleMouseUp = () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };

    const revealPrize = () => {
      setIsScratched(true);
      gsap.to(canvas, { opacity: 0, duration: 1 });
    };


    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);


    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isScratched, scratchCount, width, height]);

  return (
    <div style={{ position: "relative", width, height }}>
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0 }} />
      {isScratched && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "gold",
            color: "black",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          {revealMessage}
        </div>
      )}
    </div>
  );
};

export default ScratchCard;
