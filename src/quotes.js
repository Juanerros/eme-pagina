// Frases aleatorias para acompañar a cada gatito.
export const quotes = [
  { text: "Podes volver cada que quieras ver un gato", author: "toca el boton!" },
  { text: "Sos la razón por la que todos los días se vuelven bonitos.", author: "Para vos" },
  { text: "Ojala te pase todo lo bueno del mundo, eme.", author: "Cuan" },
  { text: "<3", author: "Para vo" },
  { text: "La vida es mas bonita con miaus y alguien como vos cerca.", author: "miau" },
  { text: "Ola eme", author: "Chau eme" },
  { text: "No importa qué tan ocupado este, siempre hay una parte mia pensando en vos.", author: "Cuam" },
  { text: "Sos alguien espectacular emeee.", author: "yo" },
  { text: "Sos mi matriz inversa", author: "Dea que decia" },
  { text: "Te quiero eme", author: "ola" },
  { text: "Te extraño", author: "Mucho" },
  { text: "Sos empalagosamente dulce", author: "y yo amargo" },
  { text: "Se parece a vos", author: "jijij" },
  { text: "Sos mi mapa", author: "geopolitico" },
  { text: "Ya te comprare un diccionario", author: "de los baratos eh" },
  { text: "Tontaaa", author: "digo guapa" },
  { text: "Graciosa y bajita", author: "todo en uno" },
  { text: "Me volves loco", author: "en ambos sentidos" },
  { text: "Ya te dije las 1001 cosas que me gustan de vos?", author: "no? bueno cuando tengas todo un dia libre sera" },
  { text: "De ese color no tengo", author: "anda rapidoo, robalo" },

]

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

export function frasePorIndice(indice, ultima) {
  let frase;
  
  delete quotes[0];

  while (frase == ultima) {
    frase = quotes[indice % quotes.length]
  }
  return frase
}
