import React, { useState, useRef } from 'react';
import CarruselImagenes from './CarruselImagenes';
import OverlayPregunta from './OverlayPregunta';
import BotonFinalizar from './BotonFinalizar';
import CorazonVictoria from './CorazonVictoria';
import Alertas from './Alertas';
import '../styles/QuizRomantico.css';
import audioFile from '../assets/audio/polar5.mp3';

import imagen1 from '../assets/imagenes/Beso en el cuello.jpeg';
import imagen2 from '../assets/imagenes/TayFran.jpeg';
import imagen3 from '../assets/imagenes/Boobs.jpeg';
import imagen4 from '../assets/imagenes/Ardillita.jpg';
import imagen5 from '../assets/imagenes/Inicio.jpg';
import imagen6 from '../assets/imagenes/Aventura.JPG';
import imagen7 from '../assets/imagenes/Cuidada.jpeg';
import imagen8 from '../assets/imagenes/MYN.jpeg';
import imagen9 from '../assets/imagenes/Susurro.jpeg';
import imagen10 from '../assets/imagenes/Tesoro.jpg';
import imagen11 from '../assets/imagenes/JM.jpg';
import imagen12 from '../assets/imagenes/TN.jpeg';
import imagen13 from '../assets/imagenes/Vamonos.jpg';
import imagen14 from '../assets/imagenes/Domingo.jpeg';
import imagen15 from '../assets/imagenes/Kiss.jpeg';

const imagenes = [
  imagen1, imagen2, imagen3, imagen4, imagen5,
  imagen6, imagen7, imagen8, imagen9, imagen10,
  imagen11, imagen12, imagen13, imagen14, imagen15
];

export default function QuizRomantico() {
  const [empezar, setEmpezar] = useState(false);
  const [victoria, setVictoria] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [opcionesOcultas, setOpcionesOcultas] = useState({});
  const [alerta, setAlerta] = useState({ visible: false, mensaje: '', tipo: 'auto' });

  const audioRef = useRef(null);

  // === PREGUNTAS ===
  const preguntas = [
    // 1 a 15 según el orden final acordado
    { id: 1, pregunta: "¿Qué me gusta más de ti?", opciones: ["Beso en el cuello", "Abrazos largos", "Susurros tiernos"], correcta: 0 },
    { id: 2, pregunta: "¿Qué pasa el 3 de octubre?", opciones: ["Fran se casa y Taylor Swift lanza álbum","Boda de Tay Tay y Travkilla","Día internacional de emborracharse en una boda","Taylor Swift lanza álbum y Fran se casa"], correcta: 3 },
    { id: 3, pregunta: "Mi debilidad contigo es…", opciones: ["Cuando me miras fijamente","Cuando me abrazas sin razón","Cuando me susurras cosas al oído"], correcta: 3, oculta: "Todas las anteriores", tipo: 1 },
    { id: 4, pregunta: "Si tuviera que escoger un apodo divertido para mí, sería…", opciones: ["Galletita","Burbuja","Tornado","Ardillita"], correcta: 3 },
    { id: 5, pregunta: "Mi snack favorito cuando estamos juntos es…", opciones: ["Helado","Palomitas de maíz","Chocolate"], correcta: 3, oculta: "Tus nalguitas", tipo: 2, trigger: 0 },
    { id: 6, pregunta: "¿Qué tipo de aventura me encantaría vivir contigo?", opciones: ["Conocer las auroras boreales","Acampar en el Everest","Vivir 2 meses en un país donde hablen otro idioma","Ir al festival de Brazil"], correcta: 2 },
    { id: 7, pregunta: "Cuando íbamos de viajes y senderos, lo que más me hacía sentir cuidado era…", opciones: ["Que me esperaba cuando me cansaba","Que me ayudara a llevar mis cosas","Que sacaba fotos de mis momentos graciosos","Que hacía chistes malos sobre nuestra supervivencia"], correcta: 0 },
    { id: 8, pregunta: "Películas que amamos ver juntos", opciones: ["Ranch Comedy","Acción","Terror"], correcta: 3, oculta: "Opción secreta Will Ferrell", tipo: 2, trigger: 0 },
    { id: 9, pregunta: "El título de nuestra 'sextape' estilo Brooklyn 99", opciones: ["Hazel y Enrique: La Saga continúa","Muslitos y Nalguitas en acción","Roomies fuera de control","Comemos primero y luego la cena"], correcta: 1 },
    { id: 10, pregunta: "Actividad que nos anima juntos en casa", opciones: ["Cocinar y casi quemar todo","Jugar juegos de mesa","Hacer búsquedas del tesoro","Lavar ropa juntos"], correcta: 2 },
    { id: 11, pregunta: "Nuestro plan ideal de domingo juntos es…", opciones: ["Maratón de pelis","Comer rico","Comernos ricos"], correcta: 3, oculta: "Todas las anteriores", tipo: 1 },
    { id: 12, pregunta: "Pensamientos atrevidos a distancia", opciones: ["Mensajes coquetos","Pequeños retos atrevidos","Fotos sorpresa"], correcta: 3, oculta: "Saber que te excita pensar en mí", tipo: 2, trigger: 0 },
    { id: 13, pregunta: "Qué me haría pedir irnos de un sitio juntos", opciones: ["Cuando me abrazas","Cuando me toca la mano","Cuando me desea"], correcta: 3, oculta: "Que me pide irnos porque me desea", tipo: 2, trigger: 2 },
    { id: 14, pregunta: "Domingo perfecto juntos", opciones: ["Maratón de pelis","Comer rico","Paseo por el parque"], correcta: 2 },
    { id: 15, pregunta: "Un momento hot cuando estamos juntos", opciones: ["Besos intensos","Caricias suaves","Susurros provocativos"], correcta: 2 },
  ];

  // === HANDLER DE CAMBIO DE OPCIONES ===
  const handleChange = (pregId, idx) => {
    const pregunta = preguntas.find(p => p.id === pregId);
    const actuales = respuestas[pregId] || [];
    let nuevas = [...actuales];

    if (nuevas.includes(idx)) {
      nuevas = nuevas.filter(i => i !== idx);
    } else {
      nuevas.push(idx);
    }

    // Logica tipo 1
    if (pregunta.tipo === 1 && nuevas.length === pregunta.opciones.length) {
      setOpcionesOcultas({...opcionesOcultas, [pregId]: true});
      nuevas = []; // desmarcar todas
    }

    // Logica tipo 2
    if (pregunta.tipo === 2 && idx === pregunta.trigger && !opcionesOcultas[pregId]) {
      setAlerta({ visible: true, mensaje: "¿Quieres marcar esta opción?", tipo: "confirm",
        onConfirm: () => {
          setOpcionesOcultas({...opcionesOcultas, [pregId]: false});
          setAlerta({ ...alerta, visible: false });
        },
        onCancel: () => {
          setOpcionesOcultas({...opcionesOcultas, [pregId]: true});
          nuevas = []; // desmarcar
          setAlerta({ ...alerta, visible: false });
        }
      });
    }

    setRespuestas({...respuestas, [pregId]: nuevas});
  };

  // === HANDLER DE FINALIZAR ===
  const handleSubmit = () => {
    // Validar que todas estén respondidas
    const todasRespondidas = preguntas.every(p => respuestas[p.id]?.length > 0 || opcionesOcultas[p.id]);
    if (!todasRespondidas) {
      setAlerta({ visible: true, mensaje: "Debes responder todas las preguntas", tipo: "auto" });
      setTimeout(()=> setAlerta({ ...alerta, visible:false }), 5000);
      return;
    }

    // Validar si ganó
    const todasCorrectas = preguntas.every(p => {
      if (p.tipo && opcionesOcultas[p.id]) return true;
      return respuestas[p.id]?.includes(p.correcta);
    });

    if (todasCorrectas) {
      setVictoria(true);
    } else {
      setAlerta({ visible: true, mensaje: "Lo siento mi vida, inténtalo otra vez 😢", tipo: "auto" });
      setTimeout(() => setAlerta({ ...alerta, visible:false }), 5000);
      setRespuestas({});
      setOpcionesOcultas({});
    }
  };

  const preguntaActual = preguntas[currentIndex];

  return (
    <div className="quiz-container">
      {!empezar ? (
        <div className="start-screen">
          <h1>¿Sabes que te quiero? ❤️</h1>
          <button onClick={() => setEmpezar(true)}>Empezar</button>
        </div>
      ) : (
        <>
          <CarruselImagenes
            imagenes={imagenes}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />

          <OverlayPregunta
            pregunta={{ ...preguntaActual, ocultaActivada: opcionesOcultas[preguntaActual.id] }}
            respuestas={respuestas}
            handleChange={handleChange}
          />

          {!victoria ? (
            <BotonFinalizar
              handleSubmit={handleSubmit}
              disabled={false}
            />
          ) : (
            <CorazonVictoria
              onClick={() => audioRef.current.play()}
            />
          )}

          <audio ref={audioRef} src={audioFile} />

          <Alertas
            mensaje={alerta.mensaje}
            tipo={alerta.tipo}
            visible={alerta.visible}
            onConfirm={alerta.onConfirm}
            onCancel={alerta.onCancel}
          />
        </>
      )}
    </div>
  );
}
