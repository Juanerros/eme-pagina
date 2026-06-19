import { useCallback, useEffect, useState } from "react";
import { quotes } from "./quotes.js";
import "./App.css";

const CAT_API = "https://api.thecatapi.com/v1/images/search";

async function traerGato() {
  const res = await fetch(CAT_API);
  if (!res.ok) throw new Error("No se pudo traer el gatito");
  const data = await res.json();
  return { url: data[0].url, id: data[0].id };
}

function precargar(url) {
  if (!url) return;
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = url;
}

function fraseAleatoria() {
  return Math.floor(Math.random() * quotes.length);
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
  );
}

function CorazonIcono() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function CorazonTachadoIcono() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function App() {
  const [fotoActual, setFotoActual] = useState(null);
  const [fotoSiguiente, setFotoSiguiente] = useState(null);
  const [indiceFrase, setIndiceFrase] = useState(0);
  const [cargandoInicial, setCargandoInicial] = useState(true);
  const [tabActual, setTabActual] = useState("inicio");
  const [fotoAmpliada, setFotoAmpliada] = useState(null);
  const [contadorGatos, setContadorGatos] = useState(() => {
    try {
      return parseInt(localStorage.getItem("contadorGatos") || "0", 10);
    } catch {
      return 0;
    }
  });
  const [favoritos, setFavoritos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favoritos") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("contadorGatos", contadorGatos);
  }, [contadorGatos]);

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  useEffect(() => {
    let activo = true;
    (async () => {
      try {
        const [primera, segunda] = await Promise.all([
          traerGato(),
          traerGato(),
        ]);
        if (!activo) return;
        setFotoActual(primera);
        setFotoSiguiente(segunda);
        precargar(segunda.url);
      } catch (err) {
        console.log("[v0] Error cargando gatos:", err.message);
      } finally {
        if (activo) setCargandoInicial(false);
      }
    })();
    return () => {
      activo = false;
    };
  }, []);

  const cambiarGato = useCallback(async () => {
    if (fotoSiguiente) {
      setFotoActual(fotoSiguiente);
      setFotoSiguiente(null);
    }
    setIndiceFrase(fraseAleatoria());
    setContadorGatos((prev) => prev + 1);
    try {
      const nueva = await traerGato();
      setFotoSiguiente(nueva);
      precargar(nueva.url);
    } catch (err) {
      console.log("[v0] Error trayendo nuevo gato:", err.message);
    }
  }, [fotoSiguiente]);

  const toggleFavorito = useCallback(() => {
    if (!fotoActual) return;
    const existe = favoritos.find((f) => f.catUrl === fotoActual.url);
    if (existe) {
      setFavoritos((prev) => prev.filter((f) => f.id !== existe.id));
    } else {
      const nuevo = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        catUrl: fotoActual.url,
        catId: fotoActual.id,
        quoteText: quotes[indiceFrase].text,
        quoteAuthor: quotes[indiceFrase].author,
        quoteIndex: indiceFrase,
        timestamp: new Date().toISOString(),
      };
      setFavoritos((prev) => [nuevo, ...prev]);
    }
  }, [fotoActual, indiceFrase, favoritos]);

  const eliminarFavorito = useCallback((id) => {
    setFavoritos((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const frase = quotes[indiceFrase];
  const estaEnFavoritos = favoritos.some((f) => f.catUrl === fotoActual?.url);

  return (
    <main className="page">
      <nav className="tabs">
        <button
          className={`tab${tabActual === "inicio" ? " activo" : ""}`}
          onClick={() => setTabActual("inicio")}
        >
          Inicio
        </button>
        <button
          className={`tab${tabActual === "favoritos" ? " activo" : ""}`}
          onClick={() => setTabActual("favoritos")}
        >
          Favoritos{favoritos.length > 0 ? ` (${favoritos.length})` : ""}
        </button>
      </nav>

      {tabActual === "inicio" ? (
        <>
          <header className="intro">
            <p className="saludo">Para eme</p>
            <h1>Un gatito, cada que vuelvas</h1>
          </header>

          <section className="tarjeta" aria-live="polite">
            <div
              className="marco-foto"
              onClick={() => fotoActual && setFotoAmpliada(fotoActual.url)}
              style={{ cursor: fotoActual ? "pointer" : "default" }}
            >
              {fotoActual ? (
                <img src={fotoActual.url || "/placeholder.svg"} alt="El gatooo" />
              ) : (
                <div className="cargando">
                  {cargandoInicial ? (
                    <span className="huella" aria-label="Cargando gatooo" />
                  ) : (
                    "No se pudo cargar el gatooo 😢"
                  )}
                </div>
              )}
            </div>

            <figure className="frase">
              <blockquote>{frase.text}</blockquote>
              <figcaption className="autor">{frase.author}</figcaption>
            </figure>
          </section>

          <div className="acciones">
            <button
              className="boton-gato"
              onClick={cambiarGato}
              disabled={cargandoInicial}
            >
              <span className="pata">
                <PataIcono />
              </span>
              gato
            </button>

            <button
              className={`boton-favorito${estaEnFavoritos ? " activo" : ""}`}
              onClick={toggleFavorito}
              disabled={!fotoActual}
            >
              {estaEnFavoritos ? <CorazonTachadoIcono /> : <CorazonIcono />}
              {estaEnFavoritos ? "Quitar" : "Favorito"}
            </button>
          </div>

          <p className="contador">🐱 x {contadorGatos}</p>

          <p className="pie">
            Hecho con cariño y muchos <span>miaus</span>
          </p>
        </>
      ) : (
        <section className="favoritos">
          <h2 className="favoritos-titulo">Favoritos</h2>
          {favoritos.length === 0 ? (
            <p className="sin-favoritos">Todavia no tenes favoritos</p>
          ) : (
            <div className="favoritos-lista">
              {favoritos.map((fav) => (
                <article key={fav.id} className="favorito-item">
                  <div
                    className="favorito-item-imagen"
                    onClick={() => setFotoAmpliada(fav.catUrl)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={fav.catUrl} alt="Gato favorito" />
                  </div>
                  <div className="favorito-item-info">
                    <blockquote>{fav.quoteText}</blockquote>
                    <cite>{fav.quoteAuthor}</cite>
                  </div>
                  <button
                    className="boton-eliminar"
                    onClick={() => eliminarFavorito(fav.id)}
                    aria-label="Eliminar favorito"
                  >
                    <CorazonTachadoIcono />
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {fotoAmpliada && (
        <div className="modal" onClick={() => setFotoAmpliada(null)}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-cerrar"
              onClick={() => setFotoAmpliada(null)}
              aria-label="Cerrar"
            >
              ✕
            </button>
            <img src={fotoAmpliada} alt="Gato ampliado" />
          </div>
        </div>
      )}
    </main>
  );
}
