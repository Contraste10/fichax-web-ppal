# Contexto del Proyecto fichaX

## Descripción del Proyecto
**fichaX** es una aplicación web moderna orientada a la gestión de recursos humanos y control horario inteligente. El proyecto es una Landing Page con una funcionalidad de "Lista de Espera" activa.

## Estructura Técnica
*   **Frontend:** React 18 + Vite + Tailwind CSS.
*   **Backend:** Cloudflare Pages Functions.
*   **Base de Datos:** Cloudflare D1 (SQLite en el edge).

## Configuración de Base de Datos (Cloudflare D1)
Para activar la recolección de emails, se utiliza una base de datos D1 llamada `fichax-db`.

### Esquema de Datos (`schema.sql`)
```sql
CREATE TABLE waitlist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  ip_address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Funcionalidad de Backend (`functions/api/subscribe.js`)
El endpoint `/api/subscribe` gestiona las solicitudes POST:
1.  **Validación:** Verifica que el email sea válido.
2.  **Rate Limiting:** Comprueba si la IP ha realizado más de 5 registros. Si es así, devuelve error 429.
3.  **Inserción:** Intenta guardar el email. Si ya existe, devuelve éxito (para privacidad) pero no duplica.

## Guía de Activación (Paso a Paso)

Para que el formulario funcione en producción, debes realizar los siguientes pasos manuales en Cloudflare:

1.  **Crear la Base de Datos:**
    *   Ir al Dashboard de Cloudflare > Workers & Pages > D1.
    *   Crear una nueva base de datos llamada `fichax-db`.
    *   Copiar el **Database ID**.

2.  **Configurar `wrangler.toml`:**
    *   Editar el archivo `wrangler.toml` y reemplazar `PLACEHOLDER_DB_ID` con el ID real copiado en el paso anterior.

3.  **Crear la Tabla:**
    *   En el Dashboard de Cloudflare > D1 > `fichax-db` > Console.
    *   Copiar y pegar el contenido del archivo `schema.sql` y ejecutarlo.
    *   *Alternativa CLI:* `npx wrangler d1 execute fichax-db --file=./schema.sql` (requiere login local).

4.  **Vincular en Cloudflare Pages (Producción):**
    *   Ir al proyecto en Cloudflare Pages > Settings > Functions > D1 Database Bindings.
    *   Variable name: `DB` (Debe ser exactamente este nombre).
    *   D1 Database: Seleccionar `fichax-db`.
    *   Guardar y desplegar de nuevo (o esperar al siguiente push).

## Comandos Útiles
*   `npm run dev`: Inicia el servidor de desarrollo local.
*   `npm run build`: Genera la versión de producción.
