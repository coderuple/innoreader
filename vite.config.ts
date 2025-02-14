import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "all",
      "localhost",
      "0238-98-97-79-170.ngrok-free.app",
      "innoreader.vercel.app",
    ],
  },
});
