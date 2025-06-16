/* eslint-disable */
'use client'

import React, { useEffect, useState } from 'react'
import { Icon } from 'components/ui'

interface BettingTip {
  id: number
  league: string
  match: string
  tip: string
  odds: string
  time: string
  confidence: number
  date: string
}

interface ApiResponse {
  message: string
  data: BettingTip[]
  count: number
  page: number
  pageSize: number
  total: number
}

const BettingTips = () => {
  const [tips, setTips] = useState<BettingTip[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await fetch(
          'https://decntralisedapi.onrender.com/api/betting-tips?page=1&pageSize=50'
        )
        if (!response.ok) {
          throw new Error('Failed to fetch betting tips')
        }
        const data: ApiResponse = await response.json()
        setTips(data.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchTips()
  }, [])

  const renderStars = (count: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Icon
            key={i}
            name="interface/win"
            className={`w-2.5 h-2.5 ${i < count ? 'text-brand-50' : 'text-grey-30'}`}
          />
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-50"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-grey-10 text-grey-70 p-4 rounded-lg">
        <p>Error loading tips: {error}</p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-hidden flex flex-col mt-6">
      {/* Compact Header */}
      <div className="grid grid-cols-12 bg-grey-10 p-2 text-[10px] font-semibold text-grey-70 tracking-tight">
        <div className="col-span-4 px-1">Match</div>
        <div className="col-span-3 px-1">Tip</div>
        <div className="col-span-3 px-1 text-right">Odds</div>
        <div className="col-span-2 px-1 text-right">Time</div>
      </div>

      {/* Scrollable Tips List */}
      <div className="flex-1 overflow-y-auto no-scrollbar divide-y divide-grey-15" style={{ maxHeight: '450px' }}>
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="grid grid-cols-12 p-2 hover:bg-grey-10 transition-colors"
          >
            <div className="col-span-4 flex flex-col px-1">
              <span className="text-[11px] font-medium truncate text-grey-80">
                {tip.league}
              </span>
              <span className="text-[10px] text-grey-60 truncate">
                {tip.match}
              </span>
            </div>
            <div className="col-span-3 flex flex-col px-1">
              <span className="text-[11px] font-medium text-brand-50">
                {tip.tip}
              </span>
              {renderStars(tip.confidence)}
            </div>
            <div className="col-span-3 flex items-center justify-end px-1">
              <span className="text-[11px] font-bold text-accent-green">
                {parseFloat(tip.odds).toFixed(2)}
              </span>
            </div>
            <div className="col-span-2 flex items-center justify-end px-1">
              <span className="text-[10px] text-grey-60">
                {tip.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Mini Stats Footer */}
      <div className="bg-bg-l0 border-t border-grey-15 p-2">
        <div className="grid grid-cols-3 gap-1 text-center text-[10px]">
          <div className="bg-grey-10 rounded p-1">
            <div className="text-grey-70">Win Rate</div>
            <div className="font-bold text-accent-green">78%</div>
          </div>
          <div className="bg-grey-10 rounded p-1">
            <div className="text-grey-70">Avg Odds</div>
            <div className="font-bold">1.85</div>
          </div>
          <div className="bg-grey-10 rounded p-1">
            <div className="text-grey-70">Tips</div>
            <div className="font-bold">{tips.length}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BettingTips