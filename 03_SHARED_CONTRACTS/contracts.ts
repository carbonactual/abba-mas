export const CONTRACT_VERSION = "0.1.0" as const;

export type ISODateTime = string;
export type URI = string;
export type EntityId = string;
export type HashId = string;

export type LifecycleStatus =
  | "pending"
  | "active"
  | "restricted"
  | "suspended"
  | "revoked"
  | "expired"
  | "under_review";

export type ActorKind =
  | "human"
  | "personal_ai"
  | "human_ai_pair"
  | "organization"
  | "group"
  | "team"
  | "company"
  | "nation"
  | "state"
  | "club"
  | "institution"
  | "service";

export interface ProofRef {
  proofId: EntityId;
  type: string;
  issuer: EntityId;
  subject: EntityId;
  issuedAt: ISODateTime;
  expiresAt?: ISODateTime;
  uri?: URI;
  digest?: string;
  status: "valid" | "revoked" | "expired" | "unknown";
}

export interface HashIdentity {
  version: typeof CONTRACT_VERSION;
  hashId: HashId;
  humanId: EntityId;
  personalAiId: EntityId;
  subjectKind: "human_ai_pair";
  status: LifecycleStatus;
  mintedAt: ISODateTime;
  updatedAt: ISODateTime;
  publicKey?: string;
  proofRefs: ProofRef[];
  tags?: string[];
}

export interface HumanAIEntry {
  version: typeof CONTRACT_VERSION;
  entryId: EntityId;
  requestedAt: ISODateTime;
  human: {
    humanId?: EntityId;
    locale?: string;
    timezone?: string;
    preferredName?: string;
  };
  requestedCapabilities?: string[];
  sealGrantId?: EntityId;
}

export interface PersonalAIMint {
  version: typeof CONTRACT_VERSION;
  mintId: EntityId;
  humanId: EntityId;
  personalAiId: EntityId;
  hashId: HashId;
  status: "requested" | "minting" | "minted" | "failed";
  requestedAt: ISODateTime;
  completedAt?: ISODateTime;
  modelRoute?: string;
  memoryRoute?: string;
  capabilityProfile?: string[];
  proofRef?: ProofRef;
  failureReason?: string;
}

export type SealScope =
  | "identity_verify"
  | "claim_disclose"
  | "action_execute"
  | "memory_read"
  | "memory_write"
  | "root_read"
  | "root_write"
  | "atlas_publish"
  | "location_use"
  | "external_app_access";

export interface SealGrant {
  version: typeof CONTRACT_VERSION;
  sealGrantId: EntityId;
  hashId: HashId;
  grantedBy: EntityId;
  audience: EntityId;
  scopes: SealScope[];
  claims?: string[];
  constraints?: Record<string, unknown>;
  grantedAt: ISODateTime;
  expiresAt?: ISODateTime;
  revokedAt?: ISODateTime;
  status: "active" | "revoked" | "expired";
}

export type PulseDirection = "inward" | "outward" | "bidirectional";
export type PulseSource =
  | "human"
  | "personal_ai"
  | "joint"
  | "device"
  | "location"
  | "group"
  | "service"
  | "external_app";

export interface PulseEvent<TPayload = Record<string, unknown>> {
  version: typeof CONTRACT_VERSION;
  pulseId: EntityId;
  hashId: HashId;
  actorId: EntityId;
  actorKind: ActorKind;
  source: PulseSource;
  eventType: string;
  direction: PulseDirection;
  occurredAt: ISODateTime;
  receivedAt: ISODateTime;
  context?: {
    actualSessionId?: EntityId;
    becomingCardId?: EntityId;
    locationRef?: EntityId;
    groupRef?: EntityId;
    deviceRef?: EntityId;
  };
  payload: TPayload;
  proofRefs?: ProofRef[];
  sealGrantId?: EntityId;
  correlationId?: EntityId;
}

export interface RootUpdateEvent {
  version: typeof CONTRACT_VERSION;
  updateId: EntityId;
  hashId: HashId;
  pulseId: EntityId;
  category: string;
  operation: "append" | "amend" | "supersede" | "remove";
  dataRef: EntityId;
  occurredAt: ISODateTime;
  proofRefs?: ProofRef[];
  sealGrantId?: EntityId;
}

export interface IndexUpdateEvent {
  version: typeof CONTRACT_VERSION;
  updateId: EntityId;
  sourcePulseId: EntityId;
  topic: string;
  operation: "upsert" | "link" | "unlink" | "reclassify";
  entityRefs: EntityId[];
  occurredAt: ISODateTime;
  confidence?: number;
  proofRefs?: ProofRef[];
}

export interface ActualSession {
  version: typeof CONTRACT_VERSION;
  actualSessionId: EntityId;
  hashId: HashId;
  startedAt: ISODateTime;
  endedAt?: ISODateTime;
  status: "active" | "paused" | "completed" | "abandoned";
  surfaces: Array<
    | "phone"
    | "device"
    | "location"
    | "human_connection"
    | "group"
    | "work"
    | "learning"
    | "outdoor"
    | "transport"
    | "service"
  >;
  contextRefs?: EntityId[];
  goalRefs?: EntityId[];
  locationRef?: EntityId;
  groupRefs?: EntityId[];
  pulseIds?: EntityId[];
}

export type BecomingCardType =
  | "person"
  | "opportunity"
  | "task"
  | "knowledge"
  | "risk"
  | "event"
  | "relationship"
  | "product"
  | "service"
  | "commitment"
  | "need"
  | "movement"
  | "outdoor"
  | "group_direction";

export interface BecomingCard {
  version: typeof CONTRACT_VERSION;
  becomingCardId: EntityId;
  hashId: HashId;
  cardType: BecomingCardType;
  title: string;
  summary?: string;
  reasonCodes: string[];
  surface:
    | "phone"
    | "location"
    | "relationship"
    | "group"
    | "work"
    | "learning"
    | "outdoor"
    | "service";
  priority: number;
  validFrom: ISODateTime;
  validUntil?: ISODateTime;
  action?: {
    label: string;
    actionType: string;
    targetRef?: EntityId;
    uri?: URI;
  };
  sourceRefs: EntityId[];
  sealGrantId?: EntityId;
  proofRefs?: ProofRef[];
}

export interface AtlasProjection {
  version: typeof CONTRACT_VERSION;
  atlasId: EntityId;
  subjectId: EntityId;
  subjectKind: ActorKind;
  publicHandle: string;
  displayName: string;
  headline?: string;
  summary?: string;
  publicClaims: Record<string, unknown>;
  relationshipRefs?: EntityId[];
  achievementRefs?: EntityId[];
  activityRefs?: EntityId[];
  proofRefs?: ProofRef[];
  publishedAt: ISODateTime;
  updatedAt: ISODateTime;
  visibility: "public" | "limited" | "unlisted";
}

export interface VerificationRequest {
  version: typeof CONTRACT_VERSION;
  requestId: EntityId;
  hashId: HashId;
  audience: EntityId;
  requestedClaims: string[];
  nonce: string;
  sealGrantId?: EntityId;
  requestedAt: ISODateTime;
}

export interface VerificationResponse {
  version: typeof CONTRACT_VERSION;
  requestId: EntityId;
  hashId: HashId;
  result: "verified" | "not_verified" | "consent_required";
  approvedClaims?: Record<string, unknown>;
  proofRefs?: ProofRef[];
  issuedAt: ISODateTime;
  expiresAt: ISODateTime;
  audience: EntityId;
  nonce: string;
  signature?: string;
}
