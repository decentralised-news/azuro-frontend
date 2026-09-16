'use client'

import React, { useRef } from 'react'
import { type GameData, type MarketOutcome } from '@azuro-org/toolkit'
import cx from 'classnames'

import { Icon } from 'components/ui'
import OddsValue from 'compositions/OddsValue/OddsValue'

import useButton from './utils/useButton'


type OutcomeButtonProps = {
  marketName: string
  outcome: MarketOutcome
  game: GameData
  isLocked: boolean
  size?: 28 | 40
}

const OutcomeButton: React.FC<OutcomeButtonProps> = (props) => {
  const { marketName, outcome, game, isLocked, size = 28 } = props
  const { selectionName } = outcome

  const nodeRef = useRef<HTMLDivElement>(null)
  const { odds, isActive, onClick } = useButton({ marketName, outcome, game, nodeRef })

  const buttonClassName = cx(
    'group/button relative flex items-center justify-between gap-2 w-full',
    'px-2 ds:px-3 text-caption-13 font-semibold rounded-ssm border transition-colors duration-150 select-none',
    'disabled:cursor-not-allowed',
    {
      'h-7': size === 28,
      'h-10': size === 40,
      // locked / suspended
      'bg-grey-10 border-grey-10 text-grey-40': isLocked,
      // selected
      'bg-brand-50/5 border-brand-50 text-brand-50 hover:bg-brand-50/10': isActive && !isLocked,
      // default
      'bg-surface-subtle border-grey-10 text-grey-90 hover:bg-surface-muted hover:border-grey-40': !isActive && !isLocked,
    }
  )
  const titleClassName = cx('text-left whitespace-normal leading-tight', {
    'text-grey-40': isLocked,
    'text-brand-50': isActive && !isLocked,
    'text-grey-60': !isActive && !isLocked,
  })
  const oddsClassName = cx('group/odds flex items-center flex-none tabular-nums')
  const arrowClassName = cx(
    'size-4 text-transparent transition-color',
    'group-[.increased]/odds:text-accent-green',
    'group-[.decreased]/odds:text-accent-red group-[.decreased]/odds:rotate-180'
  )
  const valueClassName = cx(
    'transition-colors',
    'group-[.increased]/odds:text-accent-green',
    'group-[.decreased]/odds:text-accent-red'
  )

  return (
    <button
      className={buttonClassName}
      disabled={isLocked}
      aria-pressed={isActive}
      onClick={onClick}
    >
      <span className="flex items-center min-w-0">
        {
          isLocked && (
            <Icon
              className="mr-1.5 size-4 flex-none text-grey-40"
              name="interface/lock"
            />
          )
        }
        <span className={titleClassName}>
          {selectionName}
        </span>
      </span>
      <span ref={nodeRef} className={oddsClassName}>
        <Icon className={arrowClassName} name="interface/caret_up" />
        <OddsValue className={valueClassName} odds={odds} />
      </span>
    </button>
  )
}

export default OutcomeButton
