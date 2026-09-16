import React from 'react'
import { constants } from 'helpers'


const currentYear = new Date().getFullYear()

const Copy: React.FC = () => {
  return (
    <div className="flex mb:flex-col mb:items-start items-center justify-between gap-2">
      <div className="text-grey-60 text-caption-12">
        {`©${currentYear} ${constants.companyName} — Powered by Azuro`}
      </div>
      <div className="text-grey-60 text-caption-12">18+ · Play responsibly. Wager the Smart Way.</div>
    </div>
  )
}

export default Copy
