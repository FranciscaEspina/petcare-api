import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// El backend permite CORS desde el puerto 5173 (el de Vite por defecto).
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
});
