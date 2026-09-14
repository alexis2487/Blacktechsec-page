# Manual del CMS Administrativo — BlackTechSec V2

## 1. Acceso al Panel Administrativo
* URL de acceso: `https://www.blacktechsec.com/admin` (o en local `http://localhost:5173/admin`).
* Solo el propietario (**Jair Alexis Martinez**) cuenta con credenciales de acceso.
* La ruta está protegida tanto en el cliente como en la base de datos mediante **Row Level Security (RLS)** de Supabase.

## 2. Funcionalidades del CMS

### 2.1. Gestión de Proyectos (`/admin/projects`)
* **Crear nuevo proyecto:** Ingresa título, descripción breve, descripción detallada, tecnologías, categoría y enlaces a GitHub y demo.
* **Marcar como Destacado:** Haz clic en el ícono de estrella (★) para que aparezca en la portada de la web.
* **Estados de proyecto:** Cambia entre `Concept`, `Experimental`, `In Development`, `Completed` o `Archived`.

### 2.2. Gestión de Contenido Multimedia (`/admin/content`)
* **Registrar publicaciones:** Centraliza videos de YouTube, tutoriales de GitHub, posts de Instagram o artículos del sitio.
* **Borrador vs. Publicado:** Puedes ocultar publicaciones del público sin eliminarlas utilizando el botón de visibilidad (ícono de ojo).

### 2.3. Gestión de Experimentos (`/admin/experiments`)
* Documenta hipótesis, scripts de Python, pruebas con herramientas de IA y laboratorios activos.

### 2.4. Gestión de Notas Técnicas (`/admin/notes`)
* Añade rápidamente comandos, trucos de configuración de Linux, consultas DAX o lecciones aprendidas con etiquetas descriptivas.

### 2.5. Perfil y Currículum Vitae (`/admin/profile`)
* **Actualización del CV:** Sube un nuevo archivo PDF directamente desde el panel. El sistema lo alojará en Supabase Storage y actualizará automáticamente el enlace de descarga pública sin modificar ningún archivo del código fuente.
* **Actualización de formación académica:** Modifica el estado de tus estudios (ej. Especialización en curso -> Graduado) desde la interfaz visual.
