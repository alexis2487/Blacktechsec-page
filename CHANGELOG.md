# CHANGELOG — BLACKTECHSEC V2

Todas las modificaciones notables realizadas en este proyecto están documentadas en este archivo según el estándar [Keep a Changelog](https://keepachangelog.com/es/1.0.0/).

## [2.1.2] - 2026-09-14
### Changed
- Eliminación de todas las menciones a "V2" o "V2.0" en la interfaz de usuario pública y administrativa para mantener únicamente la marca pura **BLACKTECHSEC**.
- Integración del canal oficial de YouTube: `https://www.youtube.com/@AlexisTechSec` en Navbar, Footer, About, Home y Contacto.
- Actualización del enlace oficial de X (Twitter) a `https://x.com/AlexisTechsec` y handle `@AlexisTechsec` en toda la plataforma y metadatos SEO.

## [2.1.1] - 2026-09-14
### Fixed
- Redirección automática de rutas alias `/index`, `/index.html` y `/home` hacia `/` en `App.tsx` para evitar confusión con la pantalla 404.
- Inclusión de directivas de no-caché en `index.html` (`Cache-Control`, `Pragma`, `Expires`) para garantizar actualización instantánea del bundle en navegadores.
- Ajuste en `projectsService.ts` y `contentService.ts` para que proyectos y contenidos creados desde el CMS se muestren en la Home incluso si no tienen flag manual de destacado.
- Corrección de `cname` en `.github/workflows/deploy.yml` a `www.blacktechsec.com`.
- Actualización de la fotografía oficial de perfil de Jair Alexis Martinez (`public/img/profile.jpg`).

## [2.1.0] - 2026-09-14
### Added
- Documentación técnica unificada: `PROJECT.md`, `CURRENT_STATE.md`, `CHANGELOG.md`, `DEVELOPMENT_LOG.md`.
- Rediseño editorial del Hero de la página de inicio centrado en **BLACKTECHSEC** y su filosofía `LEARN. BUILD. EXPLORE. SHARE.`.
- Módulo renovado de exploración tecnológica ("Actualmente Explorando").
- Teaser biográfico al final de la página de inicio vinculando a `/about`.

### Changed
- Reorganización de la jerarquía visual de la Home para desvincularla de la apariencia de un currículum o portafolio estático tradicional.
- Enlace al CV reubicado a la sección especializada `/about` y enlace secundario en el footer.
- CTAs principales del Hero actualizados a "Explorar" y "Ver Proyectos".
- Navbar simplificado para navegación de Hub Tecnológico.

### Fixed
- Metadatos de SEO y títulos de página para reflejar con precisión la identidad de BlackTechSec.

## [2.0.0] - 2026-09-13
### Added
- Reconstrucción completa de la base en React 18 + TypeScript + Vite.
- Integración con backend Supabase (`rqawfhijrokvefzaaxof`) con Row Level Security y storage bucket `media`.
- Capa de abstracción y fallback local híbrido en `src/services/` para tolerancia total a fallos.
- CMS administrativo en `/admin` con autenticación por Supabase Auth.
- Despliegue continuo hacia GitHub Pages con dominio propio `www.blacktechsec.com`.
- Soporte completo de modo oscuro/claro y compatibilidad SPA con `404.html`.
- Respaldo de activos históricos (`profile.jpg`, `favicon.png`, `Curriculum_Vitae.pdf`).
