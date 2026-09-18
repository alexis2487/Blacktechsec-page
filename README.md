# BLACKTECHSEC — Personal Technology Hub

[![Producción](https://img.shields.io/badge/Production-blacktechsec.com-00DC82?style=flat&logo=cloudflare)](https://www.blacktechsec.com/)
[![Alojamiento](https://img.shields.io/badge/Host-GitHub%20Pages-181717?style=flat&logo=github)](https://pages.github.com/)
[![Base de Datos](https://img.shields.io/badge/Database-Supabase%20PostgreSQL-3ECF8E?style=flat&logo=supabase)](https://supabase.com/)
[![Storage](https://img.shields.io/badge/Storage-Cloudflare%20R2-F38020?style=flat&logo=cloudflare)](https://www.cloudflare.com/developer-platform/r2/)
[![Frontend](https://img.shields.io/badge/Frontend-React%2018%20%7C%20TypeScript-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)

> **LEARN. BUILD. EXPLORE. SHARE.**  
> *"Exploring technology, building things and sharing what I learn."*

**BlackTechSec** (*Black Technology Security*) es mi espacio digital personal y centro de experimentación tecnológica. Soy **Jair Alexis Martinez**, Ingeniero de Sistemas, y concebí este repositorio no como una plantilla o tutorial para clonar, sino como la arquitectura de producción sobre la cual documento proyectos reales de software, análisis de seguridad informática, laboratorios de prototipado y recursos de ingeniería.

---

## 🎯 Visión y Filosofía del Proyecto

A lo largo de mi trayectoria, he creído firmemente en la documentación rigurosa del trabajo técnico y en la transparencia del código. BlackTechSec no es una academia comercial, una consultora ni una tienda de servicios: es mi hub técnico personal.

Decidí construir esta plataforma desde cero para resolver una necesidad concreta: disponer de un espacio propio, de alto rendimiento y bajo costo operativo, donde pueda centralizar y gestionar de forma dinámica mi portafolio de proyectos, notas técnicas de ciberseguridad, artículos y recursos descargables (como mi currículum en PDF), sin depender de plataformas de terceros ni de CMS rígidos o sobrecargados.

---

## 🏛️ Decisiones de Arquitectura: El "Por Qué" de la Infraestructura

Para este proyecto diseñé una arquitectura **Jamstack serverless desacoplada**, guiada por tres premisas: **costo operativo cero ($0.00 USD/mes)**, **seguridad por diseño** y **resiliencia total**. 

Cada proveedor y componente fue seleccionado con un propósito de ingeniería específico:

```
                                  [ Visitante Web ]
                                         │
                                         ▼
                         ┌───────────────────────────────┐
                         │  GitHub Pages (Edge CDN)      │
                         │  Dominio: blacktechsec.com    │
                         │  React 18 + Vite SPA          │
                         └───────┬───────────────┬───────┘
                                 │               │
     ┌───────────────────────────┘               └───────────────────────────┐
     │ (Lectura de contenidos / metadatos)                                   │ (Descarga de binarios y CV)
     ▼                                                                       ▼
┌───────────────────────────┐                               ┌───────────────────────────┐
│ Supabase (PostgreSQL)     │                               │ Cloudflare R2             │
│ - Políticas RLS Activas   │                               │ - Almacenamiento S3       │
│ - Autenticación JWT       │                               │ - Egress Fees: $0 USD     │
│ - Tablas relacionales     │                               │ - Caché perimetral global │
└───────────────────────────┘                               └───────────────────────────┘
                               ▲                                           ▲
                               │                                           │ (Subida segura)
                               │ (Validación de sesión)                    │
                     ┌─────────┴───────────────────────────────────────────┴─────────┐
                     │               Cloudflare Worker Serverless                     │
                     │          (blacktechsec-storage-worker.workers.dev)            │
                     └───────────────────────────────▲───────────────────────────────┘
                                                     │
                                                     │ (Petición de subida autorizada)
                                           [ Jair (Admin /admin) ]
```

### 1. ¿Por qué GitHub Pages para el Hosting Frontend?
Opté por GitHub Pages como host del frontend compilado porque entrega archivos estáticos distribuidos globalmente con latencias mínimas y costo cero. Al ser un sitio servido directamente desde el CDN de GitHub, elimino por completo la necesidad de mantener, parchar o monitorear un servidor VPS o contenedor Docker solo para servir la interfaz. 

Para solventar el reto del enrutamiento de una aplicación de una sola página (SPA) en un servidor estático, implementé una estrategia de hidratación con [`public/404.html`](public/404.html) y redirección controlada en [`index.html`](index.html), asegurando que cualquier ruta profunda refrescada en el navegador cargue sin errores.

### 2. ¿Por qué Supabase para Base de Datos y Autenticación?
Elegí Supabase porque me provee la solidez relacional de **PostgreSQL**, permitiéndome estructurar mis proyectos, experimentos, notas técnicas y metadatos con tipos estrictos e integridad referencial. Además, su sistema de autenticación integrado me permite proteger el panel administrativo interno (`/admin`) mediante tokens criptográficos JWT y políticas estrictas de seguridad a nivel de fila (**Row Level Security - RLS**).

De este modo, los visitantes solo tienen permisos de lectura (`SELECT`) sobre los registros públicos, mientras que las operaciones de modificación quedan restringidas exclusivamente a mi usuario administrativo autenticado.

### 3. ¿Por qué Cloudflare R2 y un Worker Serverless para Almacenamiento?
Originalmente consideré almacenar los archivos pesados (como capturas de arquitectura en alta resolución y mi PDF del CV) en el almacenamiento tradicional de base de datos. Sin embargo, los servicios convencionales imponen límites estrictos de ancho de banda de descarga (*egress bandwidth*), lo que genera un riesgo de suspensión o cobros imprevistos cuando el tráfico aumenta.

Por ello, integré **Cloudflare R2**:
* **$0 Egress Fees:** No cobra por transferencia de datos saliente, permitiendo descargas ilimitadas de mi CV y documentos.
* **Caché Global:** Distribución ultra rápida a través de los puntos de presencia mundiales de Cloudflare.

Para resolver la subida segura desde el cliente sin comprometer credenciales privadas, programé y desplegué un **Cloudflare Worker** serverless (`blacktechsec-storage-worker`). Cuando subo un archivo desde mi panel de administración, el Worker valida criptográficamente mi sesión activa de Supabase antes de autorizar la escritura en el bucket R2, garantizando que ninguna clave secreta quede expuesta en el código del navegador.

### 4. ¿Por qué una Capa de Servicios con Fallback Híbrido Resiliente?
Una regla inquebrantable en la ingeniería de este sitio es que la página **nunca debe colapsar ni mostrar pantallas en blanco**, incluso si Supabase experimenta tareas de mantenimiento o cortes de red.

Por esta razón, desacoplé completamente la interfaz visual del cliente de base de datos. Todos los componentes de React consumen funciones abstractas en `src/services/`. Si la conexión a la base de datos se interrumpe, los servicios entran en modo de contingencia automática (*graceful degradation*), respondiendo de forma inmediata con los datos estructurados en [`src/data/initialData.ts`](src/data/initialData.ts).

---

## 💻 Stack de Desarrollo y Herramientas

* **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) para garantizar tipado estricto de extremo a extremo, prevención de errores en tiempo de compilación y mantenibilidad a largo plazo.
* **Biblioteca UI:** [React 18](https://react.dev/) estructurado mediante arquitectura modular de componentes, layouts y hooks personalizados.
* **Bundler & Build Tool:** [Vite](https://vitejs.dev/) para compilaciones de producción ultrarrápidas y optimización de fragmentos (*chunks*).
* **Estilos & Diseño:** [Tailwind CSS](https://tailwindcss.com/) configurado con variables de diseño editorial sobrio, alto contraste y soporte nativo para temas claro y oscuro.
* **Iconografía:** [Lucide React](https://lucide.dev/) para iconos vectoriales consistentes y ligeros.
* **CI/CD:** [GitHub Actions](.github/workflows/deploy.yml) para compilación automática, verificación de tipos y despliegue continuo en cada cambio a la rama `main`.

---

## 🔒 Postura de Seguridad

Como profesional enfocado en ciberseguridad, aplico en mi propio ecosistema las buenas prácticas que defiendo:
* **Principio de Mínimo Privilegio:** La capa pública del frontend solo maneja claves anónimas públicas de lectura restringidas por RLS.
* **Ausencia de Secretos en Git:** Las credenciales privadas (`service_role`, claves maestras de S3/R2 o contraseñas) jamás forman parte del repositorio ni del bundle compilado; se gestionan de forma segura a través de secretos cifrados en GitHub Actions y Cloudflare.
* **Aislamiento de Carga:** Los archivos binarios subidos no se procesan en el servidor de aplicación, sino que se transmiten directamente al almacenamiento de objetos validando tamaño y tipo MIME permitido.
* **Políticas CORS Estrictas:** Tanto en el bucket R2 como en el Worker serverless, las peticiones HTTP cruzadas están acotadas a los orígenes autorizados del dominio.

---

## 👤 Sobre el Creador

**Jair Alexis Martinez**  
* Ingeniero de Sistemas — Universidad Nacional Abierta y a Distancia (UNAD)  
* Especialización en Seguridad Informática — UNAD  
* **Sitio Oficial:** [blacktechsec.com](https://www.blacktechsec.com/)  
* **GitHub:** [@alexis2487](https://github.com/alexis2487)  
* **LinkedIn:** [jair-alexis-martinez-302b78305](https://www.linkedin.com/in/jair-alexis-martinez-302b78305/)  
* **Contacto Oficial:** [alexis.martinez_systems.engineer@outlook.com](mailto:alexis.martinez_systems.engineer@outlook.com)  

---

© 2026 **BLACKTECHSEC** — *Todos los derechos reservados. Diseñado e implementado con rigor de ingeniería por Jair Alexis Martinez.*
