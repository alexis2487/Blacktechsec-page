# BLACKTECHSEC V2 — Personal Technology Hub

[![GitHub Pages](https://img.shields.io/badge/Hosted%20On-GitHub%20Pages-blue?logo=github)](https://www.blacktechsec.com/)
[![React 18](https://img.shields.io/badge/Frontend-React%2018%20%7C%20TypeScript-61dafb?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Backend-Supabase%20PostgreSQL-3ecf8e?logo=supabase)](https://supabase.com/)

> **LEARN. BUILD. EXPLORE. SHARE.**  
> *"Exploring technology, building things and sharing what I learn."*

**BLACKTECHSEC** (*Black Technology Security*) es el espacio digital personal de **Jair Alexis Martinez**, Ingeniero de Sistemas enfocado en desarrollo backend, ciberseguridad aplicada, análisis de datos e inteligencia artificial.

---

## 🚀 Características Principales

* **Identidad Profesional Genuina:** Representación honesta de la trayectoria técnica de Jair Alexis Martinez, sin frases exageradas ni clichés de hacking ficticio.
* **Proyectos Reales:** Catálogo interactivo de software, prototipos de madurez de ciberseguridad, APIs seguras en .NET y pipelines de datos en Python.
* **Laboratorio de Experimentos:** Registro de prototipos rápidos, scripts y pruebas de concepto.
* **Notas Técnicas:** Bitácora personal de aprendizajes, trucos de configuración y documentación.
* **CMS Integrado (`/admin`):** Panel administrativo protegido con Supabase Auth que permite a Jair gestionar proyectos, publicaciones, notas y subir su CV en PDF sin tocar código.
* **Alojamiento en GitHub Pages:** Compatible 100% con dominio personalizado `blacktechsec.com` mediante GitHub Actions y redirección SPA para rutas directas.
* **Arquitectura Resiliente (Zero-Config Fallback):** Funciona al 100% con datos iniciales precargados incluso si Supabase aún no ha sido vinculado, garantizando cero caídas.
* **Diseño Editorial & Modo Oscuro:** Interfaz moderna, accesible, rápida y elegante con soporte claro/oscuro.

---

## 🛠️ Stack Tecnológico

* **Frontend:** React 18, TypeScript, Vite
* **Estilos:** Tailwind CSS, Lucide Icons
* **Enrutamiento:** React Router v6 con hidratación SPA para GitHub Pages
* **Backend:** Supabase (PostgreSQL, Row Level Security, Auth, Storage)
* **Despliegue:** GitHub Actions hacia GitHub Pages con Custom Domain `blacktechsec.com`

---

## 📁 Estructura del Proyecto

```
blacktechsec-v2/
├── .github/workflows/deploy.yml  # Automatización de despliegue en GitHub Pages
├── public/                       # Assets estáticos, CNAME, 404.html, sitemap.xml
├── src/
│   ├── components/               # Componentes UI, Layout y SEO
│   ├── context/                  # Contextos de Autenticación y Tema
│   ├── data/                     # Datos iniciales estructurados y seeds
│   ├── lib/                      # Cliente de Supabase
│   ├── pages/                    # Vistas públicas y panel administrativo
│   ├── services/                 # Abstracción de datos desacoplada de Supabase
│   ├── styles/                   # Configuración y estilos Tailwind
│   └── types/                    # Definiciones TypeScript completas
├── supabase/
│   ├── schema.sql                # Tablas, políticas RLS y storage bucket
│   └── seed.sql                  # Datos semilla para migración inmediata
├── docs/                         # Documentación técnica y manuales
├── PROGRESS.md                   # Bitácora continua de desarrollo
└── README.md
```

---

## ⚡ Inicio Rápido Local

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno (opcional para desarrollo local)
cp .env.example .env

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Compilación para producción
npm run build
```

---

## 📖 Documentación Detallada

* [Arquitectura del Sistema](docs/architecture.md)
* [Modelo de Contenido](docs/content-model.md)
* [Guía de Desarrollo Local](docs/development.md)
* [Guía de Despliegue y CI/CD](docs/deployment.md)
* [Sistema de Diseño](docs/design-system.md)
* [Manual del CMS Administrativo](docs/cms.md)
* [Bitácora de Desarrollo Continua](PROGRESS.md)

---

## 👤 Propietario

**Jair Alexis Martinez**  
* Ingeniero de Sistemas — UNAD  
* Especialización en Seguridad Informática — UNAD  
* Email: [alexis.martinez_systems.engineer@outlook.com](mailto:alexis.martinez_systems.engineer@outlook.com)  
* LinkedIn: [in/jair-alexis-martinez-302b78305](https://www.linkedin.com/in/jair-alexis-martinez-302b78305/)  
* GitHub: [@alexis2487](https://github.com/alexis2487)  
* Sitio Web: [blacktechsec.com](https://www.blacktechsec.com/)
