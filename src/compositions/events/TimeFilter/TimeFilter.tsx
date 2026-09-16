import React, { createContext, useContext, useState } from 'react'
import cx from 'classnames'
import { Message } from '@locmod/intl'
import dayjs from 'dayjs'

import messages from './messages'


export type FilterByTime = 'all' | 'today' | 'tomorrow' | '1h' | '3h' | '6h'

type State = {
  filterByTime: FilterByTime
  setFilterByTime: (filterByTime: FilterByTime) => void
  resetFilterByTime: () => void
}

const Context = createContext<State | null>(null)

export const useFilterByTime = () => useContext(Context) as State


export const FilterByTimeProvider: React.CFC = ({ children }) => {
  const [ filterByTime, setFilterByTime ] = useState<FilterByTime>('all')

  const handleChangeFilter = (filterByTime: FilterByTime) => {
    setFilterByTime(filterByTime)
  }

  const handleResetFilter = () => {
    handleChangeFilter('all')
  }

  const state: State = {
    filterByTime,
    setFilterByTime: handleChangeFilter,
    resetFilterByTime: handleResetFilter,
  }

  return (
    <Context.Provider value={state}>
      {children}
    </Context.Provider>
  )
}

type Games = {
  [key: string]: any
  startsAt: string
}[]

export const filterGamesByTime = <T extends Games>(games: T, filterByTime: FilterByTime): T => {
  if (filterByTime === 'all') {
    return games
  }

  const hour = 60 * 60 * 1000
  let start
  let end

  if (filterByTime === 'today') {
    end = dayjs().endOf('day')
  }
  else if (filterByTime === 'tomorrow') {
    start = dayjs().endOf('day')
    end = dayjs().add(1, 'day').endOf('day')
  }
  else if (filterByTime === '1h') {
    end = Date.now() + hour
  }
  else if (filterByTime === '3h') {
    end = Date.now() + 3 * hour
  }
  else if (filterByTime === '6h') {
    end = Date.now() + 6 * hour
  }

  return games.filter(({ startsAt }) => {
    const startDate = +startsAt * 1000

    if (start && end) {
      return startDate >= +start && startDate <= +end
    }

    return startDate <= +end
  }) as T
}

const items: { title: Intl.Message, value: FilterByTime }[] = [
  {
    title: messages.all,
    value: 'all',
  },
  {
    title: messages.today,
    value: 'today',
  },
  {
    title: messages.tomorrow,
    value: 'tomorrow',
  },
  {
    title: messages['1h'],
    value: '1h',
  },
  {
    title: messages['3h'],
    value: '3h',
  },
  {
    title: messages['6h'],
    value: '6h',
  },
]

type TimeFilterProps = {
  className?: string
}

const TimeFilter: React.FC<TimeFilterProps> = ({ className }) => {
  const { filterByTime, setFilterByTime } = useFilterByTime()

  return (
    <div
      className={cx('flex items-center gap-1 p-1 bg-grey-10 rounded-ssm overflow-x-auto no-scrollbar', className)}
      role="tablist"
      aria-label="Filter events by start time"
    >
      {
        items.map(({ title, value }) => {
          const isActive = value === filterByTime

          const className = cx('h-8 px-2.5 flex items-center whitespace-nowrap text-caption-13 font-medium rounded-ssm transition-colors cursor-pointer', {
            'text-grey-60 hover:text-grey-90': !isActive,
            'text-white bg-navy-900 shadow-sm': isActive,
          })

          return (
            <button
              key={value}
              type="button"
              className={className}
              role="tab"
              aria-selected={isActive}
              onClick={() => setFilterByTime(value)}
            >
              <Message value={title} />
            </button>
          )
        })
      }
    </div>
  )
}

export default TimeFilter
