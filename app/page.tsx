const layers = [
  {
    name: "ABBA Operating Core",
    providers: "Status, registry, prepare, check, HAPI assignment",
    status: "enabled mock-first",
    seal: "SEAL-3 to SEAL-5",
    rule: "ABBA prepares, classifies, routes, and returns signal. Review gates remain active."
  },
  {
    name: "Universal Value Accounting",
    providers: "Measure action, loss, residue, resource use, wear, delay, failed downloads, failed page loads, and missed opportunity",
    status: "core added",
    seal: "SEAL-2 to SEAL-5",
    rule: "Nothing is zero by default. Every measurable residue can become record, recovery, prevention, or replenishment."
  },
  {
    name: "Becoming Value Feed",
    providers: "Signal intake, value-only feed, route, risk, proof need, next action, expected PULSE",
    status: "core added",
    seal: "SEAL-2 to SEAL-5",
    rule: "Raw signal is not feed. Only curated value enters the Becoming Feed."
  },
  {
    name: "I/O Pulse Value Loop",
    providers: "Pulse-in, value-out, return signal, value state",
    status: "core added",
    seal: "SEAL-2 to SEAL-5",
    rule: "PULSE received. VALUE sent. Value acted upon returns PULSE."
  },
  {
    name: "ABBA Interpretation Engine",
    providers: "Screenshots, DMs, documents, links, people, products, designs, ideas, courses, repos",
    status: "doctrine added",
    seal: "SEAL-2 to SEAL-5",
    rule: "ABBA interprets input, extracts value, assigns route, and returns the next action."
  },
  {
    name: "Continuum Capture",
    providers: "Tana, Fabric, Readwise, Heptabase, mymind, Obsidian, Capacities, Raindrop, Recall.ai, Fireflies, Plaud",
    status: "candidate",
    seal: "SEAL-3 to SEAL-5",
    rule: "Capture signals only after consent."
  },
  {
    name: "HAPI Root",
    providers: "Memorae.ai, Personal AI",
    status: "candidate",
    seal: "SEAL-4",
    rule: "Store masked memory, record IDs, token refs, proof refs, and continuity context."
  },
  {
    name: "ABBA Memory API",
    providers: "Supermemory, Mem0, Letta",
    status: "candidate",
    seal: "SEAL-3 to SEAL-4",
    rule: "Support ABBA agent recall without exposing true value."
  },
  {
    name: "ABBA Model Router",
    providers: "OpenRouter, openrouter/auto, model fallbacks, free-model router candidates, OpenAI-compatible routing, provider selection",
    status: "router added",
    seal: "SEAL-4",
    rule: "OpenRouter routes model calls. ABBA remains resolver. SEAL remains approval authority."
  },
  {
    name: "Temporal Index",
    providers: "Zep, Graphiti",
    status: "candidate",
    seal: "SEAL-4",
    rule: "Track what happened, when it changed, and what proof points exist."
  },
  {
    name: "OpenAlternative Scout",
    providers: "OpenAlternative source index plus first free OSS set: n8n, Dify, Langflow, Open WebUI, Firecrawl, Baserow, Novu, Hoppscotch, Uptime Kuma, Hanko, Postiz, Dub, OpenPanel, Tolgee, Cap, Excalidraw, Browser Use, RustDesk, Parlant, Openlane",
    status: "free OSS candidates added",
    seal: "SEAL-1 to SEAL-4",
    rule: "Discover and sandbox free/open-source alternatives. Production stays blocked until SEAL review."
  },
  {
    name: "Expanded App Swarm",
    providers: "Flowise, AnythingLLM, LibreChat, LobeChat, Ollama, LocalAI, LiteLLM, Langfuse, Phoenix, Opik, PostHog, Matomo, Plausible, listmonk, Mautic, Twenty, Cal.com, Plane, AppFlowy, Outline, Directus, Strapi, Payload, Medusa, ERPNext, Moodle, Open edX, Formbricks, Documenso, Paperless, Nextcloud, Coolify, Grafana, Infisical, Keycloak, Qdrant, Crawl4AI, SearXNG, ToolJet, Appsmith, Windmill, Temporal, PocketBase and more",
    status: "expanded swarm pack added",
    seal: "SEAL-2 to SEAL-4",
    rule: "All apps are registry candidates first. Sandbox before deployment. No secrets or Actual value by default."
  },
  {
    name: "ATLAS Public Knowledge",
    providers: "OriginTrail DKG, Fabric Publish, Obsidian Publish",
    status: "blocked until SEAL",
    seal: "SEAL-5",
    rule: "Publish only approved public truth after Actual and SEAL."
  },
  {
    name: "Actual Proof / Value Call",
    providers: "EAS, Ceramic, Veramo, SpruceID",
    status: "candidate",
    seal: "SEAL-5",
    rule: "Only Actual may reveal, price, route, settle, or activate value."
  }
];

const links = [
  ["Health", "/api/health"],
  ["ABBA Status", "/api/abba/status"],
  ["ABBA Registry", "/api/abba/registry"],
  ["Becoming Feed", "/api/becoming/feed"],
  ["I/O Status", "/api/io/status"],
  ["Value Measure", "/api/value/measure"],
  ["Value Reclaim", "/api/value/reclaim"],
  ["Value Examples", "/api/value/examples"],
  ["Swarm Providers", "/api/swarm/providers"],
  ["OpenRouter", "/api/swarm/openrouter"]
];

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", padding: "48px", fontFamily: "system-ui, sans-serif", background: "#05070f", color: "#f8fafc" }}>
      <section style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <p style={{ letterSpacing: "0.24em", textTransform: "uppercase", color: "#67e8f9", fontSize: "12px" }}>ABBA MAS Swarm</p>
        <h1 style={{ fontSize: "clamp(36px, 7vw, 84px)", lineHeight: 0.95, margin: "16px 0" }}>
          Nothing is lost. Value is measured. Actual reveals.
        </h1>
        <p style={{ maxWidth: "780px", color: "#cbd5e1", fontSize: "18px", lineHeight: 1.7 }}>
          ABBA MAS now has the operating core, Universal Value Accounting, Becoming Value Feed, I/O Pulse Value Loop, HAPI assignment path, OpenRouter model routing, OpenAlternative discovery, expanded app swarm, and Actual value guardrails. Raw signals are curated before value appears. Loss, delay, wear, residue, and failed actions can become measurable records.
        </p>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "28px" }}>
          {links.map(([label, href]) => (
            <a key={href} href={href} style={{ color: "#05070f", background: "#67e8f9", padding: "12px 16px", borderRadius: "999px", textDecoration: "none", fontWeight: 700 }}>
              {label}
            </a>
          ))}
        </div>

        <section style={{ marginTop: "44px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "18px" }}>
          {layers.map((layer) => (
            <article key={layer.name} style={{ border: "1px solid rgba(148, 163, 184, 0.26)", background: "rgba(15, 23, 42, 0.72)", borderRadius: "24px", padding: "22px", boxShadow: "0 20px 80px rgba(8, 145, 178, 0.12)" }}>
              <p style={{ margin: 0, color: "#67e8f9", fontSize: "13px", fontWeight: 700 }}>{layer.status}</p>
              <h2 style={{ margin: "10px 0", fontSize: "22px" }}>{layer.name}</h2>
              <p style={{ color: "#cbd5e1", lineHeight: 1.55 }}>{layer.providers}</p>
              <p style={{ color: "#94a3b8", fontSize: "14px" }}>Default gate: {layer.seal}</p>
              <p style={{ color: "#e2e8f0", lineHeight: 1.55 }}>{layer.rule}</p>
            </article>
          ))}
        </section>

        <section style={{ marginTop: "44px", padding: "24px", borderRadius: "24px", border: "1px solid rgba(103, 232, 249, 0.28)", background: "linear-gradient(135deg, rgba(8, 145, 178, 0.18), rgba(88, 28, 135, 0.18))" }}>
          <h2>Activation sequence</h2>
          <p style={{ color: "#cbd5e1", lineHeight: 1.7 }}>
            Signal → ABBA interpretation → value measurement → residue classification → Becoming Feed → action → PULSE return → I/O state update → reclamation/replenishment → proof route → Actual-ready queue.
          </p>
        </section>
      </section>
    </main>
  );
}
