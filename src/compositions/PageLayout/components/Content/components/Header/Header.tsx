'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Message } from '@locmod/intl'
import { useLive } from '@azuro-org/sdk'
import { openModal } from '@locmod/modal'
import { usePrivy } from '@privy-io/react-auth'
import { useWallet } from 'wallet'
import cx from 'classnames'
import { useFreezeBodyScroll } from 'hooks'

import { Icon, Logo } from 'components/ui'
import { Button, buttonMessages } from 'components/inputs'
import { Href } from 'components/navigation'
import Navigation from 'compositions/Navigation/Navigation'
import LiveSwitcher from 'compositions/LiveSwitcher/LiveSwitcher'

import Controls from '../Controls/Controls'

import messages from './messages'


type NavItemProps = {
  label: Intl.Message
  isActive: boolean
  to?: string
  onClick?: () => void
}

const NavItem: React.FC<NavItemProps> = ({ label, isActive, to, onClick }) => {
  const className = cx(
    'relative h-16 flex items-center px-3 text-caption-14 font-semibold transition-colors select-none',
    {
      'text-white': isActive,
      'text-grey-60 hover:text-white': !isActive,
    }
  )
  const content = (
    <>
      <Message value={label} />
      {
        isActive && (
          <span className="absolute bottom-0 left-3 right-3 h-[3px] rounded-t-full bg-brand-50" />
        )
      }
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

const MobileNavDrawer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKey)

    return () => document.removeEventListener('keydown', handleKey)
  }, [ onClose ])

  return (
    <>
      <div className="fixed inset-0 top-16 z-[90] bg-navy-950/70" onClick={onClose} aria-hidden="true" />
      <div className="fixed top-16 bottom-0 left-0 z-[95] w-full max-w-[20rem] bg-navy-900 border-r border-white/10 overflow-y-auto no-scrollbar scb-scroll pb-8">
        <div className="p-3">
          <LiveSwitcher />
        </div>
        <Navigation />
      </div>
    </>
  )
}

const Header: React.FC = () => {
  const { account, isReconnecting, isConnecting } = useWallet()
  const { login } = usePrivy()
  const { isLive, changeLive } = useLive()
  const pathname = usePathname()
  const [ isMenuVisible, setMenuVisible ] = useState(false)

  useFreezeBodyScroll(isMenuVisible)

  useEffect(() => {
    setMenuVisible(false)
  }, [ pathname ])

  const isHome = pathname === '/'
  const isProfile = pathname.startsWith('/profile')

  const handleSportsClick = () => {
    if (isLive) {
      changeLive(false)
    }
  }

  const handleLiveClick = () => {
    if (!isLive) {
      changeLive(true)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-[100] h-16 bg-navy-900 border-b border-white/10">
        <div className="mx-auto h-full max-w-[1680px] px-3 ds:px-5 flex items-center gap-3">
          <button
            type="button"
            className="ds:hidden -ml-1 p-2 text-grey-70 hover:text-white transition-colors"
            aria-label={isMenuVisible ? 'Close navigation' : 'Open navigation'}
            onClick={() => setMenuVisible(v => !v)}
          >
            <Icon className="size-6" name={isMenuVisible ? 'interface/close' : 'interface/burger_menu'} />
          </button>

          <Logo className="h-6 ds:h-7 w-auto shrink-0" />

          <nav className="hidden ds:flex items-center h-full" aria-label="Primary">
            <NavItem
              label={messages.sports}
              isActive={isHome && !isLive}
              to="/"
              onClick={handleSportsClick}
            />
            <NavItem
              label={messages.live}
              isActive={isHome && isLive}
              to="/"
              onClick={handleLiveClick}
            />
            <NavItem label={messages.myBets} isActive={isProfile} to="/profile" />
          </nav>

          <div className="flex items-center ml-auto space-x-2">
            <button
              type="button"
              className="hidden ds:flex items-center h-9 w-56 px-3 rounded-min bg-white/5 border border-white/10 text-grey-60 hover:text-white transition-colors"
              onClick={() => openModal('SearchModal')}
            >
              <Icon className="size-4 mr-2 flex-none" name="interface/search" />
              <span className="text-caption-13 text-ellipsis whitespace-nowrap overflow-hidden">{messages.search.en}</span>
            </button>

            <button
              type="button"
              className="ds:hidden p-2 text-grey-70 hover:text-white transition-colors"
              aria-label="Search"
              onClick={() => openModal('SearchModal')}
            >
              <Icon className="size-5" name="interface/search" />
            </button>

            {
              Boolean(account) ? (
                <Controls />
              ) : (
                <Button
                  className="h-9"
                  title={buttonMessages.connectWallet}
                  size={32}
                  loading={isConnecting || isReconnecting}
                  onClick={login}
                />
              )
            }
          </div>
        </div>
      </header>

      {
        isMenuVisible && (
          <MobileNavDrawer onClose={() => setMenuVisible(false)} />
        )
      }
    </>
  )
}

export default Header
