import React from 'react';
import '../styles/OverlayPregunta.css';

export default function OverlayPregunta({ pregunta, respuestas, handleChange }) {
  if (!pregunta) return null; // Si no hay pregunta actual, no renderiza

  const seleccionadas = respuestas[pregunta.id] || [];

  return (
    <div className="overlay-pregunta">
      <h3>{pregunta.pregunta}</h3>
      
      <div className="opciones-container">
        {pregunta.opciones.map((opcion, idx) => (
          <div className="option" key={idx}>
            <input
              type="checkbox"
              checked={seleccionadas.includes(idx)}
              onChange={() => handleChange(pregunta.id, idx)}
            />
            <label>{opcion}</label>
          </div>
        ))}

        {pregunta.oculta && pregunta.ocultaActivada && (
          <div className="option option-oculta">
            <input type="checkbox" checked readOnly />
            <label>{pregunta.oculta}</label>
          </div>
        )}
      </div>
    </div>
  );
}
