# DEVELOPMENT_LOG.md — REGISTRO DE DECISIONES TÉCNICAS Y DESARROLLO

Este documento registra cronológicamente las decisiones arquitectónicas, de diseño y de código tomadas en BlackTechSec V2.

---

## Entrada 01: Inicialización y Respaldo de Producción
* **Fecha:** 2026-09-13
* **Acción:** Respaldo de los activos de producción (`https://www.blacktechsec.com/`), configuración de Node.js v20/v24, verificación de llaves SSH y enlace con repositorio GitHub `alexis2487/Blacktechsec-page`.
* **Decisión:** Mantener una copia inmutable de los activos originales (`profile.jpg`, `favicon.png`, `Curriculum_Vitae.pdf`) en `assets_backup/` y en `public/`.

---

## Entrada 02: Arquitectura del Backend y Resiliencia de Servicios
* **Fecha:** 2026-09-13
* **Acción:** Creación de `supabase/schema.sql` y `supabase/seed.sql` para el proyecto Supabase `rqawfhijrokvefzaaxof`.
* **Decisión:** Desacoplar la UI de Supabase implementando `src/services/*Service.ts`. Cada servicio cuenta con un mecanismo de fallback que, en caso de desconexión o configuración pendiente de variables de entorno, devuelve los datos estructurados en memoria de `src/data/initialData.ts`. Esto asegura cero páginas en blanco y cero caídas.

---

## Entrada 03: Despliegue en GitHub Pages y Dominio Personalizado
* **Fecha:** 2026-09-13
* **Acción:** Configuración de `public/CNAME` con `blacktechsec.com`, archivo `public/404.html` para hidratación del SPA en recargas directas, y workflow `.github/workflows/deploy.yml`.
* **Decisión:** Despliegue automatizado por GitHub Actions con branch `gh-pages` y verificación de DNS/SSL.

---

## Entrada 04: Transformación Visual de CV a Personal Technology Hub
* **Fecha:** 2026-09-14
* **Problema:** La versión inicial colocaba a Jair Alexis Martinez y su CV como foco dominante del Hero (similar a una hoja de vida online tradicional), compitiendo con la identidad de marca `BLACKTECHSEC` y el concepto de Hub de Tecnología/Laboratorio.
* **Solución Técnica & Visual:**
  1. El Hero principal se transforma para encabezar con **BLACKTECHSEC** (*Black Technology Security*) y la filosofía `LEARN. BUILD. EXPLORE. SHARE.`.
  2. Los CTAs prioritarios se convierten en `Explorar` y `Ver Proyectos`.
  3. La sección "Actualmente Explorando" adopta un diseño editorial moderno con áreas tecnológicas y descripciones de investigación.
  4. Los Proyectos se presentan como obras y sistemas independientes construidos, no como renglones de empleo.
  5. Los Experimentos se formatean con estética limpia de laboratorio (etiquetas `#LAB`, `#PROTOTYPE`, `#TEST`).
  6. Las Notas Técnicas se estructuran como bitácora/journal de ingeniería.
  7. Al final del Home se ubica el teaser "¿Quién está detrás de BlackTechSec?" para invitar al usuario a la página `/about`, donde reside toda la trayectoria académica, certificaciones y descarga del CV formal.
  8. En el Navbar, los enlaces reflejan la navegación de un hub (`Explorar`, `Proyectos`, `Experimentos`, `Notas`, `Sobre mí`, `Contacto`), manteniendo un acceso sutil al CV sin convertirlo en el protagonista del header.
