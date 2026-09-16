'use client'

import React from 'react'
import { Message } from '@locmod/intl'
import { useLive } from '@azuro-org/sdk'
import cx from 'classnames'

import { LiveDot } from 'components/ui'

import messages from './messages'


const LiveSwitcher: React.FC<{className?: string}> = ({ className }) => {
  const { isLive, changeLive } = useLive()

  const itemClassName = (isActive: boolean, isLiveItem = false) => cx(
    'flex-1 h-9 px-3 rounded-ssm flex items-center justify-center text-caption-13 font-semibold transition-colors select-none cursor-pointer',
    {
      'text-white bg-navy-800': isActive && !isLiveItem,
      'text-accent-red bg-accent-red/15': isActive && isLiveItem,
      'text-grey-60 hover:text-white': !isActive,
    }
  )

  return (
    <div
      className={cx('flex items-center gap-1 p-1 bg-white/5 border border-white/10 rounded-ssm', className)}
      role="tablist"
      aria-label="Event type"
    >
      <button
        type="button"
        className={itemClassName(!isLive)}
        role="tab"
        aria-selected={!isLive}
        onClick={() => changeLive(false)}
      >
        <Message value={messages.all} />
      </button>
      <button
        type="button"
        className={itemClassName(isLive, true)}
        role="tab"
        aria-selected={isLive}
        onClick={() => changeLive(true)}
      >
        <LiveDot className="mr-1.5" />
        <Message value={messages.live} />
      </button>
    </div>
  )
}

export default LiveSwitcher
