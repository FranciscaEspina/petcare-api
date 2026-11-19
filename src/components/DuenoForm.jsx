import { useState } from "react";
import { crearDueno } from "../api.js";

const vacio = { rut: "", nombre: "", telefono: "", email: "" };

export default function DuenoForm({ onCreado, onCancelar }) {
  const [datos, setDatos] = useState(vacio);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(null);
  const [detalles, setDetalles] = useState([]);

  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

  const enviar = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setError(null);
    setDetalles([]);
    try {
      const nuevo = await crearDueno({
        rut: datos.rut.trim(),
        nombre: datos.nombre.trim(),
        telefono: datos.telefono.trim() || null,
        email: datos.email.trim() || null,
      });
      setDatos(vacio);
      onCreado(nuevo);
    } catch (err) {
      setError(err.message);
      setDetalles(err.detalles || []);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form className="formulario formulario-inline" onSubmit={enviar}>
      <h3>Nuevo dueño</h3>

      <label>
        RUT
        <input name="rut" value={datos.rut} onChange={cambiar} placeholder="12.345.678-5" required />
      </label>

      <label>
        Nombre
        <input name="nombre" value={datos.nombre} onChange={cambiar} maxLength={100} required />
      </label>

      <label>
        Teléfono <span className="opcional">(opcional)</span>
        <input name="telefono" value={datos.telefono} onChange={cambiar} maxLength={20} />
      </label>

      <label>
        Email <span className="opcional">(opcional)</span>
        <input type="email" name="email" value={datos.email} onChange={cambiar} maxLength={120} />
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

      <div className="acciones">
        <button type="submit" className="boton" disabled={enviando}>
          {enviando ? "Guardando…" : "Guardar dueño"}
        </button>
        <button type="button" className="boton boton-sec" onClick={onCancelar}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
