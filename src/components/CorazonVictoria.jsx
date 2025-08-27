import React from 'react';
import '../styles/CorazonVictoria.css';

export default function CorazonVictoria({ onClick }) {
  return (
    <div className="corazon-container">
      <button className="corazon-victoria" onClick={onClick}>
        ❤️
      </button>
    </div>
  );
}
