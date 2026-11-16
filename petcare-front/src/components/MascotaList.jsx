import { emojiEspecie, formatearEdad } from "../format.js";

export default function MascotaList({ dueno, mascotas, seleccionada, onSeleccionar, cargando, error }) {
  return (
    <section className="panel" aria-labelledby="titulo-mascotas">
      <header className="panel-head">
        <h2 id="titulo-mascotas">{dueno ? `Mascotas de ${dueno.nombre}` : "Mascotas"}</h2>
        {dueno && !cargando && !error && <span className="contador">{mascotas.length}</span>}
      </header>

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
        {mascotas.map((m) => (
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
