import { useChain, useDetailedBetslip, BetslipDisableReason } from '@azuro-org/sdk'
import React from 'react'
import { toLocaleString } from 'helpers'

import { Input } from 'components/inputs'


type AmountInputProps = {
  isEnoughBalance: boolean
}

const AmountInput: React.FC<AmountInputProps> = ({ isEnoughBalance }) => {
  const { appChain, betToken } = useChain()
  const { betAmount, changeBetAmount, disableReason, minBet, maxBet } = useDetailedBetslip()

  const isError = !isEnoughBalance || [
    BetslipDisableReason.BetAmountGreaterThanMaxBet,
    BetslipDisableReason.BetAmountLowerThanMinBet,
  ].includes(disableReason!)

  return (
    <div>
      <Input
        className="rounded-ssm"
        type="number"
        value={betAmount}
        placeholder="0.00"
        rightNode={
          <span className="ml-2 flex-none text-caption-13 font-semibold text-grey-60">{betToken.symbol}</span>
        }
        onChange={changeBetAmount}
        isError={isError}
      />
      <div className="flex items-center justify-between mt-1 px-1 text-caption-12 text-grey-60">
        <span>
          Min {toLocaleString(minBet || 0, { digits: 2 })}
        </span>
        <span>
          Max {toLocaleString(maxBet || 0, { digits: 2 })}
        </span>
      </div>
    </div>
  )
}

export default AmountInput
