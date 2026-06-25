// Frases aleatorias (pero con mucho cariño) para acompañar a cada gatito.
export const quotes = [
  {
    apariciones: 0,
    text: "Podes volver cada que quieras ver un gato",
    author: "toca el boton!",
  },
  {
    apariciones: 0,
    text: "Sos la razón por la que todos los días se vuelven bonitos.",
    author: "Para vos",
  },
  {
    apariciones: 0,
    text: "Ojala te pase todo lo bueno del mundo, chini.",
    author: "Cuan",
  },
  { apariciones: 0, text: "<3", author: "Para vo" },
  {
    apariciones: 0,
    text: "La vida es mas bonita con miaus y alguien como vos cerca.",
    author: "miau",
  },
  { apariciones: 0, text: "Ola china", author: "Chau chinaa" },
  {
    apariciones: 0,
    text: "No importa qué tan ocupado este, siempre hay una parte mia pensando en vos.",
    author: "Cuam",
  },
  { apariciones: 0, text: "Sos alguien espectacular chinita.", author: "yo" },
  { apariciones: 0, text: "Sos mi matriz inversa", author: "Dea que decia" },
  { apariciones: 0, text: "Te quiero mucho mi chinita", author: "ola" },
  { apariciones: 0, text: "Te extraño", author: "Mucho" },
  { apariciones: 0, text: "Sos empalagosamente dulce", author: "y yo amargo" },
  { apariciones: 0, text: "Se parece a vos", author: "jijij" },
  { apariciones: 0, text: "Sos mi mapa", author: "geopolitico" },
  {
    apariciones: 0,
    text: "Ya te comprare un diccionario",
    author: "de los baratos eh",
  },
  { apariciones: 0, text: "Tontaaa", author: "digo guapa" },
  { apariciones: 0, text: "Graciosa y bajita", author: "todo en uno" },
  { apariciones: 0, text: "Me volves loco", author: "en ambos sentidos" },
  {
    apariciones: 0,
    text: "Ya te dije las 1001 cosas que me gustan de vos?",
    author: "no? bueno cuando tengas todo un dia libre sera",
  },
  {
    apariciones: 0,
    text: "De ese color no tengo",
    author: "anda rapidoo, robalo",
  },
  {
    apariciones: 0,
    text: "La ultima golosina tenia veneno",
    author: "chauu eme",
  },
  { apariciones: 0, text: "Muy", author: "linda" },
  {
    apariciones: 0,
    text: "Quiero que me abraces",
    author: "y no me sueltes nunca",
  },
  { apariciones: 0, text: "Quiero abrazarte", author: "y no soltarte nunca" },
  { apariciones: 0, text: "Soñe con vos", author: "me pedias plata" },
  { apariciones: 0, text: "Espero un beso tuyo", author: "bueno no solo uno obvio" },
  { apariciones: 0, text: "Me encanta perderme en tus ojos", author: "es algo que no puedo evitar" },
];

/*
            .         .
          .   .......   .
        .      @   @      .  ola
        .________0________.







    ############     #############
  ###############   ###############
####################################
###################################
  ##############################
    #########################
      ####################
        ###############
          ###########
             #####







B============>

*/

export function fraseAleatoria(ultima = 1) {
  let indice = 1;

  // Agregado para mensaje de bienvenida
  const frases = quotes.slice(1);

  const pesos = frases.map((item) => 1 / (item.apariciones + 1));

  const total = pesos.reduce((a, b) => a + b, 0);

  while (indice == ultima) {
    let random = Math.random() * total;

    for (let i = 0; i < frases.length; i++) {
      random -= pesos[i];

      if (random <= 0) {
        frases[i].apariciones++;
        indice = i;
        break;
      }
    }
  }

  return indice || 1;
}
