import React, { useState } from 'react';
import '../styles/unificados.css';

export default function CorazonVictoria({ audioRef }) {
  const [reproduciendo, setReproduciendo] = useState(false);

  const handleClick = () => {
    if (!audioRef.current) return;
    if (reproduciendo) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setReproduciendo(!reproduciendo);
  };

  return (
    <div className="corazon-victoria" onClick={handleClick} title={reproduciendo ? "Pausar" : "Reproducir"}>
      ❤️
    </div>
  );
}
