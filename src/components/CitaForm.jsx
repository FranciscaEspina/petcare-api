import { useState } from "react";
import { crearCita } from "../api.js";

const vacio = { fecha: "", motivo: "", diagnostico: "", costo: "" };

export default function CitaForm({ mascota, onCreada }) {
  const [datos, setDatos] = useState(vacio);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(null);
  const [detalles, setDetalles] = useState([]);
  const [exito, setExito] = useState(false);

  const cambiar = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
    setExito(false);
  };

  const enviar = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setError(null);
    setDetalles([]);
    setExito(false);
    try {
      await crearCita({
        fecha: datos.fecha,
        motivo: datos.motivo,
        diagnostico: datos.diagnostico || null,
        costo: datos.costo === "" ? null : Number(datos.costo),
        mascotaId: mascota.id,
      });
      setDatos(vacio);
      setExito(true);
      onCreada();
    } catch (err) {
      setError(err.message);
      setDetalles(err.detalles || []);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form className="formulario" onSubmit={enviar}>
      <h3>Registrar cita para {mascota.nombre}</h3>

      <label>
        Fecha y hora
        <input type="datetime-local" name="fecha" value={datos.fecha} onChange={cambiar} required />
      </label>

      <label>
        Motivo
        <input
          type="text"
          name="motivo"
          value={datos.motivo}
          onChange={cambiar}
          placeholder="Ej.: Vacuna anual"
          maxLength={255}
          required
        />
      </label>

      <label>
        Diagnóstico <span className="opcional">(opcional)</span>
        <textarea
          name="diagnostico"
          value={datos.diagnostico}
          onChange={cambiar}
          rows={3}
          maxLength={500}
        />
      </label>

      <label>
        Costo en CLP <span className="opcional">(opcional)</span>
        <input
          type="number"
          name="costo"
          value={datos.costo}
          onChange={cambiar}
          min="0"
          step="1"
          inputMode="numeric"
        />
      </label>

      {error && (
        <div className="aviso aviso-error" role="alert">
          <p>{error}</p>
          {detalles.length > 0 && (
            <ul>
              {detalles.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      {exito && (
        <p className="aviso aviso-ok" role="status">
          Cita registrada.
        </p>
      )}

      <button type="submit" className="boton" disabled={enviando}>
        {enviando ? "Registrando…" : "Registrar cita"}
      </button>
    </form>
  );
}
