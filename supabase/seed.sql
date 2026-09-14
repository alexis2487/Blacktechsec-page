-- =========================================================================
-- BLACKTECHSEC V2 — INITIAL DATABASE SEEDS (MIGRACIÓN DESDE SITIO ANTERIOR)
-- =========================================================================

-- Seed: Projects
INSERT INTO public.projects (title, slug, short_description, full_description, technologies, category, status, cover_image, github_url, live_url, featured)
VALUES
(
    'Prototipo de diagnóstico de madurez en ciberseguridad para MiPymes',
    'diagnostico-madurez-ciberseguridad-mipymes',
    'Plataforma web para diagnosticar y evaluar la postura de ciberseguridad en pequeñas y medianas empresas con reporte automatizado.',
    'Prototipo integral desarrollado para permitir a las micro, pequeñas y medianas empresas (MiPymes) medir su nivel de madurez frente a estándares de seguridad. Incluye un cuestionario guiado y automatizado con ponderación basada en marcos reconocidos, panel seguro de visualización de brechas, generación dinámica de informes técnicos en PDF y despliegue contenedorizado. El prototipo fue validado en escenarios reales con empresas locales.',
    ARRAY['Python', 'Web Backend', 'SQL/NoSQL', 'PDF Generation', 'Docker', 'Security Frameworks'],
    'Cybersecurity',
    'Completed',
    '/img/profile.jpg',
    'https://github.com/alexis2487/proyecto_Diagnostico',
    '',
    true
),
(
    'Proyectos y laboratorios de ciberseguridad y sistemas',
    'laboratorios-ciberseguridad-sistemas',
    'Entorno de pruebas y documentación de laboratorios prácticos de seguridad, hardening en Linux y telemetría de eventos.',
    'Colección documentada de entornos de laboratorio diseñados para experimentar con hardening en servidores Linux, configuración de firewalls, inspección profunda de tráfico y análisis de eventos de seguridad. Integra scripts en Python para automatizar la extracción de logs de autenticación y conectividad con bases de datos para generar métricas de auditoría.',
    ARRAY['Linux', 'Python', 'Log Analysis', 'Security', 'SQL/NoSQL', 'Power BI'],
    'Cybersecurity',
    'In Development',
    '',
    'https://github.com/alexis2487',
    '',
    true
),
(
    'Automatización y análisis de datos',
    'automatizacion-analisis-datos',
    'Pipeline de scripts en Python para automatización operativa, limpieza y enriquecimiento de datasets orientados a BI.',
    'Conjunto de herramientas y scripts modulares en Python orientados al procesamiento por lotes, extracción y normalización de información heterogénea (CSVs, APIs, logs del sistema). Facilita la ingesta directa de métricas hacia modelos de Power BI para apoyar la toma de decisiones basada en datos.',
    ARRAY['Python', 'Automation', 'Data Analysis', 'NumPy', 'Pandas', 'Power BI'],
    'Data',
    'Completed',
    '',
    'https://github.com/alexis2487',
    '',
    true
),
(
    'SecureAPI — REST Backend en ASP.NET Core 8',
    'secure-api-aspnet-core',
    'API REST segura construida en .NET 8 con autenticación robusta, validación estricta y despliegue en la nube.',
    'Implementación backend de alto rendimiento orientada a servicios empresariales. Cuenta con arquitectura limpia, manejo de tokens JWT, control de acceso basado en roles, registro estructurado de eventos y optimización de consultas a bases de datos relacionales.',
    ARRAY['C#', '.NET 8', 'ASP.NET Core', 'REST API', 'SQL Server', 'Azure', 'Security'],
    'Development',
    'Completed',
    '',
    'https://github.com/alexis2487/SecureAPI',
    '',
    false
)
ON CONFLICT (slug) DO NOTHING;

-- Seed: Education
INSERT INTO public.education (id, institution, degree, status, period, description)
VALUES
(
    'edu-1',
    'UNAD — Universidad Nacional Abierta y a Distancia',
    'Ingeniería de Sistemas',
    'Graduado en 2026',
    '2026',
    'Formación profesional con énfasis en arquitectura de software, desarrollo backend, análisis de bases de datos y seguridad de la información aplicada.'
),
(
    'edu-2',
    'UNAD — Universidad Nacional Abierta y a Distancia',
    'Especialización en Seguridad Informática',
    'En curso',
    '2026 - Presente',
    'Profundización de posgrado en protección de infraestructuras críticas, análisis forense, gestión de incidentes, pentesting y gobernanza de ciberseguridad.'
)
ON CONFLICT (id) DO NOTHING;

-- Seed: Certifications
INSERT INTO public.certifications (id, title, entity, year, description, topics)
VALUES
(
    'cert-1',
    'Análisis de datos con Python',
    'Educación Continua / Especializada',
    '2026',
    'Procesamiento analítico con NumPy y Pandas, visualización interactiva y storytelling técnico con Power BI.',
    ARRAY['NumPy', 'Pandas', 'Visualización', 'Data Storytelling', 'Power BI']
),
(
    'cert-2',
    'Cisco Packet Tracer',
    'Cisco Networking Academy',
    '2026',
    'Modelado, configuración y diagnóstico de infraestructuras de red complejas, topologías IPv4/IPv6 y routing/switching.',
    ARRAY['Redes', 'IPv4/IPv6', 'Enrutamiento', 'Seguridad perimetral']
),
(
    'cert-3',
    'Power BI',
    'Santander Open Academy',
    '2026',
    'Modelado relacional de datos (DAX), transformación ETL y construcción de tableros ejecutivos de Business Intelligence.',
    ARRAY['Power BI', 'DAX', 'ETL', 'Dashboarding']
),
(
    'cert-4',
    'Introducción a la seguridad informática',
    'Cisco Networking Academy',
    '2025',
    'Principios de confidencialidad, integridad y disponibilidad, vectores de ataque comunes y defensas perimetrales.',
    ARRAY['Principios de Seguridad', 'Vulnerabilidades', 'Criptografía', 'Defensa']
),
(
    'cert-5',
    'Ponencia EXPOTECH',
    'Universidad Nacional Abierta y a Distancia',
    'Marzo 2025',
    'Presentación de proyectos de investigación sobre la aplicación de la ingeniería de sistemas y la ciberseguridad aplicada al desarrollo sostenible.',
    ARRAY['Investigación', 'Sistemas', 'Seguridad Sostenible']
)
ON CONFLICT (id) DO NOTHING;

-- Seed: Content
INSERT INTO public.content (title, slug, description, content, category, tags, publication_date, external_url, platform, featured, published)
VALUES
(
    'Arquitectura de seguridad para backend en entornos modernos',
    'arquitectura-seguridad-backend-moderno',
    'Reflexión técnica sobre cómo proteger APIs REST sin sobrecargar la experiencia del desarrollador ni el rendimiento.',
    'Análisis de capas defensivas: validación de esquemas en el gateway, token handling seguro, rotación de claves y auditoría de eventos no repudiables.',
    'Cybersecurity',
    ARRAY['APIs', 'Security', 'Backend', 'Architecture'],
    '2026-08-01',
    'https://github.com/alexis2487',
    'GitHub',
    true,
    true
),
(
    '¿Por qué aprender C# y Python simultáneamente es una ventaja en ingeniería?',
    'ventaja-aprender-csharp-python',
    'Comparativa de cómo la tipificación estricta de C# y la versatilidad de Python se complementan en proyectos de datos y backend.',
    'Exploración de sinergias: construir la lógica central de negocio en C# por robustez y tipo seguro, mientras se aprovecha Python para prototipado veloz, análisis exploratorio y automatizaciones auxiliares.',
    'Development',
    ARRAY['C#', 'Python', 'Software Engineering', 'Learning'],
    '2026-08-20',
    'https://github.com/alexis2487',
    'Website',
    true,
    true
)
ON CONFLICT (slug) DO NOTHING;

-- Seed: Experiments
INSERT INTO public.experiments (title, slug, description, content, technologies, category, github_url, status, publication_date, featured)
VALUES
(
    'Agente Copilot para auditoría rápida de logs',
    'copilot-agent-log-auditor',
    'Prototipo de agente inteligente utilizando Microsoft Copilot Studio para resumir incidentes de seguridad a partir de archivos syslog.',
    'Este experimento evaluó la efectividad de los modelos de lenguaje para clasificar anomalías en registros de servidores Linux sin requerir reglas regex complejas predefinidas. Se probaron diferentes técnicas de prompting y estructuración de contexto para reducir alucinaciones en alertas críticas.',
    ARRAY['Microsoft Copilot Agents', 'Prompt Engineering', 'Linux Syslog', 'AI'],
    'AI',
    'https://github.com/alexis2487',
    'Experimental',
    '2026-07-12',
    true
),
(
    'Parser reactivo de telemetría de red con Python',
    'parser-reactivo-telemetria-red',
    'Script ligero para captura y agregación de flujos de red en tiempo real orientado a micro-laboratorios.',
    'Prueba de concepto para decodificar paquetes a nivel de socket utilizando Python con mínimas dependencias externas. Permite detectar escaneos de puertos SYN stealth en redes de prueba locales.',
    ARRAY['Python', 'Sockets', 'Networking', 'Cybersecurity'],
    'Cybersecurity',
    'https://github.com/alexis2487',
    'In Progress',
    '2026-08-05',
    true
)
ON CONFLICT (slug) DO NOTHING;

-- Seed: Notes
INSERT INTO public.notes (title, slug, content, category, tags, publication_date, published)
VALUES
(
    'Lecciones aprendidas integrando DAX y Python en pipelines de Power BI',
    'lecciones-dax-python-powerbi',
    'Cuando combinamos scripts de Python dentro de Power BI para modelos de predicción simples, el tiempo de refresco puede ser un cuello de botella si no se filtran previamente las columnas en Power Query. Aquí documento los tres errores más comunes de tipo de datos y cómo resolverlos con tipos explícitos en Pandas.',
    'Data',
    ARRAY['Power BI', 'Python', 'DAX', 'ETL', 'Optimización'],
    '2026-06-28',
    true
),
(
    'Hardening de servidores Linux: primeros 15 minutos en una instancia limpia',
    'hardening-linux-primeros-15-minutos',
    'Una guía de referencia rápida que ejecuto siempre que inicio un nuevo servidor para laboratorios: deshabilitar autenticación por contraseña en SSH, configurar fail2ban con jail agresivo para intentos recurrentes, establecer reglas de firewall UFW y configurar actualizaciones desatendidas de seguridad.',
    'Cybersecurity',
    ARRAY['Linux', 'Hardening', 'SSH', 'UFW', 'DevSecOps'],
    '2026-07-20',
    true
),
(
    'De scripts sueltos a servicios de fondo con Systemd',
    'scripts-sueltos-a-systemd',
    'Cómo convertir tus scripts de automatización en Python en servicios gestionados por Systemd con reinicio automático ante fallos y registro centralizado en journald.',
    'Development',
    ARRAY['Python', 'Systemd', 'Linux', 'Automation'],
    '2026-08-14',
    true
)
ON CONFLICT (slug) DO NOTHING;
