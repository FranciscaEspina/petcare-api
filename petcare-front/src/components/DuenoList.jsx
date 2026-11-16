export default function DuenoList({ duenos, seleccionado, onSeleccionar, cargando, error }) {
  return (
    <section className="panel" aria-labelledby="titulo-duenos">
      <header className="panel-head">
        <h2 id="titulo-duenos">Dueños</h2>
        {!cargando && !error && <span className="contador">{duenos.length}</span>}
      </header>

      {cargando && <p className="estado">Cargando dueños…</p>}
      {error && (
        <p className="estado estado-error" role="alert">
          {error}
        </p>
      )}
      {!cargando && !error && duenos.length === 0 && (
        <p className="estado">
          Aún no hay dueños registrados. Créalos desde Postman con <code>POST /api/duenos</code> y
          recarga la página.
        </p>
      )}

      <ul className="lista">
        {duenos.map((d) => (
          <li key={d.id}>
            <button
              type="button"
              className={"fila" + (seleccionado?.id === d.id ? " fila-activa" : "")}
              aria-pressed={seleccionado?.id === d.id}
              onClick={() => onSeleccionar(d)}
            >
              <span className="fila-titulo">{d.nombre}</span>
              <span className="fila-detalle">{d.rut}</span>
              {(d.telefono || d.email) && (
                <span className="fila-detalle">{[d.telefono, d.email].filter(Boolean).join("  |  ")}</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
