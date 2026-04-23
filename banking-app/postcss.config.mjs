import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
