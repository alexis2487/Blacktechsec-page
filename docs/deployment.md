# Guía de Despliegue — GitHub Pages & Supabase

## 1. Flujo de Integración y Entrega Continua (CI/CD)

El despliegue está 100% automatizado mediante **GitHub Actions** en `.github/workflows/deploy.yml`:

```
git push origin main
        |
        v
GitHub Actions Runner
        |
1. Checkout código
2. Setup Node.js 20
3. Inyección de variables de entorno (GitHub Secrets)
4. Compilación (`npm run build`)
5. Subida de artefacto (`dist/`)
6. Despliegue en GitHub Pages
        |
        v
https://www.blacktechsec.com/
```

## 2. Configuración en GitHub Repository

1. **GitHub Pages:**
   * En el repositorio `alexis2487/Blacktechsec-page` en GitHub, navega a **Settings -> Pages**.
   * Bajo **Build and deployment -> Source**, selecciona **GitHub Actions**.
   * Bajo **Custom domain**, confirma que figure `blacktechsec.com` y habilita **Enforce HTTPS**.

2. **Secretos de Entorno (GitHub Actions Secrets):**
   * Navega a **Settings -> Secrets and variables -> Actions**.
   * Agrega las siguientes variables:
     * `VITE_SUPABASE_URL`: `https://tu-proyecto.supabase.co`
     * `VITE_SUPABASE_ANON_KEY`: (Tu clave pública `anon` de Supabase).
     * `VITE_STORAGE_WORKER_URL`: `https://tu-worker.workers.dev`

## 3. Configuración en Supabase

1. Abre el panel de tu proyecto en Supabase Dashboard.
2. Dirígete a **SQL Editor**.
3. Copia y ejecuta el script `supabase/schema.sql` para crear las tablas, políticas RLS y el bucket de Storage `media`.
4. Copia y ejecuta el script `supabase/seed.sql` para poblar la base de datos con los datos iniciales reales.
5. En **Authentication -> Users**, crea el usuario administrador para Jair con el correo oficial y una contraseña segura.
