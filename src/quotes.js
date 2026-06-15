// Frases aleatorias para acompañar a cada gatito.
export const quotes = [
  { text: "Un regalito para vos, espero te guste <3", author: "toca el boton!" },
  { text: "Sos la razón por la que todos los días se vuelven bonitos.", author: "Para vo" },
  { text: "Ojala te pase todo lo bueno del mundo, eme.", author: "Cuan" },
  { text: "<3", author: "Para vo" },
  { text: "La vida es mas bonita con miaus cerca y con gente como vos.", author: "nose" },
  { text: "Ola eme", author: "Chau eme" },
  { text: "No importa qué tan ocupado este, siempre hay un rincón una parte mia pensando en vos.", author: "Cuam" },
  // { text: "Sos pura ternura, igualź que estos michis.", author: "Anónimo" },
  { text: "Sos mi matriz inversa", author: "Dea que decia" },
  { text: "Te quiero eme", author: "ola" },
  { text: "Te extraño", author: "Mucho" },
  { text: "Sos empalagosamente dulce", author: "y yo amargo" },
  { text: "Se parece a vos", author: "jijij" },
  { text: "Sos mi mapa", author: "geopolitico" },
  { text: "Ya te comprare un diccionario", author: "de los baratos eh" },
]

export function frasePorIndice(indice, ultima) {
  let aux;
  let frase;
  
  delete quotes[0];

  while (aux == ultima) {
    frase = quotes[indice % quotes.length]
  }
  return frase
}
