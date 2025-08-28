import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/unificados.css";
import OverlayPregunta from "./OverlayPregunta";
import CorazonVictoria from "./CorazonVictoria";
import Swal from "sweetalert2";


const imagenes = [
  "/imagenes/TayFran.jpeg",
  "/imagenes/BesoEnElCuello.jpeg",
  "/imagenes/Ardillita.jpg",
  "/imagenes/Aventura.jpg",
  "/imagenes/Cuidada.jpeg",
  "/imagenes/Inicio.jpg",
  "/imagenes/Tesoro.jpg",
  "/imagenes/TN.jpeg",
  "/imagenes/Susurro.jpeg",
  "/imagenes/Boobs.jpeg",
  "/imagenes/JM.jpg",
  "/imagenes/MYN.jpeg",
  "/imagenes/Vamonos.jpg",
  "/imagenes/Domingo.jpeg",
  "/imagenes/Kiss.jpeg"
];

<audio ref={audioRef} src="/audio/polar5.mp3" />


// Preguntas base
const preguntasBase = [
    { id: 1, pregunta: "¿Qué pasa el 3 de octubre?", 
    opciones: ["Fran se casa y Taylor Swift lanza álbum", "Boda de Tay Tay y Travkilla", "Día internacional de emborracharse en una boda", "Taylor Swift lanza álbum y Fran se casa"], 
    correcta: 3 },

  { id: 2, pregunta: "¿Dónde fue nuestro primer beso?", 
    opciones: ["En un cuarto ajeno", "El segundo piso", "En el jardín", "En la sala"], 
    correcta: 0 },
 
    { id: 3, pregunta: "Si tuviera que escoger un apodo divertido para mí, sería…", 
    opciones: ["Galletita", "Burbuja", "Tornado", "Ardillita"], 
    correcta: 3 },
 
    { id: 4, pregunta: "¿Qué tipo de aventura me encantaría vivir contigo?", 
    opciones: ["Conocer las auroras boreales", "Acampar en el Everest", "Vivir 2 meses en un país donde hablen otro idioma", "Ir al festival de Brazil"], 
    correcta: 2 },
 
    { id: 5, pregunta: "Cuando íbamos de viajes y senderos, lo que más me hacía sentir cuidado era…", 
    opciones: ["Que me esperaras cuando me cansaba", "Que me ayudaras a llevar mis cosas", "Que sacaba fotos de mis momentos graciosos", "Que hicieras chistes malos sobre nuestra supervivencia"], 
    correcta: 0 },
 
    { id: 6, pregunta: "El título de nuestra 'sextape'", 
    opciones: ["Hazel y Enrique: La Saga continúa", "Muslitos y Nalguitas en acción", "Roomies fuera de control", "Comemos primero y luego la cena"], 
    correcta: 1 },
 
    { id: 7, pregunta: "Actividad que nos anima juntos en casa", 
    opciones: ["Cocinar y casi quemar todo", "Jugar juegos de mesa", "Hacer búsquedas del tesoro", "Lavar ropa juntos"], 
    correcta: 2 },
 
    { id: 8, pregunta: "Mi snack favorito cuando estamos juntos es…", 
    opciones: ["Helado", "Palomitas de maíz", "Chocolate"], 
    oculta: "Tus nalguitas", 
    trigger: "Helado", 
    ocultaActivada: false, 
    tipo: "trigger-alert"},
 
    {id: 9,
    pregunta: "Películas que amamos ver juntos",
    opciones: ["Ranch Comedy", "Acción", "Terror"],
    oculta: "Cualquiera de Will Ferrell",
    trigger: "Ranch Comedy",
    ocultaActivada: false,
    tipo: "trigger-alert"
    },
 
    { id: 10, pregunta: "Nuestro plan perfecto de fin de semana incluye…", 
    opciones: ["Ver películas mientras cenamos", "Ir a senderos y parques naturales", "Jugar videojuegos o juegos de mesa"], 
    oculta: "Todas las anteriores", 
    ocultaActivada: false, 
    correcta: 3,
    tipo: "todas"  },
 
    { id: 11, pregunta: "Nuestro plan ideal de domingo juntos es…", 
    opciones: ["Maratón de pelis", "Comer rico", "Comernos ricos"], 
    oculta: "Todas las anteriores", 
    ocultaActivada: false, 
    correcta: 3,
    tipo: "todas" },
 
    { id: 12, pregunta: "Mi beso favorito es…", 
    opciones: ["Beso en la frente", "Beso en la mejilla", "Beso en el cuello"], 
    oculta: "Todas las anteriores", 
    ocultaActivada: false, 
    correcta: 3,
    tipo: "todas"},
 
    { id: 13, pregunta: "Nuestro juego travieso en pareja incluye…", 
    opciones: ["Que abraces inesperadamente", "Cuando me susurres algo travieso", "Cuando me mires fijamente"], 
    oculta: "Que pidas irnos de un sitio porque me quieres coger", 
    trigger: "Cuando me susurres algo travieso", 
    ocultaActivada: false, 
    tipo: "trigger-alert" },
 
    { id: 14, pregunta: "Mi debilidad contigo es…", 
    opciones: ["Cuando me miras fijamente", "Cuando me abrazas sin razón", "Cuando me susurras cosas al oído"], 
    oculta: "Todas las anteriores", 
    ocultaActivada: false, 
    correcta: 3,
    tipo: "todas"},
 
    { id: 15, pregunta: "Qué detalle tuyo a distancia me pone hot?", 
    opciones: ["Mensajes coquetos y provocativos", "Pequeños retos atrevidos", "Fotos sorpresa"], 
    oculta: "Saber que te excita pensar en mí", 
    trigger: "Mensajes coquetos y provocativos", 
    ocultaActivada: false, 
    tipo: "trigger-alert"}
];

export default function QuizRomantico() {
  const [empezar, setEmpezar] = useState(false);
  const [preguntaIndex, setPreguntaIndex] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [victoria, setVictoria] = useState(false);
  const [preguntas, setPreguntas] = useState([]);
  const audioRef = useRef(null);

  const imagenes = [
    imagen1, imagen2, imagen3, imagen4, imagen5,
    imagen6, imagen7, imagen8, imagen9, imagen10,
    imagen11, imagen12, imagen13, imagen14, imagen15
  ];

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Mezclar preguntas al montar
  useEffect(() => {
    const mezcladas = [...preguntasBase].sort(() => Math.random() - 0.5);
    setPreguntas(mezcladas);
  }, []);


const handleChange = (pregId, idx) => {
  const actuales = respuestas[pregId] || [];
  let nuevas = [...actuales];
  const preguntaActual = preguntas.find(p => p.id === pregId);

  // Agregar o quitar selección
  if (nuevas.includes(idx)) {
    nuevas = nuevas.filter(i => i !== idx);
  } else {
    nuevas.push(idx);
  }

  // Determinar tipo de pregunta
  const tipo = preguntaActual.tipo || "trigger";

  if (tipo === "confirm" && idx === 0) {
    Swal.fire({
      text: "¿Quieres marcar esta opción?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No"
    }).then((result) => {
      if (!result.isConfirmed) {
        setPreguntas(prev =>
          prev.map(p =>
            p.id === pregId ? { ...p, ocultaActivada: true } : p
          )
        );
        setRespuestas(prev => ({ ...prev, [pregId]: nuevas }));
      } else {
        setRespuestas(prev => ({ ...prev, [pregId]: actuales }));
      }
    });
  } else if (tipo === "todas") {
    if (!preguntaActual.alertaMostrada) {
      Swal.fire({
        text: "¿No quieres marcar otra?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No"
      }).then((result) => {
        setPreguntas(prev =>
          prev.map(p =>
            p.id === pregId ? { ...p, alertaMostrada: true } : p
          )
        );

        if (!result.isConfirmed && preguntaActual?.oculta) {
          setPreguntas(prev =>
            prev.map(p =>
              p.id === pregId ? { ...p, ocultaActivada: true } : p
            )
          );
        }

        setRespuestas(prev => ({ ...prev, [pregId]: nuevas }));
      });
    } else {
      setRespuestas(prev => ({ ...prev, [pregId]: nuevas }));
    }

    const totalOpciones = preguntaActual.opciones.length;
    if (nuevas.length === totalOpciones && preguntaActual?.oculta) {
      setPreguntas(prev =>
        prev.map(p =>
          p.id === pregId ? { ...p, ocultaActivada: true } : p
        )
      );
    }
  } else if (tipo === "trigger-alert") {
    if (preguntaActual.trigger === preguntaActual.opciones[idx]) {
      Swal.fire({
        text: "¿Estás seguro?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No"
      }).then((result) => {
        if (result.isConfirmed && preguntaActual?.oculta) {
          setPreguntas(prev =>
            prev.map(p =>
              p.id === pregId ? { ...p, ocultaActivada: true } : p
            )
          );
        }
        setRespuestas(prev => ({ ...prev, [pregId]: nuevas }));
      });
    } else {
      setRespuestas(prev => ({ ...prev, [pregId]: nuevas }));
    }
  } else {
    if (preguntaActual?.oculta && preguntaActual.trigger === preguntaActual.opciones[idx]) {
      setPreguntas(prev =>
        prev.map(p =>
          p.id === pregId ? { ...p, ocultaActivada: true } : p
        )
      );
    }
    setRespuestas(prev => ({ ...prev, [pregId]: nuevas }));
  }
};


const handleSubmit = () => {
  // Antes estaba así:
  // const todasRespondidas = preguntas.every(p => (respuestas[p.id] || []).length > 0);

  // Reemplazar por esto:
  const todasRespondidas = preguntas.every(p => {
    const r = respuestas[p.id] || [];
    return r.length > 0 || p.ocultaActivada; // Marca como respondida si tiene respuesta o se activó la oculta
  });

  if (!todasRespondidas) {
    Swal.fire({ text: "Debes responder todas las preguntas", timer: 5000, showConfirmButton: false });
    return;
  }

const handleSubmit = () => {
  // Antes estaba así:
  // const todasRespondidas = preguntas.every(p => (respuestas[p.id] || []).length > 0);

  // Reemplazar por esto:
  const todasRespondidas = preguntas.every(p => {
    const r = respuestas[p.id] || [];
    return r.length > 0 || p.ocultaActivada; // Marca como respondida si tiene respuesta o se activó la oculta
  });

  if (!todasRespondidas) {
    Swal.fire({ text: "Debes responder todas las preguntas", timer: 5000, showConfirmButton: false });
    return;
  }

  const todasCorrectas = true; // Puedes evaluar según tu lógica
  if (todasCorrectas) {
    setVictoria(true);
    Swal.fire({
      text: "Feliz aniversario mi amor, te quiero mucho",
      timer: 5000,
      showConfirmButton: false,
    });
  } else {
    Swal.fire({
      text: "Lo siento mi vida, inténtalo otra vez",
      timer: 5000,
      showConfirmButton: false,
    });
    setRespuestas({});
  }
};

const todasCorrectas = true; // Puedes evaluar según tu lógica
if (todasCorrectas) {
  Swal.fire({
    text: "Feliz aniversario mi amor, te quiero mucho",
    timer: 5000,
    showConfirmButton: false, // Sin botón
    didClose: () => {
      setVictoria(true); // Se muestra el corazón mientras la alerta está activa
      // audioRef.current.play(); // Si quieres reproducir audio al mismo tiempo
    }
  });
} else {
  Swal.fire({
    text: "Lo siento mi vida, inténtalo otra vez",
    timer: 5000,
    showConfirmButton: false, // Sin botón
  });
  setRespuestas({});
}
}
 


  return (
    <div className="quiz-container">
      {!empezar ? (
        <div className="start-screen">
          <h1>¿Sabes que te quiero?</h1>
          <button onClick={() => setEmpezar(true)}>Empezar</button>
        </div>
      ) : (
        <>
          <Swiper
            modules={[Navigation]}
            slidesPerView={1}
            centeredSlides={true}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current
            }}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            onSlideChange={(swiper) => setPreguntaIndex(swiper.activeIndex)}
          >
            {imagenes.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className="slide-wrapper">
                  <img src={img} alt={`slide-${idx}`} className="slide-img" />
                  <OverlayPregunta
                    pregunta={preguntas[idx]}
                    respuestas={respuestas}
                    handleChange={handleChange}
                  />
                </div>
              </SwiperSlide>
            ))}

            <div ref={prevRef} className="swiper-button-prev">❤️</div>
            <div ref={nextRef} className="swiper-button-next">❤️</div>
          </Swiper>

          {!victoria && (
            <button className="btn-finalizar" onClick={handleSubmit}>Finalizar</button>
          )}

          {victoria && <CorazonVictoria audioRef={audioRef} />}

          <audio ref={audioRef} src={audioFile} />
        </>
      )}
    </div>
  );
}