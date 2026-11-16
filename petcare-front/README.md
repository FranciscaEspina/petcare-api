# PetCare — Frontend (React + Vite)

Interfaz opcional del desafío PetCare. Consume la API Spring Boot con `fetch` y permite:

1. **Listar dueños** (`GET /api/duenos`).
2. **Ver las mascotas de un dueño** (`GET /api/duenos/{id}/mascotas`).
3. **Ver las citas de una mascota** (`GET /api/mascotas/{id}/citas`) y **registrar una cita** con un formulario (`POST /api/citas`).

## Cómo ejecutarlo

Requisitos: Node.js 18 o superior y el backend corriendo.

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

## Conexión con el backend

La dirección de la API está en el archivo `.env`:

```
VITE_API_URL=http://localhost:8081
```

Cambia el puerto si tu backend corre en otro (por ejemplo 8080). Después de editar `.env`, detén `npm run dev` con `Ctrl + C` y vuelve a ejecutarlo.

> El backend solo acepta peticiones del navegador desde `http://localhost:5173` y `http://localhost:3000` (CORS). No cambies el puerto de Vite.

## Estructura

```
src/
├── api.js                 llamadas fetch a la API
├── format.js              formato de fechas, costos y edad
├── App.jsx                estado general y flujo dueño → mascota → citas
└── components/
    ├── DuenoList.jsx
    ├── MascotaList.jsx
    ├── CitaPanel.jsx      historial de citas
    └── CitaForm.jsx       formulario para registrar una cita
```
