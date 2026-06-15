import { useCallback, useEffect, useState } from "react"
import { quotes } from "./quotes.js"
import "./App.css"

const CAT_API = "https://api.thecatapi.com/v1/images/search"

// Devuelve la URL de un gato aleatorio desde TheCatAPI.
async function traerGato() {
  const res = await fetch(CAT_API)
  if (!res.ok) throw new Error("No se pudo traer el gatito")
  const data = await res.json()
  return data[0].url
}

// Precarga una imagen para que el cambio sea instantáneo.
function precargar(url) {
  if (!url) return
  const img = new Image()
  img.crossOrigin = "anonymous"
  img.src = url
}

function fraseAleatoria() {
  return Math.floor(Math.random() * quotes.length)
}

function PataIcono() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <ellipse cx="6.5" cy="9" rx="1.7" ry="2.4" />
      <ellipse cx="11" cy="6.5" rx="1.7" ry="2.6" />
      <ellipse cx="15.5" cy="6.8" rx="1.7" ry="2.6" />
      <ellipse cx="18.5" cy="10" rx="1.6" ry="2.3" />
      <path d="M12 11.5c2.6 0 4.8 1.7 5.4 4 .5 1.9-1 3.5-3 3.5-.9 0-1.6-.3-2.4-.3s-1.5.3-2.4.3c-2 0-3.5-1.6-3-3.5.6-2.3 2.8-4 5.4-4z" />
    </svg>
  )
}

export default function App() {
  // Foto que se muestra ahora mismo.
  const [fotoActual, setFotoActual] = useState(null)
  // Segunda foto guardada en estado, lista para mostrarse al instante.
  const [fotoSiguiente, setFotoSiguiente] = useState(null)
  const [indiceFrase, setIndiceFrase] = useState(() => fraseAleatoria())
  const [cargandoInicial, setCargandoInicial] = useState(true)

  // Carga inicial: una foto para mostrar y otra de reserva.
  useEffect(() => {
    let activo = true
    ;(async () => {
      try {
        const [primera, segunda] = await Promise.all([traerGato(), traerGato()])
        if (!activo) return
        setFotoActual(primera)
        setFotoSiguiente(segunda)
        precargar(segunda)
      } catch (err) {
        console.log("[v0] Error cargando gatos:", err.message)
      } finally {
        if (activo) setCargandoInicial(false)
      }
    })()
    return () => {
      activo = false
    }
  }, [])

  // Botón "gato": muestra la segunda foto al instante y prepara otra nueva.
  const cambiarGato = useCallback(async () => {
    if (fotoSiguiente) {
      setFotoActual(fotoSiguiente)
      setFotoSiguiente(null)
    }
    setIndiceFrase(fraseAleatoria())
    try {
      const nueva = await traerGato()
      setFotoSiguiente(nueva)
      precargar(nueva)
    } catch (err) {
      console.log("[v0] Error trayendo nuevo gato:", err.message)
    }
  }, [fotoSiguiente])

  const frase = quotes[indiceFrase]

  return (
    <main className="page">
      <header className="intro">
        <p className="saludo">Un regalo para ti</p>
        <h1>Un gatito y una frase, cada vez que vuelvas</h1>
      </header>

      <section className="tarjeta" aria-live="polite">
        <div className="marco-foto">
          {fotoActual ? (
            <img src={fotoActual || "/placeholder.svg"} alt="Un gatito adorable elegido al azar" />
          ) : (
            <div className="cargando">
              {cargandoInicial ? <span className="huella" aria-label="Cargando gatito" /> : "No se pudo cargar el gatito"}
            </div>
          )}
        </div>

        <figure className="frase">
          <blockquote>{frase.text}</blockquote>
          <figcaption className="autor">{frase.author}</figcaption>
        </figure>
      </section>

      <button className="boton-gato" onClick={cambiarGato} disabled={cargandoInicial}>
        <span className="pata">
          <PataIcono />
        </span>
        gato
      </button>

      <p className="pie">
        Hecho con cariño y muchos <span>michis</span>
      </p>
    </main>
  )
}
