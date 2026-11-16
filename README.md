# PetCare API — Clínica Veterinaria

Backend en **Spring Boot 3 (Java 17)** con arquitectura **Entity → Repository → Service → Controller** y tres entidades relacionadas: **Dueño**, **Mascota** y **Cita**.

## Cómo ejecutarlo

Requisitos: JDK 17 o superior y Maven (o un IDE como IntelliJ / VS Code / Eclipse que lo incluya).

```bash
mvn spring-boot:run
```

La API queda en `http://localhost:8080`. Por defecto usa **H2 en memoria** (no hay que instalar nada; los datos se borran al apagar la app).
Consola de la base de datos: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:petcare`, usuario `sa`, sin clave).

Para usar **Oracle**: descomenta la dependencia `ojdbc11` en `pom.xml` y el bloque Oracle en `src/main/resources/application.properties`.

## Modelo de datos

```
Dueño (1) ──── (N) Mascota (1) ──── (N) Cita
```

| Entidad | Atributos | Relación |
|---|---|---|
| Dueño | id, rut, nombre, teléfono, email | `@OneToMany` mascotas |
| Mascota | id, nombre, especie, raza, fechaNacimiento | `@ManyToOne` dueño, `@OneToMany` citas |
| Cita | id, fecha, motivo, diagnóstico, costo | `@ManyToOne` mascota |

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET / POST | `/api/duenos` | Listar / crear dueños |
| GET / PUT / DELETE | `/api/duenos/{id}` | Obtener / actualizar / eliminar dueño |
| GET | `/api/duenos/{id}/mascotas` | **Mascotas de un dueño** |
| GET / POST | `/api/mascotas` | Listar / crear mascotas |
| GET / PUT / DELETE | `/api/mascotas/{id}` | Obtener / actualizar / eliminar mascota |
| GET | `/api/mascotas/{id}/citas` | **Citas de una mascota** |
| GET / POST | `/api/citas` | Listar / crear citas |
| GET / PUT / DELETE | `/api/citas/{id}` | Obtener / actualizar / eliminar cita |

### Ejemplos de JSON

```json
// POST /api/duenos
{ "rut": "12.345.678-5", "nombre": "María González", "telefono": "+56912345678", "email": "maria@correo.cl" }

// POST /api/mascotas
{ "nombre": "Luna", "especie": "Perro", "raza": "Labrador", "fechaNacimiento": "2021-03-15", "duenoId": 1 }

// POST /api/citas
{ "fecha": "2026-11-20T10:30:00", "motivo": "Vacuna anual", "diagnostico": "Sin observaciones", "costo": 25000, "mascotaId": 1 }
```

## Validaciones (capa Service y Bean Validation)

| Regla | Respuesta |
|---|---|
| No crear una **cita** para una mascota inexistente | 404 |
| No crear una **mascota** para un dueño inexistente | 404 |
| RUT con dígito verificador inválido | 400 |
| RUT duplicado (al crear o actualizar) | 409 |
| Campos obligatorios vacíos, email con mal formato, costo negativo, fecha de nacimiento futura | 400 con detalle por campo |
| Eliminar un dueño que aún tiene mascotas | 409 |
| Eliminar una mascota que aún tiene citas | 409 |
| Recurso inexistente en GET / PUT / DELETE | 404 |

Los errores se devuelven en JSON: `{ timestamp, status, error, mensaje, detalles }`.

## Pruebas en Postman

1. Importa `postman/PetCare.postman_collection.json` (Postman → Import).
2. Con la app corriendo, ejecuta las carpetas **en orden 1 → 6** (o usa *Run collection*). Los ids se guardan solos en variables.
3. Toma capturas de cada request y su respuesta como evidencia (la carpeta 5 muestra las validaciones y la 4 los endpoints de relación).

## Estructura del proyecto

```
src/main/java/com/petcare
├── entity/       Dueno, Mascota, Cita (JPA)
├── repository/   un JpaRepository por entidad
├── dto/          Request / Response por entidad
├── service/      reglas de negocio y validaciones
├── controller/   endpoints REST
├── exception/    excepciones propias + manejador global
├── config/       CORS para el front opcional
└── util/         RutUtil (validación de RUT chileno)
```

## Entrega de avances

**Lo logrado**
- Entidades JPA con las relaciones Dueño–Mascota–Cita.
- Un repository por entidad y capa Service con validaciones de negocio.
- CRUD completo (GET, POST, PUT, DELETE) para las tres entidades.
- Endpoints de relación `GET /api/duenos/{id}/mascotas` y `GET /api/mascotas/{id}/citas`.
- Manejo centralizado de errores con códigos HTTP correctos y validación de RUT chileno.
- Colección de Postman con pruebas automáticas.

**Pendiente**
- Frontend en React (opcional): listar dueños, ver sus mascotas y registrar una cita.
- Pruebas automatizadas de servicios y controllers (hoy hay pruebas del validador de RUT y de arranque).
- Autenticación, paginación y despliegue.
