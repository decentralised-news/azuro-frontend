'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { Message } from '@locmod/intl'
import { useBaseBetslip, useLive } from '@azuro-org/sdk'
import { openModal } from '@locmod/modal'
import dynamic from 'next/dynamic'
import cx from 'classnames'

import { Icon, type IconName } from 'components/ui'
import { Href } from 'components/navigation'
import MobileStatisticsButton from 'compositions/MobileStatisticsButton/MobileStatisticsButton'

import messages from './messages'


const BetslipModal = dynamic(() => import('../MobileBetslipButton/components/BetslipModal/BetslipModal'))

type NavItemProps = {
  icon: IconName
  label: Intl.Message
  isActive: boolean
  badge?: number
  to?: string
  onClick?: () => void
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, badge, to, onClick }) => {
  const className = cx(
    'relative flex-1 flex flex-col items-center justify-center gap-1 py-2 text-caption-12 transition-colors select-none',
    {
      'text-white': isActive,
      'text-grey-60': !isActive,
    }
  )

  const content = (
    <>
      <span className="relative">
        <Icon className="size-6" name={icon} />
        {
          Boolean(badge) && (
            <span className="absolute -top-1.5 -right-2 min-w-5 h-5 px-1 rounded-full bg-brand-50 text-white text-caption-12 font-bold flex items-center justify-center">
              {badge}
            </span>
          )
        }
      </span>
      <Message value={label} />
    </>
  )

  if (to) {
    return (
      <Href to={to} className={className} onClick={onClick}>
        {content}
      </Href>
    )
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {content}
    </button>
  )
}

const MobileBottomNav: React.FC = () => {
  const pathname = usePathname()
  const { items } = useBaseBetslip()
  const { isLive, changeLive } = useLive()

  const isHome = pathname === '/'
  const isProfile = pathname.startsWith('/profile')

  const handleLiveClick = () => {
    if (!isLive) {
      changeLive(true)
    }
  }

  const handleHomeClick = () => {
    if (isLive) {
      changeLive(false)
    }
  }

  return (
    <>
      <div className="fixed left-1/2 -translate-x-1/2 bottom-24 z-[40]">
        <MobileStatisticsButton />
      </div>

      <nav
        className="fixed bottom-0 left-0 right-0 z-[80] bg-navy-900 border-t border-white/10 pb-[env(safe-area-inset-bottom)]"
        aria-label="Bottom"
      >
        <div className="flex items-stretch max-w-[30rem] mx-auto">
          <NavItem
            icon="interface/top"
            label={messages.home}
            isActive={isHome && !isLive}
            to="/"
            onClick={handleHomeClick}
          />
          <NavItem
            icon="interface/live"
            label={messages.live}
            isActive={isHome && isLive}
            to="/"
            onClick={handleLiveClick}
          />
          <NavItem
            icon="interface/search"
            label={messages.search}
            isActive={false}
            onClick={() => openModal('SearchModal')}
          />
          <NavItem
            icon="interface/betslip"
            label={{ en: 'Betslip' }}
            isActive={false}
            badge={items.length}
            onClick={() => openModal('BetslipModal')}
          />
          <NavItem
            icon="interface/mybets"
            label={messages.myBets}
            isActive={isProfile}
            to="/profile"
          />
        </div>
      </nav>

      <BetslipModal />
    </>
  )
}

export default MobileBottomNav
