# Arquitectura del Sistema — BlackTechSec V2

## 1. Visión General
BlackTechSec V2 es un Personal Technology Hub para Jair Alexis Martinez. Combina la velocidad y costo cero de alojamiento estático en **GitHub Pages** con la potencia de base de datos en tiempo real, autenticación y almacenamiento de objetos de **Supabase**.

```
                           +------------------------+
                           |     Visitante Web      |
                           +-----------+------------+
                                       |
                                       v
                           +------------------------+
                           |   blacktechsec.com     |
                           |    (GitHub Pages)      |
                           +-----------+------------+
                                       |
        +------------------------------+------------------------------+
        |                                                             |
        v                                                             v
+-------+--------------------+                         +--------------+-------------+
|    Frontend SPA (Vite)     |                         |  CMS Administrativo (/admin)|
|  React 18 + TypeScript    |                         |  Jair Alexis Martinez       |
|  Tailwind CSS + Lucide     |                         |  Supabase Auth Guard        |
+-------+--------------------+                         +--------------+-------------+
        |                                                             |
        +------------------------------+------------------------------+
                                       |
                                       v
                     +-----------------+-----------------+
                     |   Capa de Servicios Desacoplada   |
                     |       (src/services/*.ts)         |
                     |  Fallback Híbrido Resiliente      |
                     +-----------------+-----------------+
                                       |
                     +-----------------+-----------------+
                     |     Supabase Cloud Platform       |
                     |  Project ID: rqawfhijrokvefzaaxof |
                     |  - PostgreSQL con RLS             |
                     |  - Supabase Auth                  |
                     |  - Supabase Storage (media)       |
                     +-----------------------------------+
```

## 2. Principios de Diseño del Software

### 2.1. Desacoplamiento de la Capa de Datos
Ningún componente de React realiza llamadas directas al SDK de Supabase. Todo acceso se realiza a través de `src/services/*`:
* `projectsService.ts`: CRUD y filtrado de proyectos técnicos.
* `contentService.ts`: Publicaciones y enlaces multimedia.
* `experimentsService.ts`: Prototipos y scripts de laboratorio.
* `notesService.ts`: Bitácora y documentación de aprendizajes.
* `profileService.ts`: Datos biográficos, formación y certificaciones.
* `storageService.ts`: Subida segura de imágenes y documentos PDF.
* `authService.ts`: Autenticación administrativa.

### 2.2. Patrón de Fallback Resiliente (Zero Downtime Guarantee)
Si las credenciales de Supabase no están configuradas o si la red experimenta interrupciones, la aplicación no colapsa ni muestra pantallas en blanco. La capa de servicios detecta el estado y sirve inmediatamente el dataset estructurado en `src/data/initialData.ts`.

### 2.3. Soporte SPA en GitHub Pages
GitHub Pages sirve archivos estáticos. Cuando el usuario navega directamente a `/projects/diagnostico-madurez-ciberseguridad-mipymes` o refresca la página, GitHub Pages retorna `public/404.html`. Este script convierte la ruta en un parámetro de consulta y redirige a `index.html`, donde el historial del navegador es restaurado sin recargas visibles ni rutas alteradas.
