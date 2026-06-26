export type IoAssetKind =
  | 'LEGAL_TENDER_REFERENCE'
  | 'BANK_BALANCE_REFERENCE'
  | 'PAYMENT_TOKEN'
  | 'SETTLEMENT_TOKEN'
  | 'UTILITY_TOKEN'
  | 'ACCESS_TOKEN'
  | 'RIGHTS_TOKEN'
  | 'LICENCE_TOKEN'
  | 'PROOF_TOKEN'
  | 'RECEIPT_TOKEN'
  | 'LOYALTY_CREDIT'
  | 'COMPUTE_CREDIT'
  | 'STORAGE_CREDIT'
  | 'BANDWIDTH_CREDIT'
  | 'ENERGY_CREDIT'
  | 'NFT'
  | 'CANONICAL_MINT'
  | 'USAGE_RECEIPT'
  | 'BE_COLLECTIBLE'
  | 'SIMULATION_OBJECT';

export interface IoAssetRecord {
  id: string;
  kind: IoAssetKind;
  issuerEntityId: string;
  controllerEntityId: string;
  truthState: string;
  rights: string[];
  restrictions: string[];
  transferability: 'FREE' | 'RESTRICTED' | 'NON_TRANSFERABLE' | 'UNKNOWN';
  redemptionTerms?: string;
  backingEvidenceIds: string[];
  jurisdiction?: string;
  expiresAt?: string;
  settled: boolean;
}

export interface CanonicalMintRecord {
  id: string;
  assetRecordId: string;
  originatorIds: string[];
  contributorIds: string[];
  rightsIds: string[];
  proofIds: string[];
  mintedAt: string;
  chainReference?: string;
  internalLedgerReference: string;
}

export interface UsageReceipt {
  id: string;
  mintId: string;
  action: string;
  actorEntityId: string;
  entitlementId?: string;
  proofId?: string;
  occurredAt: string;
  publicAnchorEligible: boolean;
}
