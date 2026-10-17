import { calcFreebetBettorShare, ODDS_DECIMALS } from '@azuro-org/toolkit'
import { formatUnits, parseUnits } from 'viem'


type BetPreviewParams = {
  amount: string
  totalOdds: number
  decimals: number
  freebet?: {
    params: {
      isSponsoredBetReturnable?: boolean | null
    }
  } | null
}

// This is an estimate for an unplaced bet. SDK history figures already contain the
// bettor's share and must never be passed through the freebet calculation again.
export const getBetPreviewPayout = ({ amount, totalOdds, decimals, freebet }: BetPreviewParams): string => {
  if (!/^(?:\d+\.?\d*|\.\d+)$/.test(amount) || !Number.isFinite(totalOdds) || totalOdds <= 0) {
    return '0'
  }

  // Match the SDK's stake truncation and keep the multiplication in token base
  // units, avoiding floating-point subtraction errors for small freebet wins.
  const [ whole, fraction = '' ] = amount.split('.')
  const rawAmount = parseUnits(`${whole || '0'}.${fraction.slice(0, decimals)}`, decimals)
  const decimalOdds = totalOdds.toLocaleString('en-US', { useGrouping: false, maximumFractionDigits: ODDS_DECIMALS })
  const rawOdds = parseUnits(decimalOdds, ODDS_DECIMALS)
  const rawPayout = rawAmount * rawOdds / 10n ** BigInt(ODDS_DECIMALS)
  const payout = freebet ? calcFreebetBettorShare({
    payout: rawPayout,
    amount: rawAmount,
    isAmountReturnable: freebet.params.isSponsoredBetReturnable,
  }) : rawPayout

  return formatUnits(payout, decimals)
}

type RecordedPayout = {
  settledPayout?: number | null
  payout?: number | null
}

// settledPayout survives redemption and reflects voided legs. A potential win
// is not evidence of an actual return, and a recorded zero must stay zero.
export const getRecordedBetPayout = ({ settledPayout, payout }: RecordedPayout): number | null => (
  settledPayout ?? payout ?? null
)
