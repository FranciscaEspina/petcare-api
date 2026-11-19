// Capa de acceso a la API (usa fetch). Todas las llamadas pasan por request().
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch {
    throw new Error(
      `No se pudo conectar con la API en ${API_URL}. Revisa que el backend esté corriendo.`
    );
  }

  if (!res.ok) {
    let body = null;
    try {
      body = await res.json();
    } catch {
      /* la respuesta no traía JSON */
    }
    const error = new Error(body?.mensaje || `Error ${res.status}`);
    error.detalles = body?.detalles || [];
    throw error;
  }
  return res.status === 204 ? null : res.json();
}

export const getDuenos = () => request("/api/duenos");
export const getMascotasDeDueno = (duenoId) => request(`/api/duenos/${duenoId}/mascotas`);
export const getCitasDeMascota = (mascotaId) => request(`/api/mascotas/${mascotaId}/citas`);
export const crearCita = (cita) =>
  request("/api/citas", { method: "POST", body: JSON.stringify(cita) });
export const crearDueno = (dueno) =>
  request("/api/duenos", { method: "POST", body: JSON.stringify(dueno) });
export const crearMascota = (mascota) =>
  request("/api/mascotas", { method: "POST", body: JSON.stringify(mascota) });
