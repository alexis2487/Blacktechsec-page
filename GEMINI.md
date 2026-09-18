# Protocolo de Contexto y Asistencia Técnica (GEMINI.md) — BlackTechSec V2

## Contexto del Proyecto
* **Nombre:** BLACKTECHSEC V2
* **Objetivo:** Personal Technology Hub de Jair Alexis Martinez (Ingeniero de Sistemas UNAD).
* **Dominio:** `https://www.blacktechsec.com/`
* **Repositorio Remoto:** `git@github.com:alexis2487/Blacktechsec-page.git`
* **Proyecto Supabase:** `rqawfhijrokvefzaaxof`
* **Storage de Objetos:** Cloudflare R2 (`blacktechsec-storage`)
* **Worker de Subida R2:** `https://blacktechsec-storage-worker.jairalexis2487.workers.dev`
* **Dominio Público R2:** `https://pub-731e8dd084f74188a67aaecde316425d.r2.dev`


## Convenciones de Desarrollo
* **Framework:** React 18 + TypeScript + Vite.
* **Estilos:** Tailwind CSS con clases de modo oscuro (`dark`) prioritarias.
* **Íconos:** `lucide-react`.
* **Capas del Código:**
  * `src/components/`: Componentes modulares y reutilizables.
  * `src/pages/`: Páginas públicas y rutas administrativas en `/admin`.
  * `src/services/`: Capa de abstracción de datos con fallback híbrido.
  * `src/context/`: Estado de sesión y preferencias de tema.
  * `src/types/`: Interfaces TypeScript compartidas.

## Comandos Rápidos
```bash
npm run dev     # Servidor local Vite
npm run build   # Verificación estricta de tipos y compilación de producción
```

## Respaldo de Activos
Los activos originales rescatados del sitio anterior residen en `public/img/profile.jpg`, `public/favicon.png` y `public/Curriculum_Vitae.pdf`.
