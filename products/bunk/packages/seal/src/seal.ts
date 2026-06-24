export type SealLevel = 'SEAL_0' | 'SEAL_1' | 'SEAL_2' | 'SEAL_3' | 'SEAL_4';

export const highImpactActions = new Set([
  'property.verify',
  'listing.publish',
  'agreement.approve',
  'agreement.sign',
  'payment.release',
  'investment.subscribe',
  'case.decide',
  'proof.publish',
  'document.release'
]);

export function requiredSealFor(action: string): SealLevel {
  if (highImpactActions.has(action)) return 'SEAL_3';
  if (action.startsWith('admin.') || action.includes('payment')) return 'SEAL_3';
  if (action.includes('ai.') || action.includes('search')) return 'SEAL_2';
  return 'SEAL_1';
}

export function aiCanExecute(action: string): boolean {
  return !highImpactActions.has(action) && !action.includes('approve') && !action.includes('reject') && !action.includes('release');
}

export function assertHumanSeal(action: string, approved: boolean) {
  const required = requiredSealFor(action);
  if ((required === 'SEAL_3' || required === 'SEAL_4') && !approved) {
    throw new Error(`Human ${required} approval is required for ${action}.`);
  }
}
