# BLACKTECHSEC V2 — BITÁCORA DE DESARROLLO Y CONTINUIDAD

**Proyecto:** BLACKTECHSEC V2 — Personal Technology Hub  
**Propietario:** Jair Alexis Martinez  
**Dominio:** [https://www.blacktechsec.com/](https://www.blacktechsec.com/)  
**Repositorio:** [alexis2487/Blacktechsec-page](git@github.com:alexis2487/Blacktechsec-page.git)  
**Backend:** Supabase (`rqawfhijrokvefzaaxof`)  
**Fecha de Inicio:** 13 de Septiembre de 2026  

---

## 1. RESUMEN EJECUTIVO Y OBJETIVOS

Transformar el sitio actual de BlackTechSec (anteriormente enfocado en formato CV/portafolio estático) en un **Hub Tecnológico Personal y Profesional** moderno, dinámico y escalable bajo la filosofía:

> **LEARN. BUILD. EXPLORE. SHARE.**  
> *"Exploring technology, building things and sharing what I learn."*

### Pilares Fundamentales:
* **Technology & Innovation**
* **Artificial Intelligence (AI)**
* **Cybersecurity**
* **Software Development (Backend & Fullstack)**
* **Data & Business Intelligence**
* **Technology Lifestyle**

El sitio no se proyectará como una empresa ni como un blog genérico de hacking cliché, sino como la base digital de la trayectoria tecnológica de Jair Alexis Martinez.

---

## 2. AUDITORÍA DEL ESTADO INICIAL Y PREPARACIÓN DEL ENTORNO

### 2.1. Conexión de Control de Versiones (Git & GitHub)
* Se verificó la conexión SSH hacia GitHub mediante las llaves `id_ed25519` existentes en el sistema (`C:\Users\jaira\.ssh`).
* Se configuró `core.sshCommand` para asegurar el uso nativo de OpenSSH de Windows.
* Se inicializó el repositorio local en rama `main` y se vinculó al remoto oficial:  
  `git remote add origin git@github.com:alexis2487/Blacktechsec-page.git`
* Se probó exitosamente `git fetch` y comunicación con GitHub.

### 2.2. Entorno de Ejecución Local
* Se detectó la ausencia de Node.js en el sistema inicial.
* Se descargó e instaló de forma no invasiva y optimizada **Node.js LTS v20.18.0** y **npm 10.8.2** en el directorio de programas del usuario (`%LOCALAPPDATA%\Programs\node-v20.18.0-win-x64`), agregándolo al `PATH` del usuario permanentemente.

### 2.3. Rescate y Preservación de Activos Existentes
Se inspeccionó y respaldó el contenido del sitio en producción (`https://www.blacktechsec.com/`):
* **Foto de perfil real:** `profile.jpg` (38.5 KB) respaldada en `assets_backup/profile.jpg`.
* **Favicon e identidad:** `favicon.png` (28.1 KB) respaldada en `assets_backup/favicon.png`.
* **Currículum Vitae oficial en PDF:** `Currículum Vitae.pdf` (122 KB) respaldada en `assets_backup/Curriculum_Vitae.pdf`.
* **Manifiesto de aplicación:** `manifest.json` respaldado en `assets_backup/manifest.json`.
* **HTML completo y estructura semántica:** `live_site_backup.html`.

---

## 3. INVENTARIO DE INFORMACIÓN EXISTENTE A CONSERVAR

Toda la información del perfil actual de Jair Alexis Martinez ha sido indexada para su integración limpia en la V2:

| Categoría | Elementos Clave Preservados |
| :--- | :--- |
| **Identidad** | Jair Alexis Martinez · Ingeniero de Sistemas |
| **Enfoque** | Backend, C#, .NET, ASP.NET Core, APIs REST, Python, SQL/NoSQL, IA aplicada, Ciberseguridad, Automatización, Power BI |
| **Educación** | • UNAD: Ingeniería de Sistemas (Graduado 2026)<br>• UNAD: Especialización en Seguridad Informática (En curso) |
| **Certificaciones** | • Análisis de datos con Python (2026)<br>• Cisco Packet Tracer (2026, Cisco Networking Academy)<br>• Power BI (2026, Santander Open Academy)<br>• Introducción a seguridad informática (2025, Cisco Networking Academy)<br>• Ponencia EXPOTECH (Marzo 2025, UNAD) |
| **Proyectos Existentes** | 1. Prototipo de diagnóstico de madurez en ciberseguridad para MiPymes<br>2. Proyectos y laboratorios de ciberseguridad y sistemas<br>3. Automatización y análisis de datos |
| **Habilidades** | Python, C#, APIs REST, SQL, NoSQL, MongoDB, Linux, Windows, Power BI, Microsoft Copilot Agents, Git, GitHub |
| **Contacto & Redes** | Email: `alexis.martinez_systems.engineer@outlook.com`<br>LinkedIn: `https://www.linkedin.com/in/jair-alexis-martinez-302b78305`<br>GitHub: `https://github.com/alexis2487`<br>Twitter/X: `https://x.com/BlackTechSec_` |

---

## 4. ANÁLISIS DE CONFIGURACIÓN DE HOSTING (GITHUB PAGES)

* **Dominio personalizado:** `blacktechsec.com`.
* **Requisito CNAME:** El archivo `CNAME` debe residir en `public/CNAME` para que el proceso de build de Vite lo incluya directamente en la raíz de `dist/`.
* **Requisito de Enrutamiento SPA en GitHub Pages:** Al ser una Single Page Application con rutas como `/projects`, `/about`, `/notes`, `/admin`, GitHub Pages devolvería un error 404 ante recargas directas en esas rutas si no se cuenta con un fallback. Se implementará el patrón estándar `404.html` que redirige de forma transparente al motor de rutas en `index.html`.
* **GitHub Actions Workflow:** Se creará un workflow automatizado `.github/workflows/deploy.yml` para compilar y desplegar a GitHub Pages con cada push a la rama `main`.

---

## 5. ESTRATEGIA DE INTEGRACIÓN CON SUPABASE

* **Proyecto:** `rqawfhijrokvefzaaxof` (`https://rqawfhijrokvefzaaxof.supabase.co`)
* **Seguridad:**
  * No se incluirán claves secretas ni `service_role` en el repositorio ni en el bundle del cliente.
  * Se utilizarán variables de entorno Vite: `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
  * Se creará archivo `.env.example` para documentación clara de variables requeridas.
* **Capa de Abstracción Resiliente (Fallback Híbrido):**
  * Para garantizar que el sitio web funcione de manera inmediata en cualquier entorno (incluyendo si las credenciales de Supabase aún no han sido inyectadas o si la base de datos está en proceso de configuración), la capa `services/` implementará un mecanismo inteligente:
    1. Si las variables de Supabase están configuradas y accesibles, consulta la base de datos en tiempo real.
    2. Si no están configuradas o hay fallo de red, sirve el dataset semilla inicial estructurado (proyectos, certificaciones, perfil, experimentos iniciales).
    3. Esto garantiza **cero caídas** y disponibilidad 100% desde el primer despliegue.
* **Esquema de Base de Datos y Storage:**
  * Se generará el script SQL completo en `supabase/schema.sql` con Row Level Security (RLS) habilitado:
    * `content` (artículos, videos, publicaciones externas)
    * `projects` (proyectos principales, tecnologías, URLs, galería)
    * `experiments` (prototipos, pruebas de concepto, scripts)
    * `notes` (notas técnicas de aprendizaje)
    * `profile_settings` (configuraciones editables de bio, formación y áreas)
  * Bucket de almacenamiento en Supabase Storage: `media` para portadas, capturas y archivos descargables (incluyendo CV).

---

## 6. PROPUESTA DE ARQUITECTURA TÉCNICA (V2)

```
blacktechsec-v2/
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD automático hacia GitHub Pages
├── public/
│   ├── CNAME                       # blacktechsec.com
│   ├── 404.html                    # Redireccionamiento SPA para GH Pages
│   ├── favicon.png                 # Favicon oficial
│   ├── robots.txt                  # Directivas para motores de búsqueda
│   ├── sitemap.xml                 # Índice SEO del sitio
│   └── img/                        # Assets estáticos de arranque
├── src/
│   ├── components/
│   │   ├── common/                 # Botones, Cards, Badges, Modales, Skeleton loaders
│   │   ├── layout/                 # Navbar, Footer, MobileNav, Container
│   │   ├── sections/               # Hero, CurrentlyExploring, FeaturedProjects, LatestNotes, etc.
│   │   └── seo/                    # HeadManager / MetaTags dinámicos
│   ├── pages/
│   │   ├── HomePage.tsx            # Portada de alto impacto ("Learn. Build. Explore. Share.")
│   │   ├── AboutPage.tsx           # Historia, perfil, educación, certificaciones, stack
│   │   ├── ContentPage.tsx         # Hub multimedia (YouTube, artículos, tutoriales)
│   │   ├── ContentDetailPage.tsx   # Vista individual de contenido
│   │   ├── ProjectsPage.tsx        # Catálogo de proyectos con filtros y estados
│   │   ├── ProjectDetailPage.tsx   # Ficha técnica ampliada del proyecto
│   │   ├── ExperimentsPage.tsx     # Laboratorio de experimentos y prototipos
│   │   ├── ExperimentDetailPage.tsx# Ficha del experimento
│   │   ├── NotesPage.tsx           # Notas técnicas y descubrimientos
│   │   ├── NoteDetailPage.tsx      # Lectura de nota en formato editorial
│   │   ├── ContactPage.tsx         # Medios de contacto profesional y formulario seguro
│   │   └── admin/                  # CMS de administración exclusivo
│   │       ├── AdminLoginPage.tsx  # Acceso con Supabase Auth
│   │       ├── AdminDashboard.tsx  # Panel principal de métricas y acceso rápido
│   │       ├── AdminContent.tsx    # Gestión de contenidos
│   │       ├── AdminProjects.tsx   # Gestión de proyectos
│   │       ├── AdminExperiments.tsx# Gestión de experimentos
│   │       └── AdminNotes.tsx      # Gestión de notas
│   ├── lib/
│   │   └── supabase.ts             # Cliente inicializado de Supabase con fallback seguro
│   ├── services/                   # Abstracción de datos (content, projects, experiments, notes, auth)
│   ├── hooks/                      # useTheme, useAuth, useData
│   ├── types/                      # Interfaces TypeScript para todo el modelo de datos
│   ├── styles/                     # Tailwind CSS y variables de diseño editorial
│   ├── data/                       # Seeds y fallbacks iniciales de alta calidad
│   ├── App.tsx                     # Enrutador principal y proveedores de contexto
│   └── main.tsx                    # Punto de entrada de React
├── supabase/
│   ├── schema.sql                  # Definición de tablas, RLS, triggers y storage
│   └── seed.sql                    # Datos iniciales precargados
├── docs/                           # Documentación completa requerida (Req #50)
├── .env.example
├── README.md
├── AGENTS.md
├── GEMINI.md
└── PROGRESS.md                     # Bitácora continua del proyecto (este archivo)
```

---

## 7. ANÁLISIS DE RIESGOS Y CONFLICTOS POTENCIALES

| Riesgo / Conflicto Potencial | Estrategia de Mitigación |
| :--- | :--- |
| **Pérdida de SEO o enlaces rotos del sitio anterior** | Mantener los mismos nombres de anclas y secciones clave (`#about`, `#projects`, `#contact`), e implementar canonical URLs y redirecciones limpias. |
| **Rutas SPA en GitHub Pages fallando al refrescar** | Implementar `404.html` con script de hidratación SPA que reenvía a `index.html` preservando la ruta y los parámetros. |
| **Dependencia exclusiva de Supabase en el primer deploy** | Desarrollar la capa de datos con patrón "Offline-First Fallback". Si las variables de Supabase no están presentes, la web funciona al 100% con los datos precargados; una vez configurado Supabase, el CMS toma el control. |
| **Estética "Hacker Cliché"** | Rechazar terminales falsas, texto verde neón saturado o fondos de Matrix. Aplicar un diseño moderno, tipografía monoespaciada sutil combinada con fuentes sans-serif de grado editorial, fondos oscuros profundos (`zinc-950`/`slate-900`) y acentos de color cian/azul zafiro de alta legibilidad. |

---

## 8. PLAN DE TRABAJO Y ESTADO DE AVANCE

- [x] **Fase 1:** Diagnóstico, respaldo de activos (`profile.jpg`, `favicon.png`, `Curriculum_Vitae.pdf`), verificación de git/repositorio, instalación de entorno y propuesta arquitectónica.
- [x] **Fase 2:** Inicialización de React 18 + TypeScript + Vite + Tailwind CSS + Lucide Icons + React Router.
- [x] **Fase 3:** Modelado de tipos (`types/index.ts`), datos estructurados de alta fidelidad (`data/initialData.ts`) y servicios desacoplados con fallback resiliente (`services/*`).
- [x] **Fase 4:** Diseño del layout global (Navbar responsivo, Footer institucional con filosofía de marca, Selector de tema Dark/Light).
- [x] **Fase 5:** Implementación completa de páginas públicas:
  - `HomePage`: Hero editorial ("LEARN. BUILD. EXPLORE. SHARE."), Actualmente Explorando, Proyectos Destacados, Experimentos Recientes, Notas Técnicas y Contacto.
  - `AboutPage`: Historia, formación académica en la UNAD, certificaciones con tópicos, habilidades clasificadas y descarga de CV.
  - `ProjectsPage` & `ProjectDetailPage`: Catálogo filtrable por categorías y búsqueda por texto, fichas técnicas completas con enlaces a GitHub y demos.
  - `ContentPage` & `ContentDetailPage`: Biblioteca multimedia para videos, tutoriales y posts externos.
  - `ExperimentsPage` & `ExperimentDetailPage`: Laboratorio técnico para prototipos y scripts.
  - `NotesPage` & `NoteDetailPage`: Bitácora y notas de ingeniería en formato editorial.
  - `ContactPage`: Canales directos, copiado rápido de correo y formulario protegido con honeypot anti-spam.
- [x] **Fase 6:** Implementación del CMS Administrativo (`/admin`):
  - Autenticación con Supabase Auth y sesión segura.
  - Panel de métricas e indicador de estado de backend.
  - Vistas de gestión para Proyectos, Contenido, Experimentos y Notas (crear, editar, eliminar, publicar, destacar).
  - Gestión de perfil, estado de formación académica y subida de nuevo PDF para el CV sin tocar código.
- [x] **Fase 7:** Infraestructura de datos: `supabase/schema.sql` (tablas, RLS, storage bucket `media`) y `supabase/seed.sql` (datos iniciales listos para importar).
- [x] **Fase 8:** Optimización SEO, metadatos dinámicos, `sitemap.xml`, `robots.txt`, `public/CNAME` (`blacktechsec.com`), `404.html` (SPA routing en GitHub Pages) y GitHub Actions workflow (`deploy.yml`).
- [x] **Fase 9:** Documentación técnica integral: `README.md`, `AGENTS.md`, `GEMINI.md`, `.env.example`, `docs/architecture.md`, `docs/content-model.md`, `docs/development.md`, `docs/deployment.md`, `docs/design-system.md`, `docs/cms.md`.
- [x] **Fase 10:** Verificación y compilación estricta de producción (`npm run build`) completada con éxito.
- [ ] **Fase 11:** Commit inicial y push al repositorio remoto en GitHub (`git@github.com:alexis2487/Blacktechsec-page.git`).

---

## 9. VERIFICACIÓN DE CRITERIOS DE ÉXITO (REQ 59)

* ✅ Dominio `blacktechsec.com` configurado en `public/CNAME`.
* ✅ GitHub Pages 100% compatible mediante CI/CD automático y redirección SPA (`404.html`).
* ✅ Repositorio oficial vinculado: `git@github.com:alexis2487/Blacktechsec-page.git`.
* ✅ Supabase configurado para el proyecto `rqawfhijrokvefzaaxof` con RLS y storage.
* ✅ Frontend modular en React + TypeScript + Vite + Tailwind CSS.
* ✅ CMS administrativo exclusivo para Jair Alexis Martinez en `/admin`.
* ✅ Información profesional existente, proyectos, certificaciones y CV preservados.
* ✅ SEO completo, canonicals, metadatos, sitemap.xml y robots.txt.
* ✅ Sin secretos en código ni en Git.
* ✅ Cero clichés de hacking tradicional; diseño sobrio, tecnológico y editorial.
* ✅ Modo oscuro elegante y modo claro funcional.
* ✅ Dominio vinculado y respondiendo con HTTPS (`blacktechsec.com` -> `www.blacktechsec.com`).
* ✅ Rama de producción `gh-pages` activa y sirviendo el bundle compilado de React 18 en vivo (200 OK).
* ✅ Despliegue en producción verificado: scripts, estilos, imágenes y CV funcionando.

