// Frases aleatorias para acompañar a cada gatito.
export const quotes = [
  { text: "Eres la razón por la que hasta los días grises se vuelven bonitos.", author: "Para ti" },
  { text: "Si la felicidad fuera un gato, se quedaría a dormir contigo.", author: "Anónimo" },
  { text: "Que cada día te traiga algo tan suave como las patitas de un gato.", author: "Un deseo" },
  { text: "Eres tan especial que mereces sonreír cada vez que abras esta página.", author: "Para ti" },
  { text: "La vida es mejor con ronroneos cerca y con gente como tú.", author: "Anónimo" },
  { text: "Ojalá tengas un día tan calentito como un gato al sol.", author: "Un deseo" },
  { text: "No importa qué tan grande sea el mundo, siempre hay un rincón pensando en ti.", author: "Para ti" },
  { text: "Eres pura ternura, igual que estos michis.", author: "Anónimo" },
  { text: "Que la suerte te siga como un gatito hambriento sigue a su humano favorito.", author: "Un deseo" },
  { text: "Respira, estira como un gato y recuerda lo increíble que eres.", author: "Para ti" },
  { text: "Mereces todas las cosas suaves, dulces y bonitas de este mundo.", author: "Anónimo" },
  { text: "Hoy es un buen día para sentirte querido y para ver gatitos.", author: "Un deseo" },
]

export function frasePorIndice(indice) {
  return quotes[indice % quotes.length]
}
