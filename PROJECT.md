# BLACKTECHSEC V2 — PROJECT SPECIFICATION & ARCHITECTURE

## 1. Identidad y Filosofía
* **Nombre de Marca:** BLACKTECHSEC
* **Nombre Conceptual:** BLACK TECHNOLOGY SECURITY
* **Propietario y Creador:** Jair Alexis Martinez (Ingeniero de Sistemas UNAD, Especialización en Seguridad Informática UNAD).
* **Filosofía Central:**
  > **LEARN. BUILD. EXPLORE. SHARE.**  
  > *"Exploro tecnología, construyo cosas y comparto lo que aprendo."*

### Definición del Espacio
BlackTechSec es un **espacio digital personal y profesional de tecnología**, concebido como:
* Laboratorio creativo y técnico
* Plataforma de divulgación e ingeniería
* Revista o bitácora digital de investigación
* Hub central de proyectos, experimentos, notas y aprendizajes

### Qué NO es BlackTechSec
* ❌ NO es una empresa ni agencia de ciberseguridad o consultoría.
* ❌ NO es una academia, sitio de cursos, ni plataforma educativa comercial.
* ❌ NO es una tienda, marketplace ni SaaS.
* ❌ NO es un CV o currículum online tradicional con formato de hoja de vida.
* ❌ NO es una red social (sin likes, followers, comentarios sociales ni vanagloria).
* ❌ NO utiliza clichés ficticios de Hollywood (sin texto verde estilo Matrix cayendo, sin hackers encapuchados, sin calaveras, sin terminales simuladas falsas ni luces de neón agresivas).

---

## 2. Pilares Temáticos
1. **Technology & Innovation:** Análisis de tendencias, hardware, ecosistemas y arquitectura técnica.
2. **Artificial Intelligence (AI):** Agentes autónomos, LLMs, flujos de trabajo con IA, automatización inteligente y visión por computador.
3. **Cybersecurity:** Diagnóstico de madurez, seguridad defensiva, bastionado de sistemas, análisis de vulnerabilidades, telemetría y seguridad en aplicaciones.
4. **Software Development:** Desarrollo backend con C# / .NET / ASP.NET Core, APIs RESTful, Python, arquitecturas limpias y patrones de diseño.
5. **Data & Business Intelligence:** Modelado de datos, pipelines de análisis con Python, SQL/NoSQL y tableros analíticos en Power BI.
6. **Technology Lifestyle & Setup:** Herramientas de productividad de ingeniería, entornos Linux/Windows, configuraciones de desarrollo y hardware.

---

## 3. Arquitectura y Stack Tecnológico
* **Frontend:** React 18 + TypeScript + Vite.
* **Estilos:** Tailwind CSS con tema oscuro prioritario (`zinc-950`/`zinc-900`/`zinc-800`) y soporte para tema claro.
* **Íconos:** `lucide-react`.
* **Enrutamiento:** React Router v6 con soporte SPA para GitHub Pages (`404.html` + script de hidratación).
* **Backend:** Supabase (PostgreSQL, Row Level Security, Auth, Storage bucket `media`).
* **Capa de Abstracción de Datos:** Desacoplada en `src/services/` con **Fallback Híbrido** resiliente (cero caídas si Supabase no está conectado).
* **Hosting:** GitHub Pages con dominio propio `www.blacktechsec.com` (`CNAME`).

---

## 4. Estructura de Rutas y Navegación
* `/` — Inicio (Home): Hub central de exploración, proyectos, experimentos, notas y presentación de BlackTechSec.
* `/content` — Explorar / Publicaciones: Artículos, videos, hilos técnicos y divulgación.
* `/content/:slug` — Detalle de Publicación.
* `/projects` — Cosas que He Construido (Proyectos): Soluciones de software, herramientas y sistemas.
* `/projects/:slug` — Ficha técnica de proyecto.
* `/experiments` — Laboratorio: Prototipos rápidos, pruebas de concepto y scripts.
* `/experiments/:slug` — Detalle de experimento.
* `/notes` — Notas Técnicas: Bitácora de aprendizaje y apuntes de ingeniería.
* `/notes/:slug` — Detalle de nota técnica.
* `/about` — Sobre Jair (About Jair): Historia, motivación, formación académica, certificaciones, habilidades y acceso al CV oficial.
* `/contact` — Contacto profesional honesto.
* `/admin` — CMS administrativo protegido para gestionar todo el contenido en Supabase.
