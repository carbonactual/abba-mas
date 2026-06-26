export type FutureFinanceDomain =
  | 'AGENT_COMMERCE'
  | 'MACHINE_TO_MACHINE'
  | 'PROGRAMMABLE_MONEY'
  | 'TOKENIZED_DEPOSITS'
  | 'CBDC_INTEROPERABILITY'
  | 'MICROPAYMENTS'
  | 'STREAMING_PAYMENTS'
  | 'COMPUTE_CREDITS'
  | 'ENERGY_CREDITS'
  | 'DATA_CREDITS'
  | 'CAPABILITY_ROYALTIES'
  | 'PARAMETRIC_PROTECTION'
  | 'CLIMATE_AND_NATURE_VALUE'
  | 'DEPIN_FINANCE'
  | 'ROBOTICS_AND_FLEET'
  | 'ORBITAL_AND_CISLUNAR'
  | 'DELAY_TOLERANT_SETTLEMENT'
  | 'POST_QUANTUM_MIGRATION'
  | 'OUTCOME_FINANCE';

export type SpeculativeFinanceDomain =
  | 'NON_HUMAN_EXCHANGE'
  | 'SYNTHETIC_CIVILIZATION'
  | 'OFF_WORLD_COMMUNITY'
  | 'FIRST_CONTACT_SIMULATION'
  | 'UNKNOWN_VALUE_SYSTEM'
  | 'RELATIVISTIC_SETTLEMENT'
  | 'NO_COMMON_LAW_EXCHANGE';

export type ScenarioTruthState =
  | 'SIMULATED'
  | 'FICTIONAL'
  | 'UNVERIFIED'
  | 'CONDITIONAL'
  | 'JURISDICTION_RESTRICTED'
  | 'RESEARCH_ONLY';

export interface FutureFinanceScenario {
  id: string;
  name: string;
  domain: FutureFinanceDomain | SpeculativeFinanceDomain;
  truthState: ScenarioTruthState;
  assumptions: string[];
  evidenceRefs: string[];
  unknowns: string[];
  risks: string[];
  reversibility: 'FULL' | 'PARTIAL' | 'NONE';
  settlementDelaySeconds?: number;
  jurisdiction?: string;
  humanApprovalRequired: true;
  sealLevel: 4 | 5;
  productionEligible: false;
}

export interface ValueGrammar {
  units: string[];
  scarcityModel: string;
  ownershipModel: string;
  transferModel: string;
  consentModel: string;
  settlementModel: string;
  timeModel: string;
  languageModel?: string;
  knownUnknowns: string[];
}

export function assertResearchOnlyScenario(scenario: FutureFinanceScenario): void {
  if (scenario.productionEligible !== false) {
    throw new Error('Scenario cannot be production-enabled');
  }

  const allowed: ScenarioTruthState[] = [
    'SIMULATED', 'FICTIONAL', 'UNVERIFIED', 'CONDITIONAL',
    'JURISDICTION_RESTRICTED', 'RESEARCH_ONLY'
  ];

  if (!allowed.includes(scenario.truthState)) {
    throw new Error('Scenario requires a research truth state');
  }
}
