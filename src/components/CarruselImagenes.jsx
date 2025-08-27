import React from 'react';
import '../styles/CarruselImagenes.css';

export default function CarruselImagenes({ imagenes, currentIndex, setCurrentIndex }) {

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="carrusel-container">
      <button className="btn-nav btn-nav-left" onClick={handlePrev}>{"<"}</button>
      
      <div className="carrusel-central">
        <img
          src={imagenes[currentIndex]}
          alt={`imagen-${currentIndex}`}
          className="img-central"
        />
      </div>
      
      <button className="btn-nav btn-nav-right" onClick={handleNext}>{">"}</button>

      <div className="carrusel-lateral carrusel-prev">
        <img
          src={imagenes[(currentIndex === 0 ? imagenes.length - 1 : currentIndex - 1)]}
          alt="prev"
          className="img-lateral"
        />
      </div>

      <div className="carrusel-lateral carrusel-next">
        <img
          src={imagenes[(currentIndex === imagenes.length - 1 ? 0 : currentIndex + 1)]}
          alt="next"
          className="img-lateral"
        />
      </div>
    </div>
  );
}
