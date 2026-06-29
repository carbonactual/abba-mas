export type SimulationClockKind =
  | 'EARTH_UTC'
  | 'LOCAL_PLANETARY'
  | 'ORBITAL'
  | 'RELATIVISTIC'
  | 'DELAY_TOLERANT'
  | 'LOGICAL_SEQUENCE';

export interface SimulationClock {
  id: string;
  kind: SimulationClockKind;
  epoch: string;
  rateNumerator: bigint;
  rateDenominator: bigint;
  maximumCommunicationDelaySeconds?: number;
}

export interface ValueGrammar {
  id: string;
  unitDefinitions: Record<string, string>;
  scarcityModel: string;
  ownershipModel: string;
  consentModel: string;
  transferModel: string;
  settlementModel: string;
  timeModel: string;
  assumptions: string[];
  unknowns: string[];
}

export interface ScenarioLedgerEntry {
  id: string;
  scenarioId: string;
  debitAccount: string;
  creditAccount: string;
  unit: string;
  quantity: string;
  truthState: 'SIMULATED' | 'FICTIONAL' | 'UNVERIFIED' | 'CONDITIONAL' | 'RESEARCH_ONLY';
  clockId: string;
  logicalSequence: number;
  evidenceIds: string[];
}

export interface BoundedMachineExperiment {
  id: string;
  scenarioId: string;
  machineIds: string[];
  allowedCapabilities: string[];
  maximumOperations: number;
  maximumExposure: string;
  simulationOnly: true;
  reversible: true;
  humanApprovalIds: string[];
  sealConsentIds: string[];
  startsAt: string;
  expiresAt: string;
}

export interface QuantumReadinessProfile {
  systemId: string;
  cryptographicInventoryComplete: boolean;
  algorithmAgility: boolean;
  migrationPlanId?: string;
  hybridModeSupported: boolean;
  keyRotationTested: boolean;
  lastReviewedAt: string;
}

export function validateBalancedScenario(entries: ScenarioLedgerEntry[]): boolean {
  const totals = new Map<string, bigint>();
  for (const entry of entries) {
    const amount = BigInt(entry.quantity);
    totals.set(`${entry.unit}:debit`, (totals.get(`${entry.unit}:debit`) ?? 0n) + amount);
    totals.set(`${entry.unit}:credit`, (totals.get(`${entry.unit}:credit`) ?? 0n) + amount);
  }
  for (const key of totals.keys()) {
    if (!key.endsWith(':debit')) continue;
    const unit = key.slice(0, -6);
    if (totals.get(key) !== totals.get(`${unit}:credit`)) return false;
  }
  return true;
}
