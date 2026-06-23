import { describe, expect, it } from "vitest";
import { CONTRACT_VERSION, type HumanAIEntry, type SealGrant } from "../contracts.js";
import { LivingLoopOrchestrator } from "../src/orchestrator.js";
import { validateContract } from "../src/validator.js";

const entry: HumanAIEntry = {
  version: CONTRACT_VERSION,
  entryId: "entry_test_001",
  requestedAt: "2026-06-23T09:00:00.000Z",
  human: {
    humanId: "human_test_001",
    locale: "en-NG",
    timezone: "Africa/Lagos"
  },
  requestedCapabilities: ["memory", "curation"]
};

describe("shared contracts", () => {
  it("creates one shared identity and one personal AI mint", () => {
    const runtime = new LivingLoopOrchestrator();
    const result = runtime.enter(entry);

    expect(result.identity.subjectKind).toBe("human_ai_pair");
    expect(result.identity.humanId).toBe("human_test_001");
    expect(result.identity.personalAiId).toBe(result.mint.personalAiId);
    expect(result.identity.hashId).toBe(result.mint.hashId);
    expect(result.mint.status).toBe("minted");
  });

  it("opens Actual only for an existing shared identity", () => {
    const runtime = new LivingLoopOrchestrator();
    const { identity } = runtime.enter(entry);
    const session = runtime.openActual(identity.hashId, ["phone", "outdoor"]);

    expect(session.hashId).toBe(identity.hashId);
    expect(session.status).toBe("active");
    expect(session.surfaces).toContain("outdoor");
  });

  it("requires SEAL before publishing ATLAS", () => {
    const runtime = new LivingLoopOrchestrator();
    const { identity } = runtime.enter(entry);

    expect(() => runtime.addAtlas({
      version: CONTRACT_VERSION,
      atlasId: "atlas_test_001",
      subjectId: identity.humanId,
      subjectKind: "human",
      publicHandle: "test-human",
      displayName: "Test Human",
      publicClaims: {},
      publishedAt: "2026-06-23T09:00:00.000Z",
      updatedAt: "2026-06-23T09:00:00.000Z",
      visibility: "public"
    }, "missing")).toThrow(/SEAL/);

    const seal: SealGrant = {
      version: CONTRACT_VERSION,
      sealGrantId: "seal_test_001",
      hashId: identity.hashId,
      grantedBy: identity.humanId,
      audience: "atlas",
      scopes: ["atlas_publish"],
      grantedAt: "2026-06-23T09:00:00.000Z",
      status: "active"
    };
    runtime.addSeal(seal);

    const projection = runtime.addAtlas({
      version: CONTRACT_VERSION,
      atlasId: "atlas_test_001",
      subjectId: identity.humanId,
      subjectKind: "human",
      publicHandle: "test-human",
      displayName: "Test Human",
      publicClaims: { identityVerified: true },
      publishedAt: "2026-06-23T09:00:00.000Z",
      updatedAt: "2026-06-23T09:00:00.000Z",
      visibility: "public"
    }, seal.sealGrantId);

    expect(projection.publicHandle).toBe("test-human");
  });

  it("validates a canonical shared identity", () => {
    const runtime = new LivingLoopOrchestrator();
    const { identity } = runtime.enter(entry);
    const result = validateContract("HashIdentity", identity);
    expect(result.valid).toBe(true);
  });
});
