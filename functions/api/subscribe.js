export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    // 1. Obtener datos del request
    const formData = await request.json();
    const email = formData.email;
    
    // Obtener IP del cliente (Cloudflare header estándar)
    const clientIP = request.headers.get("CF-Connecting-IP") || "0.0.0.0";

    // 2. Validaciones básicas
    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: "Email inválido" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 3. Rate Limiting: Comprobar cuántos registros tiene esta IP
    const { results: ipCheck } = await env.DB.prepare(
      "SELECT count(*) as count FROM waitlist WHERE ip_address = ?"
    ).bind(clientIP).run();

    const requestCount = ipCheck[0].count;

    if (requestCount >= 5) {
      return new Response(JSON.stringify({ error: "Has excedido el límite de registros permitidos." }), {
        status: 429,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 4. Insertar en Base de Datos
    // Intentamos insertar. Si el email ya existe, fallará por la restricción UNIQUE
    try {
      await env.DB.prepare(
        "INSERT INTO waitlist (email, ip_address) VALUES (?, ?)"
      ).bind(email, clientIP).run();
      
      return new Response(JSON.stringify({ success: true, message: "¡Registrado correctamente!" }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });

    } catch (dbError) {
      // Código de error SQLite para restricción única violada (SQLITE_CONSTRAINT)
      if (dbError.message && dbError.message.includes("UNIQUE constraint failed")) {
         // Para privacidad, podemos decir que fue exitoso o avisar que ya está registrado.
         // En este caso avisamos amigablemente.
         return new Response(JSON.stringify({ success: true, message: "Este email ya estaba registrado." }), {
          status: 200, // Devolvemos 200 para no alertar como error en frontend
          headers: { "Content-Type": "application/json" }
        });
      }
      throw dbError;
    }

  } catch (err) {
    return new Response(JSON.stringify({ error: "Error interno del servidor", details: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
