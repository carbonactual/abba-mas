const layers = [
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
    rule: "Store masked memory, mint IDs, token refs, proof refs, and continuity context."
  },
  {
    name: "ABBA Memory API",
    providers: "Supermemory, Mem0, Letta",
    status: "candidate",
    seal: "SEAL-3 to SEAL-4",
    rule: "Support ABBA agent recall without exposing true value."
  },
  {
    name: "Temporal Index",
    providers: "Zep, Graphiti",
    status: "candidate",
    seal: "SEAL-4",
    rule: "Track what happened, when it changed, and what proof points exist."
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
  ["Swarm Providers", "/api/swarm/providers"]
];

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", padding: "48px", fontFamily: "system-ui, sans-serif", background: "#05070f", color: "#f8fafc" }}>
      <section style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <p style={{ letterSpacing: "0.24em", textTransform: "uppercase", color: "#67e8f9", fontSize: "12px" }}>ABBA MAS Swarm</p>
        <h1 style={{ fontSize: "clamp(36px, 7vw, 84px)", lineHeight: 0.95, margin: "16px 0" }}>
          Memory remembers. Actual reveals value.
        </h1>
        <p style={{ maxWidth: "780px", color: "#cbd5e1", fontSize: "18px", lineHeight: 1.7 }}>
          ABBA MAS now has the first swarm scaffold for Continuum, HAPI Root, Index, Curation, ATLAS, and Actual. Providers store masked references only. True value is gated by ABBA resolution, SEAL approval, and the Actual value engine.
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
            Static registry → providers API → Supabase tables → ingest route → Actual-call route → dashboard cards → n8n router → Memorae/Supermemory/Zep/Graphiti pilot → EAS testnet references → ATLAS public proof after SEAL.
          </p>
        </section>
      </section>
    </main>
  );
}
