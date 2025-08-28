import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/unificados.css";
import OverlayPregunta from "./OverlayPregunta";
import CorazonVictoria from "./CorazonVictoria";
import Swal from "sweetalert2";
import { preguntasBase } from "../data/preguntasBase";

export default function QuizRomantico() {
  const [empezar, setEmpezar] = useState(false);
  const [preguntaIndex, setPreguntaIndex] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [victoria, setVictoria] = useState(false);
  const [preguntas, setPreguntas] = useState([]);
  const [imagenesCargadas, setImagenesCargadas] = useState([]);

  const audioRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const imagenes = [
    "/imagenes/TayFran.jpeg",
    "/imagenes/Besoenelcuello.jpeg",
    "/imagenes/Ardillita.jpg",
    "/imagenes/Aventura.JPG",
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

  // Mezclar preguntas al iniciar
  useEffect(() => {
    const mezcladas = [...preguntasBase].sort(() => Math.random() - 0.5);
    setPreguntas(mezcladas);
  }, []);

  // Precargar imágenes
  useEffect(() => {
    const carga = imagenes.map((src) => {
      return new Promise((res) => {
        const img = new Image();
        img.src = src;
        img.onload = () => res({ src, status: "ok" });
        img.onerror = () => res({ src, status: "error" });
      });
    });

    Promise.all(carga).then((results) => {
      setImagenesCargadas(results);
    });
  }, []);

  // Manejar selección de opciones
  // Manejar selección de opciones con la lógica original
const handleChange = (pregId, idx) => {
  const preguntaActual = preguntas.find(p => p.id === pregId);
  if (!preguntaActual) return;

  const actuales = respuestas[pregId] || [];
  let nuevas = [...actuales];

  // togglear selección
  if (nuevas.includes(idx)) {
    nuevas = nuevas.filter(i => i !== idx);
  } else {
    nuevas.push(idx);
  }

  const tipo = preguntaActual.tipo || "trigger";

  if (tipo === "confirm" && idx === 0) {
    Swal.fire({
      text: "¿Quieres marcar esta opción?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (!result.isConfirmed) {
        // activar oculta
        setPreguntas(prev =>
          prev.map(p => p.id === pregId ? { ...p, ocultaActivada: true } : p)
        );
        setRespuestas(prev => ({ ...prev, [pregId]: nuevas }));
      } else {
        // revertir selección
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
        cancelButtonText: "No",
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

    // si marcó todas las opciones visibles, activa la oculta
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
        cancelButtonText: "No",
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
    // default: si coincide trigger, activar oculta
    if (preguntaActual?.oculta &&
        preguntaActual.trigger === preguntaActual.opciones[idx]) {
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
  const todasRespondidas = preguntas.every(p => {
    const r = respuestas[p.id] || [];
    return r.length > 0 || p.ocultaActivada;
  });

  if (!todasRespondidas) {
    Swal.fire({
      text: "Debes responder todas las preguntas",
      timer: 5000,
      showConfirmButton: false
    });
    return;
  }

  Swal.fire({
    text: "Feliz aniversario mi amor, te quiero mucho",
    timer: 4000,
    showConfirmButton: false,
    didClose: () => {
      setVictoria(true);          // <-- Se activa después del cierre
    }
  });
};

  
  const renderImg = (idx) => {
    const imgData = imagenesCargadas[idx];
    if (!imgData) return <div className="placeholder">Cargando...</div>;
    if (imgData.status === "error") return <div className="placeholder">Imagen no disponible</div>;
    return <img src={imgData.src} alt={`slide-${idx}`} className="slide-img" />;
  };

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
            {imagenes.map((_, idx) => (
              <SwiperSlide key={idx}>
                <div className="slide-wrapper">
                  {renderImg(idx)}
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

          <audio ref={audioRef} src="/audio/polar5.mp3" />
        </>
      )}
    </div>
  );
}
