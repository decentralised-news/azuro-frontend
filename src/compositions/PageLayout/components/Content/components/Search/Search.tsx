'use client'

import { Message } from '@locmod/intl'
import React from 'react'
import { openModal } from '@locmod/modal'
import { Icon } from 'components/ui'

import messages from './messages'


const Search: React.FC = () => {
  return (
    <div
      className="h-14 w-full flex items-center gap-3 text-grey-60 hover:text-grey-90 px-4 border-b border-grey-10 bg-surface cursor-pointer transition-colors wd:rounded-t-md"
      role="search"
      onClick={() => openModal('SearchModal')}
    >
      <Icon className="size-5 flex-none" name="interface/search" />
      <Message className="text-caption-13" value={messages.title} />
      <span className="ml-auto hidden ds:inline-flex items-center h-6 px-1.5 rounded-ssm border border-grey-10 text-caption-12 text-grey-40">
        ⌘K
      </span>
    </div>
  )
}

export default Search
