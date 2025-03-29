"use client";

import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

export function Confetti() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Set initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Update dimensions on window resize
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ReactConfetti
      width={dimensions.width}
      height={dimensions.height}
      numberOfPieces={200}
      recycle={false}
      colors={[
        "#FFD700", // Gold
        "#FFA500", // Orange
        "#FF69B4", // Pink
        "#4CAF50", // Green
        "#2196F3", // Blue
      ]}
    />
  );
}
