import { 
  ProfileInfo, 
  EducationItem, 
  CertificationItem, 
  SkillCategory, 
  ProjectItem, 
  ExperimentItem, 
  NoteItem, 
  ContentItem 
} from '../types';

export const initialProfile: ProfileInfo = {
  name: 'Jair Alexis Martinez',
  brandName: 'BLACKTECHSEC',
  conceptualName: 'BLACK TECHNOLOGY SECURITY',
  tagline: 'Technology · AI · Cybersecurity · Development',
  bio: 'Soy Jair Alexis Martinez, Ingeniero de Sistemas. Exploro tecnología, inteligencia artificial, ciberseguridad y desarrollo backend mientras construyo proyectos y comparto lo que voy aprendiendo.',
  philosophy: 'LEARN. BUILD. EXPLORE. SHARE.',
  location: 'Colombia · Remoto LATAM',
  availability: 'Disponible para proyectos y roles remotos',
  email: 'alexis.martinez_systems.engineer@outlook.com',
  cvUrl: '/Curriculum_Vitae.pdf',
  socials: {
    github: 'https://github.com/alexis2487',
    linkedin: 'https://www.linkedin.com/in/jair-alexis-martinez-302b78305/',
    twitter: 'https://x.com/BlackTechSec_',
    youtube: '',
    instagram: '',
    tiktok: '',
  },
  currentlyExploring: [
    'Artificial Intelligence & Copilot Agents',
    'Applied Cybersecurity & Threat Hunting',
    'Backend Engineering & Distributed APIs (C#, .NET, Python)',
    'Data Pipelines & Business Intelligence (Power BI, SQL, Pandas)',
    'Cloud Native & Container Security'
  ]
};

export const initialEducation: EducationItem[] = [
  {
    id: 'edu-1',
    institution: 'UNAD — Universidad Nacional Abierta y a Distancia',
    degree: 'Ingeniería de Sistemas',
    status: 'Graduado en 2026',
    period: '2026',
    description: 'Formación profesional con énfasis en arquitectura de software, desarrollo backend, análisis de bases de datos y seguridad de la información aplicada.'
  },
  {
    id: 'edu-2',
    institution: 'UNAD — Universidad Nacional Abierta y a Distancia',
    degree: 'Especialización en Seguridad Informática',
    status: 'En curso',
    period: '2026 - Presente',
    description: 'Profundización de posgrado en protección de infraestructuras críticas, análisis forense, gestión de incidentes, pentesting y gobernanza de ciberseguridad.'
  }
];

export const initialCertifications: CertificationItem[] = [
  {
    id: 'cert-1',
    title: 'Análisis de datos con Python',
    entity: 'Educación Continua / Especializada',
    year: '2026',
    description: 'Procesamiento analítico con NumPy y Pandas, visualización interactiva y storytelling técnico con Power BI.',
    topics: ['NumPy', 'Pandas', 'Visualización', 'Data Storytelling', 'Power BI']
  },
  {
    id: 'cert-2',
    title: 'Cisco Packet Tracer',
    entity: 'Cisco Networking Academy',
    year: '2026',
    description: 'Modelado, configuración y diagnóstico de infraestructuras de red complejas, topologías IPv4/IPv6 y routing/switching.',
    topics: ['Redes', 'IPv4/IPv6', 'Enrutamiento', 'Seguridad perimetral']
  },
  {
    id: 'cert-3',
    title: 'Power BI',
    entity: 'Santander Open Academy',
    year: '2026',
    description: 'Modelado relacional de datos (DAX), transformación ETL y construcción de tableros ejecutivos de Business Intelligence.',
    topics: ['Power BI', 'DAX', 'ETL', 'Dashboarding']
  },
  {
    id: 'cert-4',
    title: 'Introducción a la seguridad informática',
    entity: 'Cisco Networking Academy',
    year: '2025',
    description: 'Principios de confidencialidad, integridad y disponibilidad, vectores de ataque comunes y defensas perimetrales.',
    topics: ['Principios de Seguridad', 'Vulnerabilidades', 'Criptografía', 'Defensa']
  },
  {
    id: 'cert-5',
    title: 'Ponencia EXPOTECH',
    entity: 'Universidad Nacional Abierta y a Distancia',
    year: 'Marzo 2025',
    description: 'Presentación de proyectos de investigación sobre la aplicación de la ingeniería de sistemas y la ciberseguridad aplicada al desarrollo sostenible.',
    topics: ['Investigación', 'Sistemas', 'Seguridad Sostenible']
  }
];

export const initialSkills: SkillCategory[] = [
  {
    category: 'Programación',
    skills: ['Python', 'C#', '.NET', 'TypeScript', 'Bash / Shell']
  },
  {
    category: 'Backend & APIs',
    skills: ['ASP.NET Core', 'APIs RESTful', 'Procesamiento asíncrono', 'Manejo y ETL de datos']
  },
  {
    category: 'Bases de Datos',
    skills: ['SQL (PostgreSQL, SQL Server)', 'NoSQL', 'MongoDB', 'Modelado Relacional']
  },
  {
    category: 'Ciberseguridad',
    skills: ['Monitoreo continuo', 'Análisis de logs y telemetría', 'Detección de eventos de seguridad', 'Gestión de incidentes técnicos']
  },
  {
    category: 'Sistemas Operativos & Entorno',
    skills: ['Linux (Ubuntu / Debian)', 'Windows Server', 'Docker & Contenedores']
  },
  {
    category: 'Análisis y Business Intelligence',
    skills: ['Consultas SQL avanzadas', 'Pandas & NumPy', 'Visualización de datos', 'Reportes en Power BI']
  },
  {
    category: 'Automatización e Inteligencia Artificial',
    skills: ['Microsoft Copilot Agents', 'Automatización de flujos con Python', 'Integración de LLMs en workflows']
  },
  {
    category: 'Control de Versiones & DevOps',
    skills: ['Git', 'GitHub', 'CI/CD con GitHub Actions']
  }
];

export const initialProjects: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Prototipo de diagnóstico de madurez en ciberseguridad para MiPymes',
    slug: 'diagnostico-madurez-ciberseguridad-mipymes',
    short_description: 'Plataforma web para diagnosticar y evaluar la postura de ciberseguridad en pequeñas y medianas empresas con reporte automatizado.',
    full_description: 'Prototipo integral desarrollado para permitir a las micro, pequeñas y medianas empresas (MiPymes) medir su nivel de madurez frente a estándares de seguridad. Incluye un cuestionario guiado y automatizado con ponderación basada en marcos reconocidos, panel seguro de visualización de brechas, generación dinámica de informes técnicos en PDF y despliegue contenedorizado. El prototipo fue validado en escenarios reales con empresas locales para corroborar su aplicabilidad.',
    technologies: ['Python', 'Web Backend', 'SQL/NoSQL', 'PDF Generation', 'Docker', 'Security Frameworks'],
    category: 'Cybersecurity',
    status: 'Completed',
    cover_image: '/img/profile.jpg',
    gallery: [],
    github_url: 'https://github.com/alexis2487/proyecto_Diagnostico',
    live_url: '',
    featured: true,
    created_at: '2025-11-19T04:11:19Z',
    updated_at: '2026-05-04T00:00:00Z'
  },
  {
    id: 'proj-2',
    title: 'Proyectos y laboratorios de ciberseguridad y sistemas',
    slug: 'laboratorios-ciberseguridad-sistemas',
    short_description: 'Entorno de pruebas y documentación de laboratorios prácticos de seguridad, hardening en Linux y telemetría de eventos.',
    full_description: 'Colección documentada de entornos de laboratorio diseñados para experimentar con hardening en servidores Linux, configuración de firewalls, inspección profunda de tráfico y análisis de eventos de seguridad. Integra scripts en Python para automatizar la extracción de logs de autenticación y conectividad con bases de datos para generar métricas de auditoría.',
    technologies: ['Linux', 'Python', 'Log Analysis', 'Security', 'SQL/NoSQL', 'Power BI'],
    category: 'Cybersecurity',
    status: 'In Development',
    cover_image: '',
    gallery: [],
    github_url: 'https://github.com/alexis2487',
    live_url: '',
    featured: true,
    created_at: '2025-08-10T00:00:00Z',
    updated_at: '2026-06-15T00:00:00Z'
  },
  {
    id: 'proj-3',
    title: 'Automatización y análisis de datos',
    slug: 'automatizacion-analisis-datos',
    short_description: 'Pipeline de scripts en Python para automatización operativa, limpieza y enriquecimiento de datasets orientados a BI.',
    full_description: 'Conjunto de herramientas y scripts modulares en Python orientados al procesamiento por lotes, extracción y normalización de información heterogénea (CSVs, APIs, logs del sistema). Facilita la ingesta directa de métricas hacia modelos de Power BI para apoyar la toma de decisiones basada en datos.',
    technologies: ['Python', 'Automation', 'Data Analysis', 'NumPy', 'Pandas', 'Power BI'],
    category: 'Data',
    status: 'Completed',
    cover_image: '',
    gallery: [],
    github_url: 'https://github.com/alexis2487',
    live_url: '',
    featured: true,
    created_at: '2025-10-01T00:00:00Z',
    updated_at: '2026-04-20T00:00:00Z'
  },
  {
    id: 'proj-4',
    title: 'SecureAPI — REST Backend en ASP.NET Core 8',
    slug: 'secure-api-aspnet-core',
    short_description: 'API REST segura construida en .NET 8 con autenticación robusta, validación estricta y despliegue en la nube.',
    full_description: 'Implementación backend de alto rendimiento orientada a servicios empresariales. Cuenta con arquitectura limpia, manejo de tokens JWT, control de acceso basado en roles, registro estructurado de eventos y optimización de consultas a bases de datos relacionales.',
    technologies: ['C#', '.NET 8', 'ASP.NET Core', 'REST API', 'SQL Server', 'Azure', 'Security'],
    category: 'Development',
    status: 'Completed',
    cover_image: '',
    gallery: [],
    github_url: 'https://github.com/alexis2487/SecureAPI',
    live_url: '',
    featured: false,
    created_at: '2026-05-04T20:57:54Z',
    updated_at: '2026-05-05T00:49:31Z'
  }
];

export const initialExperiments: ExperimentItem[] = [
  {
    id: 'exp-1',
    title: 'Agente Copilot para auditoría rápida de logs',
    slug: 'copilot-agent-log-auditor',
    description: 'Prototipo de agente inteligente utilizando Microsoft Copilot Studio para resumir incidentes de seguridad a partir de archivos syslog.',
    content: 'Este experimento evaluó la efectividad de los modelos de lenguaje para clasificar anomalías en registros de servidores Linux sin requerir reglas regex complejas predefinidas. Se probaron diferentes técnicas de prompting y estructuración de contexto para reducir alucinaciones en alertas críticas.',
    technologies: ['Microsoft Copilot Agents', 'Prompt Engineering', 'Linux Syslog', 'AI'],
    category: 'AI',
    github_url: 'https://github.com/alexis2487',
    status: 'Experimental',
    publication_date: '2026-07-12',
    featured: true,
    created_at: '2026-07-12T00:00:00Z'
  },
  {
    id: 'exp-2',
    title: 'Parser reactivo de telemetría de red con Python',
    slug: 'parser-reactivo-telemetria-red',
    description: 'Script ligero para captura y agregación de flujos de red en tiempo real orientado a micro-laboratorios.',
    content: 'Prueba de concepto para decodificar paquetes a nivel de socket utilizando Python con mínimas dependencias externas. Permite detectar escaneos de puertos SYN stealth en redes de prueba locales.',
    technologies: ['Python', 'Sockets', 'Networking', 'Cybersecurity'],
    category: 'Cybersecurity',
    github_url: 'https://github.com/alexis2487',
    status: 'In Progress',
    publication_date: '2026-08-05',
    featured: true,
    created_at: '2026-08-05T00:00:00Z'
  }
];

export const initialNotes: NoteItem[] = [
  {
    id: 'note-1',
    title: 'Lecciones aprendidas integrando DAX y Python en pipelines de Power BI',
    slug: 'lecciones-dax-python-powerbi',
    content: 'Cuando combinamos scripts de Python dentro de Power BI para modelos de predicción simples, el tiempo de refresco puede ser un cuello de botella si no se filtran previamente las columnas en Power Query. Aquí documento los tres errores más comunes de tipo de datos y cómo resolverlos con tipos explícitos en Pandas.',
    category: 'Data',
    tags: ['Power BI', 'Python', 'DAX', 'ETL', 'Optimización'],
    publication_date: '2026-06-28',
    published: true,
    created_at: '2026-06-28T00:00:00Z'
  },
  {
    id: 'note-2',
    title: 'Hardening de servidores Linux: primeros 15 minutos en una instancia limpia',
    slug: 'hardening-linux-primeros-15-minutos',
    content: 'Una guía de referencia rápida que ejecuto siempre que inicio un nuevo servidor para laboratorios: deshabilitar autenticación por contraseña en SSH, configurar fail2ban con jail agresivo para intentos recurrentes, establecer reglas de firewall UFW y configurar actualizaciones desatendidas de seguridad.',
    category: 'Cybersecurity',
    tags: ['Linux', 'Hardening', 'SSH', 'UFW', 'DevSecOps'],
    publication_date: '2026-07-20',
    published: true,
    created_at: '2026-07-20T00:00:00Z'
  },
  {
    id: 'note-3',
    title: 'De scripts sueltos a servicios de fondo con Systemd',
    slug: 'scripts-sueltos-a-systemd',
    content: 'Cómo convertir tus scripts de automatización en Python en servicios gestionados por Systemd con reinicio automático ante fallos y registro centralizado en journald.',
    category: 'Development',
    tags: ['Python', 'Systemd', 'Linux', 'Automation'],
    publication_date: '2026-08-14',
    published: true,
    created_at: '2026-08-14T00:00:00Z'
  }
];

export const initialContent: ContentItem[] = [
  {
    id: 'content-1',
    title: 'Arquitectura de seguridad para backend en entornos modernos',
    slug: 'arquitectura-seguridad-backend-moderno',
    description: 'Reflexión técnica sobre cómo proteger APIs REST sin sobrecargar la experiencia del desarrollador ni el rendimiento.',
    content: 'Análisis de capas defensivas: validación de esquemas en el gateway, token handling seguro, rotación de claves y auditoría de eventos no repudiables.',
    category: 'Cybersecurity',
    tags: ['APIs', 'Security', 'Backend', 'Architecture'],
    publication_date: '2026-08-01',
    external_url: 'https://github.com/alexis2487',
    platform: 'GitHub',
    featured: true,
    published: true,
    created_at: '2026-08-01T00:00:00Z'
  },
  {
    id: 'content-2',
    title: '¿Por qué aprender C# y Python simultáneamente es una ventaja en ingeniería?',
    slug: 'ventaja-aprender-csharp-python',
    description: 'Comparativa de cómo la tipificación estricta de C# y la versatilidad de Python se complementan en proyectos de datos y backend.',
    content: 'Exploración de sinergias: construir la lógica central de negocio en C# por robustez y tipo seguro, mientras se aprovecha Python para prototipado veloz, análisis exploratorio y automatizaciones auxiliares.',
    category: 'Development',
    tags: ['C#', 'Python', 'Software Engineering', 'Learning'],
    publication_date: '2026-08-20',
    external_url: 'https://github.com/alexis2487',
    platform: 'Website',
    featured: true,
    published: true,
    created_at: '2026-08-20T00:00:00Z'
  }
];
