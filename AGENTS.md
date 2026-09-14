# Directrices para Agentes de Inteligencia Artificial — BlackTechSec V2

Este archivo establece las reglas y directivas fundamentales para cualquier agente o desarrollador que interactúe o mantenga este repositorio:

## 1. Identidad y Filosofía de la Marca
* La marca es **BLACKTECHSEC** (*Black Technology Security*), creada y operada exclusivamente por **Jair Alexis Martinez**.
* **Filosofía central:** `LEARN. BUILD. EXPLORE. SHARE.`
* **Prohibición de clichés:** NUNCA describir a Jair con términos sensacionalistas como "Cybersecurity Guru", "World-class hacker" o "AI master". El tono debe ser estrictamente honesto, riguroso e ingenieril.
* **Prohibición de modelo de negocio:** BlackTechSec NO es una academia, tienda, agencia, marketplace ni empresa de consultoría. Es un hub tecnológico personal.

## 2. Reglas de Código y Arquitectura
* **Desacoplamiento de Supabase:** Ningún componente visual debe importar el cliente de Supabase directamente. Todas las interacciones de lectura o escritura deben realizarse a través de `src/services/*Service.ts`.
* **Mantenimiento del Fallback:** Todo método de servicio debe mantener la capacidad de responder con datos estructurados locales si Supabase no está configurado o falla la conexión.
* **Seguridad y Secretos:**
  * NUNCA añadir `service_role key`, contraseñas ni credenciales privadas al código ni a git.
  * Solo `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` son públicas para el bundle frontend.
* **Compatibilidad con GitHub Pages:**
  * Mantener siempre `public/CNAME` con el valor `blacktechsec.com`.
  * Mantener `public/404.html` y el script de hidratación en `index.html` para enrutamiento SPA sin errores.
* **Tipado Estricto:** Toda nueva entidad debe registrarse en `src/types/index.ts`.
