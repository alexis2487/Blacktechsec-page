# Sistema de Diseño Editorial — BlackTechSec V2

## 1. Filosofía Estética
El diseño de BlackTechSec V2 rechaza conscientemente los clichés tradicionales de ciberseguridad:
* ❌ No terminales decorativas simuladas
* ❌ No calaveras ni candados gigantes
* ❌ No texto verde neón sobresaturado ("efecto Matrix")
* ❌ No interfaces saturadas de cyberpunk ficticio

En su lugar, comunica la sobriedad, elegancia y rigor de la ingeniería moderna:
* ✅ Fondos oscuros profundos (`zinc-950`, `zinc-900`) con micro-bordes sutiles (`zinc-800/80`).
* ✅ Tipografía dual: **Inter** para lectura editorial de alta legibilidad + **JetBrains Mono** para metadatos, etiquetas y snippets técnicos.
* ✅ Jerarquía visual limpia y espaciado consistente.
* ✅ Acentos de color inspirados en herramientas de ingeniería de software de primer nivel: azul zafiro (`brand-500`), cian técnico (`accent-cyan`), esmeralda de verificación (`accent-emerald`) y ámbar de advertencia (`accent-amber`).

## 2. Paleta de Colores

| Token | Hex | Aplicación |
| :--- | :--- | :--- |
| `zinc-950` | `#09090b` | Fondo principal (Dark Mode prioritario) |
| `zinc-900` | `#18181b` | Fondo de tarjetas y paneles flotantes |
| `zinc-800` | `#27272a` | Bordes divisorios y elementos de interacción |
| `zinc-100` | `#f4f4f5` | Tipografía de títulos y texto prioritario |
| `zinc-400` | `#a1a1aa` | Texto descriptivo y párrafos secundarios |
| `brand-600` | `#0271c7` | Botones de acción primaria y estados activos |
| `accent-cyan`| `#06b6d4` | Acentos de investigación y laboratorio |
| `accent-emerald`| `#10b981` | Estados de éxito y verificación |

## 3. Modo Claro / Modo Oscuro
La interfaz prioriza el modo oscuro por defecto (`dark`), pero incluye soporte completo y accesible para modo claro mediante clases de Tailwind, activable mediante el botón de sol/luna ubicado en la barra de navegación superior.
