// ../data/preguntasBase.js

export const preguntasBase = [
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
    tipo: "trigger-alert" },

  { id: 9, pregunta: "Películas que amamos ver juntos",
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
    tipo: "todas" },

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
    tipo: "todas" },

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
    tipo: "todas" },

  { id: 15, pregunta: "Qué detalle tuyo a distancia me pone hot?", 
    opciones: ["Mensajes coquetos y provocativos", "Pequeños retos atrevidos", "Fotos sorpresa"], 
    oculta: "Saber que te excita pensar en mí", 
    trigger: "Mensajes coquetos y provocativos", 
    ocultaActivada: false, 
    tipo: "trigger-alert" }
];
