import { useCallback, useEffect, useState } from "react";
import { API_URL, getCitasDeMascota, getDuenos, getMascotasDeDueno } from "./api.js";
import DuenoList from "./components/DuenoList.jsx";
import MascotaList from "./components/MascotaList.jsx";
import CitaPanel from "./components/CitaPanel.jsx";

export default function App() {
  const [duenos, setDuenos] = useState([]);
  const [duenosCargando, setDuenosCargando] = useState(true);
  const [duenosError, setDuenosError] = useState(null);

  const [dueno, setDueno] = useState(null);
  const [mascotas, setMascotas] = useState([]);
  const [mascotasCargando, setMascotasCargando] = useState(false);
  const [mascotasError, setMascotasError] = useState(null);

  const [mascota, setMascota] = useState(null);
  const [citas, setCitas] = useState([]);
  const [citasCargando, setCitasCargando] = useState(false);
  const [citasError, setCitasError] = useState(null);

  const [mensaje, setMensaje] = useState(null);
  const avisar = (texto) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(null), 4000);
  };

  // 1) Al abrir la página: listar dueños
  useEffect(() => {
    getDuenos()
      .then(setDuenos)
      .catch((e) => setDuenosError(e.message))
      .finally(() => setDuenosCargando(false));
  }, []);

  // 2) Al elegir un dueño: cargar sus mascotas
  const elegirDueno = (d) => {
    setDueno(d);
    setMascota(null);
    setCitas([]);
    setMascotas([]);
    setMascotasError(null);
    setMascotasCargando(true);
    getMascotasDeDueno(d.id)
      .then(setMascotas)
      .catch((e) => setMascotasError(e.message))
      .finally(() => setMascotasCargando(false));
  };

  // 3) Al elegir una mascota: cargar sus citas
  const cargarCitas = useCallback((m) => {
    setCitasError(null);
    setCitasCargando(true);
    getCitasDeMascota(m.id)
      .then(setCitas)
      .catch((e) => setCitasError(e.message))
      .finally(() => setCitasCargando(false));
  }, []);

  const elegirMascota = (m) => {
    setMascota(m);
    setCitas([]);
    cargarCitas(m);
  };

  // Después de crear un dueño: se agrega a la lista y queda seleccionado
  const duenoCreado = (d) => {
    setDuenos((lista) => [...lista, d]);
    elegirDueno(d);
    avisar(`Dueño ${d.nombre} registrado exitosamente.`);
  };

  // Después de crear una mascota: se agrega a la lista y queda seleccionada
  const mascotaCreada = (m) => {
    setMascotas((lista) => [...lista, m]);
    elegirMascota(m);
    avisar(`Mascota ${m.nombre} registrada exitosamente.`);
  };

  return (
    <div className="app">
      <header className="cabecera">
        <h1>
          <span className="marca" aria-hidden="true">
            🐾
          </span>
          PetCare
        </h1>
        <p className="cabecera-sub">Clínica veterinaria · conectado a {API_URL}</p>
      </header>

      {mensaje && (
        <p className="aviso aviso-ok aviso-global" role="status">
          {mensaje}
        </p>
      )}

      <main className="tablero">
        <DuenoList
          duenos={duenos}
          seleccionado={dueno}
          onSeleccionar={elegirDueno}
          cargando={duenosCargando}
          error={duenosError}
          onDuenoCreado={duenoCreado}
        />
        <MascotaList
          dueno={dueno}
          mascotas={mascotas}
          seleccionada={mascota}
          onSeleccionar={elegirMascota}
          cargando={mascotasCargando}
          error={mascotasError}
          onMascotaCreada={mascotaCreada}
        />
        <CitaPanel
          mascota={mascota}
          citas={citas}
          cargando={citasCargando}
          error={citasError}
          onCitaCreada={() => {
            cargarCitas(mascota);
            avisar(`Cita registrada exitosamente para ${mascota.nombre}.`);
          }}
        />
      </main>
    </div>
  );
}
