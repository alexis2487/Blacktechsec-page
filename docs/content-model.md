# Modelo de Contenido — BlackTechSec V2

## 1. Entidades Principales

### 1.1. Projects (`projects`)
Representa proyectos técnicos formales desarrollados o en desarrollo.
* `id` (UUID, PK)
* `title` (TEXT): Nombre descriptivo.
* `slug` (TEXT, UNIQUE): Identificador amigable para URL (`/projects/[slug]`).
* `short_description` (TEXT): Resumen visible en tarjetas.
* `full_description` (TEXT): Detalle técnico exhaustivo y alcance.
* `technologies` (TEXT[]): Array de tecnologías clave.
* `category` (TEXT): Categoría temática (`Cybersecurity`, `Development`, `Data`, `Technology`).
* `status` (TEXT): `Concept` | `Experimental` | `In Development` | `Completed` | `Archived`.
* `cover_image` (TEXT): URL pública de portada en Supabase Storage.
* `gallery` (TEXT[]): Capturas o diagramas adicionales.
* `github_url` (TEXT): Enlace al repositorio de código en GitHub.
* `live_url` (TEXT): Enlace al prototipo desplegado si aplica.
* `featured` (BOOLEAN): Si debe exhibirse en la página principal.

### 1.2. Content (`content`)
Biblioteca multimedia de divulgación y enlaces externos (YouTube, TikTok, Instagram, Artículos).
* `id` (UUID, PK)
* `title` (TEXT): Título de la publicación o video.
* `slug` (TEXT, UNIQUE): Slug para URL individual.
* `description` (TEXT): Resumen del contenido.
* `content` (TEXT): Notas extendidas o transcripción.
* `category` (TEXT): `AI` | `Cybersecurity` | `Development` | `Technology` | `Lifestyle`.
* `tags` (TEXT[]): Palabras clave.
* `publication_date` (DATE): Fecha de publicación.
* `external_url` (TEXT): Enlace a la red o recurso original.
* `platform` (TEXT): `YouTube` | `Instagram` | `TikTok` | `Website` | `GitHub` | `Other`.
* `featured` (BOOLEAN): Mostrar en portada.
* `published` (BOOLEAN): Estado visible o borrador.

### 1.3. Experiments (`experiments`)
Laboratorio de pruebas de concepto, prototipos rápidos e investigaciones personales.
* `id` (UUID, PK)
* `title` (TEXT)
* `slug` (TEXT, UNIQUE)
* `description` (TEXT)
* `content` (TEXT): Hipótesis, pruebas realizadas y hallazgos.
* `technologies` (TEXT[])
* `category` (TEXT)
* `cover_image` (TEXT)
* `github_url` (TEXT)
* `status` (TEXT): `Experimental` | `In Progress` | `Validated`.
* `publication_date` (DATE)
* `featured` (BOOLEAN)

### 1.4. Notes (`notes`)
Notas técnicas concisas, comandos de referencia, configuraciones y aprendizajes personales.
* `id` (UUID, PK)
* `title` (TEXT)
* `slug` (TEXT, UNIQUE)
* `content` (TEXT)
* `category` (TEXT)
* `tags` (TEXT[])
* `publication_date` (DATE)
* `published` (BOOLEAN)

### 1.5. Profile Settings (`profile_settings`)
Configuraciones globales administrables de Jair Alexis Martinez (biografía, disponibilidad, enlaces sociales y CV).
