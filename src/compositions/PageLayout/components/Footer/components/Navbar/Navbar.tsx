'use client'

import React from 'react'
import { Message } from '@locmod/intl'
import { useLive } from '@azuro-org/sdk'
import { constants } from 'helpers'
import { Href } from 'components/navigation'

import messages from './messages'


type Link = {
  text: Intl.Message
  to?: string
  href?: string
  onClick?: () => void
}

const Navbar: React.FC = () => {
  const { isLive, changeLive } = useLive()

  const handleLiveClick = () => {
    if (!isLive) {
      changeLive(true)
    }
  }

  const columns: {
    title: Intl.Message
    links: Link[]
  }[] = [
    {
      title: messages.product,
      links: [
        { text: messages.sports, to: '/' },
        { text: messages.live, to: '/', onClick: handleLiveClick },
        { text: messages.myBets, to: '/profile' },
      ],
    },
    {
      title: messages.company,
      links: [
        { text: messages.about, href: constants.links.docs },
        { text: messages.faq, href: constants.links.faq },
      ],
    },
    {
      title: messages.legal,
      links: [
        { text: messages.terms, href: constants.links.terms },
        { text: messages.policy, href: constants.links.policy },
        { text: messages.responsible, href: constants.links.faq },
      ],
    },
  ]

  const linkClassName = 'text-caption-13 text-grey-70 hover:text-white hover:underline transition-colors'

  return (
    <div className="flex mb:flex-col gap-8">
      {
        columns.map(column => (
          <div key={column.title.en}>
            <Message className="text-caption-12 uppercase tracking-wider text-grey-60 font-semibold mb-2 block" value={column.title} />
            <div className="space-y-1.5">
              {
                column.links.map(link => {
                  if (link.to) {
                    return (
                      <Href
                        key={link.text.en}
                        to={link.to}
                        className={linkClassName}
                        onClick={link.onClick}
                      >
                        {link.text.en}
                      </Href>
                    )
                  }

                  return (
                    <a
                      key={link.text.en}
                      className={linkClassName}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.text.en}
                    </a>
                  )
                })
              }
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Navbar
