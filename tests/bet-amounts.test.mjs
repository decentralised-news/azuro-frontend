import assert from 'node:assert/strict'
import { test } from 'node:test'
import { getBetPreviewPayout, getRecordedBetPayout } from '../src/helpers/betAmounts.ts'


const preview = (overrides = {}) => getBetPreviewPayout({
  amount: '1',
  totalOdds: 1.5,
  decimals: 6,
  ...overrides,
})

test('a normal stake keeps its gross possible payout', () => {
  assert.equal(preview(), '1.5')
})

test('a freebet previews the bettor share for explicit and missing returnable flags', () => {
  for (const flag of [ true, null, undefined ]) {
    assert.equal(preview({ freebet: { params: { isSponsoredBetReturnable: flag } } }), '0.5')
  }

  assert.equal(preview({ freebet: { params: { isSponsoredBetReturnable: false } } }), '1.5')
})

test('a freebet returns nothing to the bettor when the gross payout does not exceed its stake', () => {
  for (const flag of [ true, false, null, undefined ]) {
    for (const totalOdds of [ 0, 0.9, 1 ]) {
      assert.equal(preview({ totalOdds, freebet: { params: { isSponsoredBetReturnable: flag } } }), '0')
    }
  }
})

test('small freebet wins retain token precision without floating-point subtraction loss', () => {
  for (const decimals of [ 6, 18 ]) {
    assert.equal(preview({
      amount: '0.1',
      totalOdds: 1.2,
      decimals,
      freebet: { params: { isSponsoredBetReturnable: true } },
    }), '0.02')
  }

  assert.equal(preview({ amount: '1', totalOdds: 1.123456789123, decimals: 18 }), '1.123456789123')
})

test('the preview truncates a stake to token decimals as the SDK does at submission', () => {
  assert.equal(preview({ amount: '1.0000009', totalOdds: 2 }), '2')
})

test('large finite combo odds produce a preview without scientific-notation parse errors', () => {
  assert.equal(preview({ totalOdds: 1e21 }), '1000000000000000000000')
  assert.equal(preview({
    totalOdds: 1e21,
    freebet: { params: { isSponsoredBetReturnable: true } },
  }), '999999999999999999999')
})

test('an empty or incomplete betslip never renders NaN or throws', () => {
  for (const amount of [ '', '.', '-', '-1', 'invalid' ]) {
    assert.equal(preview({ amount }), '0')
  }

  for (const totalOdds of [ NaN, Infinity, 0 ]) {
    assert.equal(preview({ totalOdds }), '0')
  }
})

test('redeeming a settled bet does not replace its recorded return with the original potential win', () => {
  const beforeRedemption = { settledPayout: 15, payout: 15, possibleWin: 30 }
  const afterRedemption = { ...beforeRedemption, payout: null }

  assert.equal(getRecordedBetPayout(beforeRedemption), 15)
  assert.equal(getRecordedBetPayout(afterRedemption), 15)
})

test('a recorded zero remains zero even if another amount or potential win is positive', () => {
  assert.equal(getRecordedBetPayout({ settledPayout: 0, payout: 15, possibleWin: 30 }), 0)
  assert.equal(getRecordedBetPayout({ settledPayout: null, payout: 0, possibleWin: 30 }), 0)
})

test('SDK freebet returns are already adjusted and are displayed without a second stake deduction', () => {
  assert.equal(getRecordedBetPayout({ amount: '1', freebetId: 'test-freebet', settledPayout: 0.5, payout: null }), 0.5)
})

test('a missing recorded return stays unknown rather than claiming that a potential win was received', () => {
  assert.equal(getRecordedBetPayout({ settledPayout: null, payout: null, possibleWin: 30 }), null)
})
