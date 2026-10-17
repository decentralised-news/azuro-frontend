import assert from 'node:assert/strict'
import test from 'node:test'
import {
  ConditionState,
  OutcomeState,
  groupConditionsByMarket,
} from '@azuro-org/toolkit'

// Synthetic feed fixtures follow ConditionDetailedData. Extended outcome IDs are
// deliberately outside the dictionaries: these names must come from the API.
const game = { gameId: '1006000000000077484167', sport: { sportId: '33' } }

function extendedCondition(conditionId, overrides = {}) {
  return {
    id: conditionId,
    conditionId,
    game,
    title: 'Player shots on target',
    marketId: '204',
    marketVarietyId: '1',
    category: 'players',
    sort: '20',
    state: ConditionState.Active,
    hidden: false,
    margin: '0.05',
    isExpressForbidden: true,
    isPrematchEnabled: true,
    isLiveEnabled: true,
    wonOutcomeIds: [],
    outcomes: [
      {
        outcomeId: '900000000000102',
        title: 'Under 1.5',
        odds: '2.10',
        sort: '2',
        point: '1.5',
        hidden: true,
        state: OutcomeState.Stopped,
      },
      {
        outcomeId: '900000000000101',
        title: 'Over 1.5',
        odds: '1.85',
        sort: '1',
        point: '1.5',
        hidden: false,
        state: OutcomeState.Active,
      },
    ],
    ...overrides,
  }
}

function legacyCondition() {
  const conditionId = '1001000000000000000000000000001'

  return {
    id: conditionId,
    conditionId,
    game,
    title: 'null',
    category: 'yes_no',
    sort: '10',
    state: ConditionState.Active,
    hidden: false,
    margin: '0.04',
    isExpressForbidden: false,
    isPrematchEnabled: true,
    isLiveEnabled: true,
    wonOutcomeIds: [],
    outcomes: [
      { outcomeId: '2', title: 'null', odds: '2.05', sort: '1', hidden: false, state: OutcomeState.Active },
      { outcomeId: '1', title: '', odds: '1.75', sort: '2', hidden: false, state: OutcomeState.Active },
    ],
  }
}

for (const conditionId of [
  '5001000000000000000000000000001',
  '6001000000000000000000000000001',
]) {
  test(`extended ${conditionId[0]} markets retain API names and selectable outcome data`, () => {
    const source = extendedCondition(conditionId)
    const markets = groupConditionsByMarket([source])

    assert.equal(markets.length, 1)
    assert.equal(markets[0].name, 'Player shots on target')
    assert.equal(markets[0].conditions.length, 1)

    const condition = markets[0].conditions[0]
    assert.equal(condition.conditionId, conditionId)
    assert.equal(condition.state, ConditionState.Active)
    assert.equal(condition.isExpressForbidden, true)
    assert.deepEqual(condition.outcomes, [
      {
        conditionId,
        outcomeId: '900000000000101',
        selectionName: 'Over 1.5',
        odds: 1.85,
        gameId: game.gameId,
        isExpressForbidden: true,
        hidden: false,
        state: OutcomeState.Active,
      },
      {
        conditionId,
        outcomeId: '900000000000102',
        selectionName: 'Under 1.5',
        odds: 2.1,
        gameId: game.gameId,
        isExpressForbidden: true,
        hidden: true,
        state: OutcomeState.Stopped,
      },
    ])
  })
}

test('a market list can display legacy, old extended and new extended markets together', () => {
  const legacy = legacyCondition()
  const oldExtended = extendedCondition('5001000000000000000000000000001')
  const newExtended = extendedCondition('6001000000000000000000000000001', {
    title: 'Away player shots on target',
    marketVarietyId: '2',
  })
  const markets = groupConditionsByMarket([newExtended, legacy, oldExtended])
  const byConditionId = new Map(markets.flatMap(market => (
    market.conditions.map(condition => [condition.conditionId, { market, condition }])
  )))

  assert.equal(markets.length, 3)
  assert.equal(byConditionId.size, 3)
  assert.equal(byConditionId.get(oldExtended.conditionId).market.name, 'Player shots on target')
  assert.equal(byConditionId.get(newExtended.conditionId).market.name, 'Away player shots on target')

  // Known dictionary outcomes 1/2 have no supplied names. Their labels and
  // dictionary ordering must remain intact when extended markets are present.
  const legacyResult = byConditionId.get(legacy.conditionId)
  assert.equal(legacyResult.market.name, 'Both Teams To Score')
  assert.deepEqual(legacyResult.condition.outcomes.map(outcome => ({
    outcomeId: outcome.outcomeId,
    name: outcome.selectionName,
    odds: outcome.odds,
  })), [
    { outcomeId: '1', name: 'Yes', odds: 1.75 },
    { outcomeId: '2', name: 'No', odds: 2.05 },
  ])
})

test('old and new extended IDs in the same market retain both sets of selections', () => {
  const firstLine = extendedCondition('5001000000000000000000000000001')
  const secondLine = extendedCondition('6001000000000000000000000000002', {
    outcomes: [
      { outcomeId: '900000000000103', title: 'Over 2.5', odds: '3.20', sort: '3', point: '2.5', hidden: false, state: OutcomeState.Active },
      { outcomeId: '900000000000104', title: 'Under 2.5', odds: '1.30', sort: '4', point: '2.5', hidden: false, state: OutcomeState.Active },
    ],
  })
  const markets = groupConditionsByMarket([secondLine, firstLine])

  assert.equal(markets.length, 1)
  assert.equal(markets[0].name, 'Player shots on target')
  assert.deepEqual(markets[0].conditions.map(condition => ({
    conditionId: condition.conditionId,
    selections: condition.outcomes.map(outcome => outcome.selectionName),
  })), [
    { conditionId: firstLine.conditionId, selections: ['Over 1.5', 'Under 1.5'] },
    { conditionId: secondLine.conditionId, selections: ['Over 2.5', 'Under 2.5'] },
  ])
})
