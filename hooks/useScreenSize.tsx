import React, { useEffect, useState } from "react";

let debounceTimeout;

const useScreenSize = () => {
  const [size, setSize] = useState(null);

  const getViewportWidth = () => {
    debounceTimeout = setTimeout(() => {
      setSize(window.screen.width);
    }, 200);
  };

  useEffect(() => {
    window.addEventListener("resize", getViewportWidth);

    return () => {
      window.removeEventListener("resize", getViewportWidth);
      if (debounceTimeout) clearTimeout(debounceTimeout);
    };
  });

  return size;
};

export default useScreenSize;
