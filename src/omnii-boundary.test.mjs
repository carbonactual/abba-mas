import test from 'node:test'
import assert from 'node:assert/strict'
import { classifyMasAction } from './omnii-boundary.mjs'

test('ABBA MAS cannot execute consequential work without authority', () => {
  const result = classifyMasAction({ capabilityRef: 'execution.deploy' })
  assert.equal(result.allowed, false)
  assert.equal(result.reason, 'authority-required')
})

test('ABBA MAS remains a capability fabric, not an authority issuer', () => {
  const result = classifyMasAction({ capabilityRef: 'workflow.route', authorityRef: 'authority:1' })
  assert.equal(result.allowed, true)
  assert.equal(result.canIssueAuthority, false)
  assert.equal(result.canChangeConstitution, false)
})
