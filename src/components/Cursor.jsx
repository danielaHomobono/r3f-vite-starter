import { useEffect, useRef, useState } from "react";

const CURSOR_SPEED = 0.08;

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

export const Cursor = () => {
  const cursorOutline = useRef(null);
  const [hoverButton, setHoverButton] = useState(false);
  const [hue, setHue] = useState(0);

  const animate = () => {
    let distX = mouseX - outlineX;
    let distY = mouseY - outlineY;

    outlineX = outlineX + distX * CURSOR_SPEED;
    outlineY = outlineY + distY * CURSOR_SPEED;

    if (cursorOutline.current) {
      cursorOutline.current.style.left = `${outlineX}px`;
      cursorOutline.current.style.top = `${outlineY}px`;
    }

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const onMouseMove = (event) => {
      mouseX = event.pageX;
      mouseY = event.pageY;
      setHue((prevHue) => (prevHue + 1) % 360);
    };

    document.addEventListener("mousemove", onMouseMove);
    requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  useEffect(() => {
    const onMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === "button" ||
        e.target.parentElement.tagName.toLowerCase() === "button" ||
        e.target.tagName.toLowerCase() === "input" ||
        e.target.tagName.toLowerCase() === "textarea"
      ) {
        setHoverButton(true);
      } else {
        setHoverButton(false);
      }
    };

    document.addEventListener("mouseover", onMouseOver);

    return () => {
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  return (
    <div
      className={`z-50 fixed -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-transform ${
        hoverButton
          ? "bg-transparent border-2 border-indigo-900 w-5 h-5"
          : "w-4 h-4"
      }`}
      ref={cursorOutline}
      style={{
        backgroundColor: hoverButton ? "transparent" : `hsl(${hue}, 100%, 50%)`,
      }}
    ></div>
  );
};
