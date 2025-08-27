import React from 'react';
import '../styles/Alertas.css';

export default function Alertas({ mensaje, tipo, onConfirm, onCancel, visible }) {
  if (!visible) return null;

  return (
    <div className={`alerta alerta-${tipo}`}>
      <p>{mensaje}</p>

      {tipo === 'confirm' && (
        <div className="alerta-buttons">
          <button className="btn-aceptar" onClick={onConfirm}>Sí</button>
          <button className="btn-cancelar" onClick={onCancel}>No</button>
        </div>
      )}
    </div>
  );
}
