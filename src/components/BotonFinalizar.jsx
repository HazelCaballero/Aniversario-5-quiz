import React from 'react';
import '../styles/BotonFinalizar.css';

export default function BotonFinalizar({ handleSubmit, disabled }) {
  return (
    <div className="boton-finalizar-container">
      <button
        className="btn-finalizar"
        onClick={handleSubmit}
        disabled={disabled}
      >
        Finalizar
      </button>
    </div>
  );
}
