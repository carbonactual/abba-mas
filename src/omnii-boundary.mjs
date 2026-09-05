const CONSEQUENTIAL = new Set(['execution.commit','execution.deploy','execution.send','execution.transfer','execution.settle','execution.mint','execution.delete','authority.issue'])

export function classifyMasAction({ capabilityRef, authorityRef = null, evidenceRefs = [], requiresHuman = false } = {}) {
  if (!capabilityRef) throw new Error('capabilityRef is required')
  const consequential = Boolean(requiresHuman) || CONSEQUENTIAL.has(capabilityRef)
  return {
    consequential,
    allowed: !consequential || Boolean(authorityRef),
    reason: consequential && !authorityRef ? 'authority-required' : consequential ? 'authority-supplied' : 'capability-only',
    authorityRef,
    evidenceRefs: [...evidenceRefs],
    canIssueAuthority: false,
    canChangeConstitution: false,
  }
}
