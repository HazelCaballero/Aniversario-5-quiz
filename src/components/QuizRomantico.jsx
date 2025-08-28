import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/unificados.css";
import OverlayPregunta from "./OverlayPregunta";
import CorazonVictoria from "./CorazonVictoria";
import Swal from "sweetalert2";

// Preguntas base
import { preguntasBase } from "../data/preguntasBase"; // si las quieres en otro archivo

export default function QuizRomantico() {
  const [empezar, setEmpezar] = useState(false);
  const [preguntaIndex, setPreguntaIndex] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [victoria, setVictoria] = useState(false);
  const [preguntas, setPreguntas] = useState([]);

  const audioRef = useRef(null); // ✅ Hook dentro del componente

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

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const mezcladas = [...preguntasBase].sort(() => Math.random() - 0.5);
    setPreguntas(mezcladas);
  }, []);

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
        audioRef.current?.play(); // reproduce audio
      }
    });
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
            {imagenes.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className="slide-wrapper">
                  <img src={img} alt={`slide-${idx}`} className="slide-img" />
                  <OverlayPregunta
                    pregunta={preguntas[idx]}
                    respuestas={respuestas}
                    handleChange={() => {}}
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
