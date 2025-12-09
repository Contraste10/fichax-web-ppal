# Contexto del Proyecto fichaX

## Descripción del Proyecto
**fichaX** es una aplicación web moderna orientada a la gestión de recursos humanos y control horario inteligente. Actualmente, el proyecto consiste en una **Landing Page** (página de aterrizaje) diseñada para captar usuarios interesados (lista de espera) y mostrar las características del producto futuro.

## Estructura Técnica
El proyecto ha sido configurado como una Single Page Application (SPA) utilizando las siguientes tecnologías:

*   **Framework:** React 18
*   **Build Tool:** Vite
*   **Estilos:** Tailwind CSS
*   **Iconos:** Lucide React
*   **Lenguaje:** JavaScript (ESModules)

## Estado Actual
El repositorio contiene todo lo necesario para desplegar la landing page estática.
Se ha realizado una migración de un único archivo `index.js` a una estructura de proyecto Vite estándar para asegurar su correcta compilación y despliegue.

### Cambios Realizados para el Despliegue
1.  **Estandarización:** Se ha renombrado el archivo original `index.js` a `App.jsx` para seguir las convenciones de React/Vite.
2.  **Configuración:** Se han creado los archivos de configuración necesarios:
    *   `package.json`: Gestión de dependencias y scripts.
    *   `vite.config.js`: Configuración del empaquetador.
    *   `tailwind.config.js` y `postcss.config.js`: Configuración de estilos.
3.  **Puntos de Entrada:** Se han creado `index.html` y `main.jsx` para inicializar la aplicación React correctamente.
4.  **Verificación:** Se ha ejecutado el build localmente con éxito, generando la carpeta `dist`.

## Instrucciones de Despliegue (Cloudflare Pages)
Para publicar este proyecto en Cloudflare Pages mediante GitHub:

1.  Subir este código a un repositorio de GitHub.
2.  En Cloudflare Dashboard > Pages > Connect to Git.
3.  Seleccionar el repositorio `fichax`.
4.  Configurar los ajustes de compilación:
    *   **Framework preset:** Vite (o None)
    *   **Build command:** `npm run build`
    *   **Build output directory:** `dist`

## Tareas Pendientes / Futuras Mejoras
*   **Funcionalidad del Formulario:** Actualmente, el formulario de "Acceso Anticipado" es una simulación visual.
    *   *Acción requerida:* Integrar con un servicio de backend (Cloudflare Workers, Firebase, Supabase o un servicio de formularios como Formspree) para guardar los emails realmente.
*   **Dashboard Real:** La sección de "Dashboard en construcción" es puramente visual.
    *   *Acción requerida:* Desarrollar la lógica de autenticación y el panel de control real cuando el producto avance.
*   **SEO y Metadatos:**
    *   *Acción requerida:* Personalizar los metadatos en `index.html` (título, descripción, imagen og:image) para mejorar el compartir en redes sociales.

## Comandos Útiles
*   `npm run dev`: Inicia el servidor de desarrollo local.
*   `npm run build`: Genera la versión de producción en la carpeta `dist`.
*   `npm run preview`: Vista previa local de la versión de producción.
