export type ProviderMode =
  | 'DISCOVERY_ONLY'
  | 'READ_ONLY'
  | 'SANDBOX'
  | 'TESTNET'
  | 'HUMAN_APPROVAL_REQUIRED'
  | 'PRODUCTION_BOUNDED'
  | 'ACTIVE'
  | 'SUSPENDED'
  | 'DISABLED'
  | 'PROHIBITED';

export type ProviderCapability =
  | 'payments'
  | 'virtual_accounts'
  | 'bank_transfer'
  | 'cards'
  | 'mobile_money'
  | 'airtime_data'
  | 'identity_verification'
  | 'open_banking'
  | 'accounting_export'
  | 'escrow'
  | 'stablecoin_settlement'
  | 'wallet_connection'
  | 'proof_anchoring'
  | 'blockchain_read'
  | 'blockchain_simulation'
  | 'agent_earning'
  | 'agent_coordination'
  | 'ai_routing'
  | 'compute_credit'
  | 'storage_credit'
  | 'communication'
  | 'marketplace'
  | 'risk_intelligence';

export interface ProviderContext {
  tenantId: string;
  actorId: string;
  sealConsentId: string;
  correlationId: string;
  requestedMode: ProviderMode;
  humanApprovalId?: string;
}

export interface ProviderHealth {
  providerId: string;
  mode: ProviderMode;
  reachable: boolean;
  checkedAt: string;
  details?: Record<string, unknown>;
}

export interface ProviderRequest<TPayload = unknown> {
  operation: string;
  idempotencyKey: string;
  payload: TPayload;
  metadata?: Record<string, string>;
}

export interface ProviderResult<TData = unknown> {
  providerId: string;
  externalReference?: string;
  status: 'ACCEPTED' | 'PENDING' | 'REJECTED' | 'FAILED' | 'SIMULATED';
  data?: TData;
  reason?: string;
  rawStoredInVault?: boolean;
}

export interface IoProviderAdapter {
  readonly providerId: string;
  readonly capabilities: readonly ProviderCapability[];
  readonly allowedModes: readonly ProviderMode[];
  health(context: ProviderContext): Promise<ProviderHealth>;
  execute<TPayload, TData>(
    context: ProviderContext,
    request: ProviderRequest<TPayload>,
  ): Promise<ProviderResult<TData>>;
}

export function assertProviderExecutionAllowed(
  context: ProviderContext,
  adapter: IoProviderAdapter,
): void {
  if (!adapter.allowedModes.includes(context.requestedMode)) {
    throw new Error(`Provider ${adapter.providerId} does not allow mode ${context.requestedMode}`);
  }

  const irreversibleModes: ProviderMode[] = ['HUMAN_APPROVAL_REQUIRED', 'PRODUCTION_BOUNDED', 'ACTIVE'];
  if (irreversibleModes.includes(context.requestedMode) && !context.humanApprovalId) {
    throw new Error('Human approval is required for bounded or active provider execution');
  }
}
