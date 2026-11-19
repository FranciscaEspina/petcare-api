import CitaForm from "./CitaForm.jsx";
import { formatearCosto, formatearFecha } from "../format.js";

export default function CitaPanel({ mascota, citas, cargando, error, onCitaCreada }) {
  return (
    <section className="panel" aria-labelledby="titulo-citas">
      <header className="panel-head">
        <h2 id="titulo-citas">{mascota ? `Citas de ${mascota.nombre}` : "Citas"}</h2>
        {mascota && !cargando && !error && <span className="contador">{citas.length}</span>}
      </header>

      {!mascota && <p className="estado">Elige una mascota para ver su historial y registrar una cita.</p>}

      {mascota && (
        <>
          {cargando && <p className="estado">Cargando citas…</p>}
          {error && (
            <p className="estado estado-error" role="alert">
              {error}
            </p>
          )}
          {!cargando && !error && citas.length === 0 && (
            <p className="estado">{mascota.nombre} todavía no tiene citas.</p>
          )}

          <ol className="historial">
            {[...citas].sort((a, b) => b.id - a.id).map((c) => (
              <li key={c.id} className="cita">
                <div className="cita-cabecera">
                  <time dateTime={c.fecha}>{formatearFecha(c.fecha)}</time>
                  <span className="cita-costo">{formatearCosto(c.costo)}</span>
                </div>
                <p className="cita-motivo">{c.motivo}</p>
                {c.diagnostico && <p className="cita-diagnostico">{c.diagnostico}</p>}
              </li>
            ))}
          </ol>

          <CitaForm key={mascota.id} mascota={mascota} onCreada={onCitaCreada} />
        </>
      )}
    </section>
  );
}
