'use client'

import { useParams } from 'next/navigation'
import React from 'react'
import { Message } from '@locmod/intl'
import { useLive } from '@azuro-org/sdk'
import cx from 'classnames'

import { Icon, type IconName } from 'components/ui'
import TimeFilter, { FilterByTimeProvider } from 'compositions/events/TimeFilter/TimeFilter'
import ChangeOddsView from 'compositions/ChangeOddsView/ChangeOddsView'

import messages from './messages'


export const NavbarSkeleton: React.FC = () => {
  return (
    <div className="border-b border-grey-10 ds:px-4 mb:px-3 py-3 flex items-center">
      <div className="bone size-6 rounded-full mr-3" />
      <div className="bone rounded-full h-8 w-32" />
    </div>
  )
}

const Navbar: React.CFC = ({ children }) => {
  const { isLive } = useLive()
  const params = useParams()

  const sportSlug = params.sportSlug as string || 'top'
  const icon: IconName = sportSlug === 'top' ? 'interface/top' : `sport/${sportSlug}` as IconName
  const isTimeFilterVisible = !isLive && sportSlug !== 'unique'

  const className = cx('-mx-2 border-b border-grey-10 ds:px-4 mb:px-3 flex mb:flex-col ds:items-center justify-between ds:sticky ds:top-16 z-20 bg-surface', {
    'py-3': !isTimeFilterVisible,
    'py-2.5': isTimeFilterVisible,
  })

  return (
    <FilterByTimeProvider>
      <div className={className}>
        <div className="flex items-center gap-2">
          <div className="size-8 flex items-center justify-center rounded-ssm bg-brand-50/10 text-brand-50">
            <Icon className="size-5" name={icon} />
          </div>
          <Message className="text-heading-h3 font-bold capitalize" value={messages[sportSlug] || sportSlug} />
        </div>
        <div className="flex items-center gap-2 mb:mt-2">
          {
            isTimeFilterVisible && (
              <TimeFilter className="ds:h-14 mb:h-10" />
            )
          }
          <ChangeOddsView />
        </div>
      </div>
      {children}
    </FilterByTimeProvider>
  )
}

export default Navbar
