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
  const handleChange = (preguntaId, opcionIdx) => {
    setRespuestas((prev) => {
      const actuales = prev[preguntaId] || [];
      let nuevas;

      if (actuales.includes(opcionIdx)) {
        nuevas = actuales.filter((o) => o !== opcionIdx);
      } else {
        nuevas = [...actuales, opcionIdx];
      }

      return { ...prev, [preguntaId]: nuevas };
    });
  };

  const handleSubmit = () => {
    const todasRespondidas = preguntas.every(p => {
      const r = respuestas[p.id] || [];
      return r.length > 0 || p.ocultaActivada;
    });

    if (!todasRespondidas) {
      Swal.fire({ text: "Debes responder todas las preguntas", timer: 5000, showConfirmButton: false });
      return;
    }

    setVictoria(true);
    Swal.fire({
      text: "Feliz aniversario mi amor, te quiero mucho",
      timer: 5000,
      showConfirmButton: false,
      didClose: () => {
        audioRef.current?.play();
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
