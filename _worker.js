// Single Worker: serves the planner page and handles the shared-storage API.
// This is the Workers "static assets" model - one Worker in front of the files.
//
// Bindings it expects (declared in wrangler.toml):
//   ASSETS   - the static files (index.html)
//   PLANNER  - the KV namespace holding the password and the plans

const DATA_KEY = "planner-state";
const AUTH_KEY = "planner-auth";
const MAX = 300000;

const json = (body, status = 200) =>
  new Response(typeof body === "string" ? body : JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

async function authed(request, env) {
  const stored = await env.PLANNER.get(AUTH_KEY);
  if (!stored) return { setup: true, ok: false };
  const given = request.headers.get("x-planner-key") || "";
  return { setup: false, ok: given && given === stored };
}

async function handleApi(request, env) {
  if (!env.PLANNER) return json({ error: "KV namespace PLANNER is not bound" }, 500);

  if (request.method === "GET") {
    const a = await authed(request, env);
    if (a.setup) return json({ needsSetup: true });
    if (!a.ok) return json({ error: "locked" }, 401);
    const saved = await env.PLANNER.get(DATA_KEY);
    return json({ state: saved ? JSON.parse(saved) : {} });
  }

  if (request.method === "PUT") {
    const raw = await request.text();
    if (raw.length > MAX) return json({ error: "too large" }, 413);
    let body;
    try { body = JSON.parse(raw); }
    catch { return json({ error: "not valid JSON" }, 400); }

    if (body && typeof body.setPassword === "string") {
      const existing = await env.PLANNER.get(AUTH_KEY);
      if (existing) return json({ error: "password already set" }, 409);
      if (body.setPassword.length < 16) return json({ error: "bad fingerprint" }, 400);
      await env.PLANNER.put(AUTH_KEY, body.setPassword);
      return json({ ok: true });
    }

    const a = await authed(request, env);
    if (a.setup) return json({ error: "no password set" }, 409);
    if (!a.ok) return json({ error: "locked" }, 401);
    if (typeof body !== "object" || body === null || !Array.isArray(body.plans)) {
      return json({ error: "expected an object with a plans array" }, 400);
    }
    await env.PLANNER.put(DATA_KEY, raw);
    return json({ ok: true });
  }

  return json({ error: "method not allowed" }, 405);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/state") {
      return handleApi(request, env);
    }
    // Everything else: serve the static files (index.html etc.)
    return env.ASSETS.fetch(request);
  },
};

