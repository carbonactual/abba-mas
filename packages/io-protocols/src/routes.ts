export type IoActorKind =
  | 'HAPI'
  | 'AGENT'
  | 'PERSON'
  | 'BUSINESS'
  | 'INSTITUTION'
  | 'GOVERNMENT'
  | 'MACHINE'
  | 'ROBOT'
  | 'PRODUCT';

export type IoProtocol =
  | 'MCP'
  | 'A2A'
  | 'X402'
  | 'AP2'
  | 'HTTP_API'
  | 'OPENAPI'
  | 'GRAPHQL'
  | 'JSON_RPC'
  | 'GRPC'
  | 'WEBSOCKET'
  | 'WEBHOOK'
  | 'EVENT_STREAM'
  | 'MATRIX'
  | 'NOSTR'
  | 'DIDCOMM'
  | 'ACTIVITYPUB'
  | 'QR'
  | 'NFC'
  | 'USSD'
  | 'DELAY_TOLERANT';

export interface IoRoute {
  id: string;
  sourceKind: IoActorKind;
  sourceId: string;
  destinationKind: IoActorKind;
  destinationId: string;
  protocol: IoProtocol;
  purpose: string;
  sealConsentId: string;
  policyDecisionId: string;
  capabilities: string[];
  reversible: boolean;
  humanApprovalRequired: boolean;
  expiresAt?: string;
}

export function assertScopedRoute(route: IoRoute): void {
  if (!route.sealConsentId || !route.policyDecisionId) {
    throw new Error('I/O routes require SEAL consent and a policy decision');
  }
  if (route.capabilities.length === 0) {
    throw new Error('I/O routes require explicit bounded capabilities');
  }
}
