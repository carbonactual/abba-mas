import { randomUUID } from "node:crypto";
import { CONTRACT_VERSION } from "../contracts.js";
import type { ActualSession, BecomingCard, HashIdentity, HumanAIEntry, PersonalAIMint, PulseEvent, SealGrant, AtlasProjection } from "../contracts.js";

const makeId = (prefix: string) => `${prefix}_${randomUUID()}`;
const now = () => new Date().toISOString();

export class LivingLoopOrchestrator {
  identities = new Map<string, HashIdentity>();
  mints = new Map<string, PersonalAIMint>();
  seals = new Map<string, SealGrant>();
  sessions = new Map<string, ActualSession>();
  cards = new Map<string, BecomingCard>();
  pulses = new Map<string, PulseEvent>();
  atlas = new Map<string, AtlasProjection>();

  enter(input: HumanAIEntry) {
    const humanId = input.human.humanId ?? makeId("human");
    const personalAiId = makeId("ai");
    const hashId = makeId("hash");
    const timestamp = now();

    const identity: HashIdentity = {
      version: CONTRACT_VERSION,
      hashId,
      humanId,
      personalAiId,
      subjectKind: "human_ai_pair",
      status: "active",
      mintedAt: timestamp,
      updatedAt: timestamp,
      proofRefs: []
    };

    const mint: PersonalAIMint = {
      version: CONTRACT_VERSION,
      mintId: makeId("mint"),
      humanId,
      personalAiId,
      hashId,
      status: "minted",
      requestedAt: input.requestedAt,
      completedAt: timestamp,
      capabilityProfile: input.requestedCapabilities ?? []
    };

    this.identities.set(hashId, identity);
    this.mints.set(mint.mintId, mint);
    return { identity, mint };
  }

  openActual(hashId: string, surfaces: ActualSession["surfaces"]): ActualSession {
    if (!this.identities.has(hashId)) throw new Error("Unknown shared identity");
    const session: ActualSession = {
      version: CONTRACT_VERSION,
      actualSessionId: makeId("actual"),
      hashId,
      startedAt: now(),
      status: "active",
      surfaces,
      pulseIds: []
    };
    this.sessions.set(session.actualSessionId, session);
    return session;
  }

  addSeal(grant: SealGrant) {
    this.seals.set(grant.sealGrantId, grant);
    return grant;
  }

  addBecoming(card: BecomingCard) {
    this.cards.set(card.becomingCardId, card);
    return card;
  }

  addPulse(event: PulseEvent) {
    this.pulses.set(event.pulseId, event);
    return event;
  }

  addAtlas(projection: AtlasProjection, sealGrantId: string) {
    const grant = this.seals.get(sealGrantId);
    if (!grant || grant.status !== "active" || !grant.scopes.includes("atlas_publish")) {
      throw new Error("ATLAS publication requires an active SEAL grant");
    }
    this.atlas.set(projection.atlasId, projection);
    return projection;
  }
}
