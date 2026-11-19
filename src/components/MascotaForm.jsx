import { useState } from "react";
import { crearMascota } from "../api.js";

const vacio = { nombre: "", especie: "", raza: "", fechaNacimiento: "" };

export default function MascotaForm({ dueno, onCreada, onCancelar }) {
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
      const nueva = await crearMascota({
        nombre: datos.nombre.trim(),
        especie: datos.especie.trim(),
        raza: datos.raza.trim() || null,
        fechaNacimiento: datos.fechaNacimiento || null,
        duenoId: dueno.id,
      });
      setDatos(vacio);
      onCreada(nueva);
    } catch (err) {
      setError(err.message);
      setDetalles(err.detalles || []);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form className="formulario formulario-inline" onSubmit={enviar}>
      <h3>Nueva mascota de {dueno.nombre}</h3>

      <label>
        Nombre
        <input name="nombre" value={datos.nombre} onChange={cambiar} maxLength={80} required />
      </label>

      <label>
        Especie
        <input
          name="especie"
          value={datos.especie}
          onChange={cambiar}
          placeholder="Ej.: Perro, Gato"
          maxLength={50}
          required
        />
      </label>

      <label>
        Raza <span className="opcional">(opcional)</span>
        <input name="raza" value={datos.raza} onChange={cambiar} maxLength={80} />
      </label>

      <label>
        Fecha de nacimiento <span className="opcional">(opcional)</span>
        <input
          type="date"
          name="fechaNacimiento"
          value={datos.fechaNacimiento}
          onChange={cambiar}
          max={new Date().toISOString().slice(0, 10)}
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

      <div className="acciones">
        <button type="submit" className="boton" disabled={enviando}>
          {enviando ? "Guardando…" : "Guardar mascota"}
        </button>
        <button type="button" className="boton boton-sec" onClick={onCancelar}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
