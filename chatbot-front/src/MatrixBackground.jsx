import React, { useRef, useEffect, useState } from "react";

const MatrixBackground = ({
  backgroundColor = "rgba(0, 0, 0, 0.1)",
  fontColor = "#009768", // The main green color
  glowColor = "#0f0",    // The brighter green for the glow
  headColor = "green",   // The color of the leading character
  fontSize = 20,
  characters = "01学年別漢字配当表#&*()_+",
  animationSpeed = 40, 
  fadeOnLoad = true,
  fadeDuration = 2000, 
  initialOpacity = 0.4,
}) => {
  const canvasRef = useRef(null);
  const requestRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let columns, drops;

    const initialize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(canvas.height / fontSize); // Start off-screen
    };

    const draw = () => {
      // Background with a fade effect
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        
        // Style for the leading character (the "head" of the raindrop)
        ctx.fillStyle = headColor;
        ctx.shadowBlur = 20;
        ctx.shadowColor = glowColor;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Style for the trailing characters
        ctx.fillStyle = fontColor;
        ctx.shadowBlur = 0; // Turn off glow for the trail
        // This draws the previous character again in the standard color, creating the trail effect
        if (drops[i] > 1) {
            const prevText = characters[Math.floor(Math.random() * characters.length)];
            ctx.fillText(prevText, i * fontSize, (drops[i] - 1) * fontSize);
        }

        // Reset drop when it goes off-screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    let lastTime = 0;
    const animate = (timestamp) => {
      if (timestamp - lastTime > animationSpeed) {
        draw();
        lastTime = timestamp;
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    initialize();
    window.addEventListener("resize", initialize);
    animate(0);

    if (fadeOnLoad) {
      // Trigger the fade-in effect
      setTimeout(() => setIsLoaded(true), 100);
    }

    // Cleanup function
    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener("resize", initialize);
    };
  }, [backgroundColor, fontColor, glowColor, headColor, fontSize, characters, animationSpeed, fadeOnLoad]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        opacity: fadeOnLoad ? (isLoaded ? initialOpacity : 0) : initialOpacity,
        transition: fadeOnLoad ? `opacity ${fadeDuration}ms ease-in-out` : 'none',
      }}
    />
  );
};

export default MatrixBackground;