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
          'https://decntralisedapi.onrender.com/api/betting-tips?page=1&pageSize=100000'
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
      <div className="flex space-x-0.5">
        {[...Array(5)].map((_, i) => (
          <Icon
            key={i}
            name="interface/win"
            className={`w-3 h-3 ${i < count ? 'text-brand-60' : 'text-gray-300'}`}
          />
        ))}
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-60"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-brand-20 text-brand-70 p-4 rounded-lg">
        <p>Error loading tips: {error}</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-70 to-brand-60 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-white font-bold text-lg">Today's Betting Tips</h2>
          <span className="bg-white/20 text-white/90 text-xs px-2 py-1 rounded-full">
            {tips.length} tips
          </span>
        </div>
      </div>

      {/* Tips List */}
      <div className="divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="p-4 hover:bg-brand-20/30 transition-colors duration-150"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-xs font-medium text-gray-500">
                  {tip.league} • {formatDate(tip.date)}
                </span>
                <h3 className="font-medium text-gray-900">{tip.match}</h3>
              </div>
            </div>

            <div className="flex justify-between items-center mt-3">
              <div>
                <p className="text-sm font-semibold text-brand-60">{tip.tip}</p>
                <div className="mt-1 flex items-center">
                  {renderStars(tip.confidence)}
                  <span className="text-xs text-gray-500 ml-2">
                    Confidence: {tip.confidence}/5
                  </span>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  {tip.time}
                </p>
                <p className="text-lg font-bold text-brand-60">
                  {parseFloat(tip.odds).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="bg-brand-20 p-3 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <div className="text-brand-70">
            <span className="font-medium">Last updated:</span>{' '}
            {new Date().toLocaleTimeString()}
          </div>
          <div className="text-brand-60 font-medium hover:text-brand-70 transition-colors cursor-pointer">
            View all tips →
          </div>
        </div>
      </div>
    </div>
  )
}

export default BettingTips
