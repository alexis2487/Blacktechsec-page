# CURRENT_STATE.md — ESTADO ACTUAL DEL PROYECTO BLACKTECHSEC V2

## 1. Estado General
* **Dominio:** `https://www.blacktechsec.com/` (En producción en GitHub Pages, DNS y SSL activos).
* **Compilación:** Limpia (`tsc && vite build` compila al 100% sin errores ni advertencias de tipos).
* **Base de Datos:** Supabase (`rqawfhijrokvefzaaxof`) con esquema `schema.sql`, datos semilla `seed.sql`, RLS habilitado y fallback híbrido local completamente funcional.
* **CMS Administrativo:** Operativo en `/admin` con autenticación por Supabase Auth, gestión de Proyectos, Contenido, Experimentos, Notas y Perfil.

---

## 2. Inventario de Componentes y Funcionalidades Reutilizables

### Capa de Servicios (`src/services/`) — ✅ 100% Funcional y Desacoplada
* `profileService.ts`: Información de perfil, educación, certificaciones, habilidades y áreas de exploración.
* `projectsService.ts`: CRUD y consultas de proyectos con fallback a `initialProjects`.
* `contentService.ts`: CRUD y consultas de artículos y multimedia con fallback a `initialContent`.
* `experimentsService.ts`: CRUD y consultas de laboratorio con fallback a `initialExperiments`.
* `notesService.ts`: CRUD y consultas de notas técnicas con fallback a `initialNotes`.
* `authService.ts`: Manejo de sesión y login con Supabase Auth.

### Capa UI Reutilizable (`src/components/`)
* `Card.tsx`: Contenedor base de tarjeta con elevación, bordes discretos y hover suave.
* `Badge.tsx`: Etiquetas de categorías y estados (variants: `default`, `accent`, `outline`, `success`, `ghost`).
* `Button.tsx`: Botón versátil con soporte de enlaces internos (`to`), externos (`href`), variantes y tamaños.
* `EmptyState.tsx`: Estado vacío limpio para cuando no hay resultados de filtro o búsqueda.
* `MetaTags.tsx`: Gestión dinámica de `document.title` y meta tags SEO.
* `Navbar.tsx`: Barra de navegación responsive con selector de tema (claro/oscuro) y estado de autenticación.
* `Footer.tsx`: Pie de página con filosofía de marca, enlaces de navegación y redes.

### Rutas y Vistas Públicas (`src/pages/`)
* `HomePage.tsx`: Vista principal (en proceso de transformación visual para eliminar sensación de CV).
* `AboutPage.tsx`: Información detallada de Jair Alexis Martinez, educación, trayectoria y CV.
* `ProjectsPage.tsx` y `ProjectDetailPage.tsx`: Catálogo y detalle de proyectos construidos.
* `ContentPage.tsx` y `ContentDetailPage.tsx`: Directorio de publicaciones y artículos.
* `ExperimentsPage.tsx` y `ExperimentDetailPage.tsx`: Laboratorio de prototipos y PoCs.
* `NotesPage.tsx` y `NoteDetailPage.tsx`: Bitácora y apuntes técnicos.
* `ContactPage.tsx`: Formulario de contacto directo y enlaces verificados.
* `NotFoundPage.tsx`: Vista 404 compatible con el SPA de GitHub Pages.

---

## 3. Diagnóstico de Transformación Visual Requerida

### Problemas Identificados en la Versión Anterior (Formato CV):
1. **Hero Principal en Home:** La cabecera mostraba en grande `"Jair Alexis Martinez — Ingeniero de Sistemas"` con una foto de perfil dominante y botón principal `"Descargar CV"`, dando la impresión de un currículum o portafolio personal de empleo en lugar de un Hub Tecnológico.
2. **Navegación:** En el Navbar, el botón de "CV" tenía excesivo protagonismo en el header principal.
3. **Metadatos:** Los títulos y descripciones SEO enfatizaban "Portafolio y CV" en lugar de "BLACKTECHSEC — Personal Technology Hub".
4. **Secciones de Home:** Faltaba la estructura editorial equilibrada de Hub (Revista / Laboratorio / Journal / Things I've Built / Exploración / Teaser humano al final).

### Plan de Transformación sin Romper Nada:
* La marca **BLACKTECHSEC** pasa al frente del Hero con el tagline *"Exploro tecnología, construyo cosas y comparto lo que aprendo"*.
* La autoría *"By Jair Alexis Martinez"* se ubica como contexto complementario elegante.
* El botón de "Descargar CV" y los detalles de educación/certificaciones se trasladan al lugar que les corresponde: la página `/about` ("Sobre Jair / About Jair") y un enlace secundario discreto en el pie de página.
* Las llamadas a la acción (CTAs) del Hero pasan a ser: `Explorar Contenido` y `Ver Proyectos`.
* Se potencia la sección de **Actualmente Explorando** como tarjetas de investigación activas (IA, Ciberseguridad, Dev Tools, Automatización, etc.).
* Se integran los módulos de **Proyectos**, **Experimentos (Lab)**, **Notas (Journal)** y **Publicaciones**.
* Al final de la página principal se añade una sección teaser humana: *"¿Quién está detrás de BlackTechSec?"*, con invitación a conocer el perfil en `/about`.
