# Guía de Desarrollo Local — BlackTechSec V2

## 1. Requisitos Previos
* **Node.js**: v20.x o superior.
* **npm**: v10.x o superior.
* **Git**: configurado con acceso a GitHub.

## 2. Puesta en Marcha

1. **Clonar o abrir el repositorio:**
   ```bash
   git clone git@github.com:alexis2487/Blacktechsec-page.git
   cd Blacktechsec-page
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env` basado en `.env.example`:
   ```env
   VITE_SUPABASE_URL=https://rqawfhijrokvefzaaxof.supabase.co
   VITE_SUPABASE_ANON_KEY=tu_anon_key_aqui
   ```
   > **Nota:** Si no cuentas con las credenciales inmediatamente, el sistema funcionará automáticamente en modo local con los datos precargados.

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre tu navegador en `http://localhost:5173`.

5. **Compilación de producción y validación:**
   ```bash
   npm run build
   ```
   Genera la carpeta `dist/` optimizada y libre de errores de tipos.
