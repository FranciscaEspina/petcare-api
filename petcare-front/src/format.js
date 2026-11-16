const moneda = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

export const formatearCosto = (costo) =>
  costo === null || costo === undefined ? "Sin costo" : moneda.format(costo);

export const formatearFecha = (iso) =>
  new Date(iso).toLocaleString("es-CL", { dateStyle: "medium", timeStyle: "short" });

export function formatearEdad(fechaNacimiento) {
  if (!fechaNacimiento) return "Edad no registrada";
  const nacimiento = new Date(fechaNacimiento + "T00:00:00");
  const hoy = new Date();
  let meses =
    (hoy.getFullYear() - nacimiento.getFullYear()) * 12 + (hoy.getMonth() - nacimiento.getMonth());
  if (hoy.getDate() < nacimiento.getDate()) meses -= 1;
  if (meses < 1) return "Menos de 1 mes";
  if (meses < 12) return `${meses} ${meses === 1 ? "mes" : "meses"}`;
  const anios = Math.floor(meses / 12);
  return `${anios} ${anios === 1 ? "año" : "años"}`;
}

export function emojiEspecie(especie = "") {
  const e = especie.toLowerCase();
  if (e.includes("perro") || e.includes("can")) return "🐶";
  if (e.includes("gato") || e.includes("felino")) return "🐱";
  if (e.includes("conejo")) return "🐰";
  if (e.includes("ave") || e.includes("pájaro") || e.includes("pajaro") || e.includes("loro")) return "🦜";
  if (e.includes("hámster") || e.includes("hamster")) return "🐹";
  if (e.includes("tortuga")) return "🐢";
  if (e.includes("pez")) return "🐟";
  return "🐾";
}
