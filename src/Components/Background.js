import React, { useEffect, useState } from 'react';

const colors = [  '#1DB954', // Spotify green
    " rgb(6, 48, 54)", //Dark blue
    '#191414', // Spotify black
    '#535353', // Spotify gray
    '#121212', // Dark theme background
    '#FF7F50', // Coral
    '#FF4500', // OrangeRed
    '#8A2BE2', // BlueViolet
    '#00CED1', // DarkTurquoise
    '#FF69B4', // HotPink
    '#FFD700', // Gold
  ]; // Array of colors

function Background() {
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 20000); // 20000 milliseconds = 20 second

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = colors[colorIndex];
  }, [colorIndex]);

  return (
    <div className="background">
     
    </div>
  );
}

export default Background;
