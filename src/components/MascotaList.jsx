import { useState } from "react";
import { emojiEspecie, formatearEdad } from "../format.js";
import MascotaForm from "./MascotaForm.jsx";

export default function MascotaList({ dueno, mascotas, seleccionada, onSeleccionar, cargando, error, onMascotaCreada }) {
  const [formAbierto, setFormAbierto] = useState(false);

  return (
    <section className="panel" aria-labelledby="titulo-mascotas">
      <header className="panel-head">
        <h2 id="titulo-mascotas">{dueno ? `Mascotas de ${dueno.nombre}` : "Mascotas"}</h2>
        {dueno && (
          <div className="panel-acciones">
            {!cargando && !error && <span className="contador">{mascotas.length}</span>}
            <button type="button" className="boton boton-chico" onClick={() => setFormAbierto(!formAbierto)}>
              {formAbierto ? "Cerrar" : "+ Mascota"}
            </button>
          </div>
        )}
      </header>

      {dueno && formAbierto && (
        <MascotaForm
          key={dueno.id}
          dueno={dueno}
          onCancelar={() => setFormAbierto(false)}
          onCreada={(m) => {
            setFormAbierto(false);
            onMascotaCreada(m);
          }}
        />
      )}

      {!dueno && <p className="estado">Elige un dueño para ver sus mascotas.</p>}
      {dueno && cargando && <p className="estado">Cargando mascotas…</p>}
      {dueno && error && (
        <p className="estado estado-error" role="alert">
          {error}
        </p>
      )}
      {dueno && !cargando && !error && mascotas.length === 0 && (
        <p className="estado">Este dueño no tiene mascotas registradas.</p>
      )}

      <ul className="lista">
        {[...mascotas].sort((a, b) => b.id - a.id).map((m) => (
          <li key={m.id}>
            <button
              type="button"
              className={"fila fila-mascota" + (seleccionada?.id === m.id ? " fila-activa" : "")}
              aria-pressed={seleccionada?.id === m.id}
              onClick={() => onSeleccionar(m)}
            >
              <span className="avatar" aria-hidden="true">
                {emojiEspecie(m.especie)}
              </span>
              <span className="fila-texto">
                <span className="fila-titulo">{m.nombre}</span>
                <span className="fila-detalle">
                  {[m.especie, m.raza].filter(Boolean).join(" · ")}
                </span>
                <span className="fila-detalle">{formatearEdad(m.fechaNacimiento)}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
