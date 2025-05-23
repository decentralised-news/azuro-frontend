'use client'

import React from 'react'
import { useBetTokenBalance, useBetsSummary, useChain, useNativeBalance } from '@azuro-org/sdk'
import { type ChainId } from '@azuro-org/toolkit'
import { Listbox, ListboxButton, ListboxOptions } from '@headlessui/react'
import { Message } from '@locmod/intl'
import cx from 'classnames'
import { openModal } from '@locmod/modal'
import { useAccount } from '@azuro-org/sdk-social-aa-connector'
import { config } from 'wallet'
import { constants, toLocaleString } from 'helpers'

import { Icon } from 'components/ui'
import { Dropdown } from 'components/inputs'

import messages from './messages'


type ChainCurrencyProps = {
  className?: string
  chainClassName?: string
  chainId: ChainId
  size: 4 | 5
  borderColor?: 'bg-l0' | 'grey-10' | 'grey-20'
  withGrayscale?: boolean
}

const ChainCurrency: React.FC<ChainCurrencyProps> = ({ className, chainClassName, chainId, size, withGrayscale }) => {
  return (
    <div className={cx('flex items-center', className)}>
      <div className={cx('border-2 rounded-full z-10 transition-colors', chainClassName)}>
        <Icon
          className={`size-${size}`}
          name={constants.chainIcons[chainId]}
        />
      </div>
      <Icon
        className={cx('-ml-1.5', `size-${size}`, { 'grayscale': withGrayscale })}
        name={constants.currencyIcons[chainId]}
      />
    </div>
  )
}

const ChainSelect: React.FC = () => {
  const { appChain, setAppChainId } = useChain()

  return (
    <div className="border border-grey-20 p-1 rounded-md">
      <Listbox value={appChain.id} onChange={setAppChainId}>
        <ListboxButton
          className="p-2 flex items-center justify-between w-full group/select"
        >
          <div className="flex items-center">
            <ChainCurrency
              className="mr-2"
              chainClassName="border-bg-l2"
              chainId={appChain.id}
              size={4}
            />
            <div className="text-caption-13">{appChain.name}</div>
          </div>
          <Icon className="size-4 text-grey-60 group-hover/select:text-grey-90 transition-colors group-aria-[controls]/select:rotate-180" name="interface/chevron_down" />
        </ListboxButton>
        <ListboxOptions className="w-full space-y-[2px]" modal={false}>
          {
            config.chains.map((chain) => {
              const isActive = appChain.id === chain.id

              return (
                <Listbox.Option
                  key={chain.id}
                  value={chain.id}
                  className="flex items-center justify-between p-2 cursor-pointer bg-bg-l3 first-of-type:rounded-t-sm last-of-type:rounded-b-sm"
                >
                  <div className="flex items-center">
                    <ChainCurrency
                      chainId={chain.id}
                      chainClassName="border-bg-l3"
                      className="mr-2"
                      size={4}
                    />
                    <div className="text-caption-12">{chain.name}</div>
                  </div>
                  <div
                    className={
                      cx('size-4 border flex items-center justify-center rounded-full',
                        {
                          'border-grey-20': !isActive, 'border-brand-70': isActive,
                        })
                    }
                  >
                    {
                      isActive && (
                        <div className="size-3 bg-brand-50 rounded-full" />
                      )
                    }
                  </div>
                </Listbox.Option>
              )
            })
          }
        </ListboxOptions>
      </Listbox>
    </div>
  )
}

const BalanceInfo: React.FC = () => {
  const { address } = useAccount()
  const { appChain, betToken } = useChain()
  const { data: balanceData, isLoading: isBalanceFetching } = useBetTokenBalance()
  const { data: nativeBalanceData, isLoading: isNativeBalanceFetching } = useNativeBalance()
  const { data: betsSummaryData, isLoading: isBetsSummaryFetching } = useBetsSummary({
    account: address!,
  })

  const { inBets, toPayout } = betsSummaryData || {}
  const { balance } = balanceData || {}
  const { balance: nativeBalance } = nativeBalanceData || {}

  return (
    <div className="rounded-md bg-bg-l1 overflow-hidden">
      <div className="py-2 px-3 border-b border-b-bg-l2">
        <Message className="text-caption-13 text-grey-60 mb-[2px]" value={messages.balance} />
        <div className="space-x-1">
          {
            Boolean(isBalanceFetching || isNativeBalanceFetching) ? (
              <div className="bone h-4 w-10 rounded-full" />
            ) : (
              <>
                <span className="text-caption-13 font-semibold">
                  {toLocaleString(balance || 0, { digits: 2 } )} {betToken.symbol}
                </span>
                <span className="text-caption-12 text-grey-60">
                  + {toLocaleString(nativeBalance || 0, { digits: 2 })} {appChain.nativeCurrency.symbol}
                </span>
              </>
            )
          }
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-full py-2 px-3">
          <Message className="text-caption-13 text-grey-60 mb-[2px]" value={messages.inBets} tag="p" />
          {
            isBetsSummaryFetching ? (
              <div className="bone h-4 w-10 rounded-full" />
            ) : (
              <div className="text-caption-13 font-semibold">
                {toLocaleString(inBets || 0, { digits: 2 })} {betToken.symbol}
              </div>
            )
          }
        </div>
        <div className="w-full border-l border-l-bg-l2 py-2 px-3">
          <Message className="text-caption-13 text-grey-60 mb-[2px]" value={messages.toRedeem} tag="p" />
          {
            isBetsSummaryFetching ? (
              <div className="bone h-4 w-10 rounded-full" />
            ) : (
              <div className="text-caption-13 font-semibold">
                {toLocaleString(toPayout || 0, { digits: 2 })} {betToken.symbol}
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

const Content: React.FC = () => {
  return (
    <div className="border border-grey-20 p-2 ds:w-[18.75rem] bg-bg-l2 rounded-md overflow-hidden space-y-2">
      <ChainSelect />
      <BalanceInfo />
    </div>
  )
}

const Balance: React.FC = () => {
  const { appChain } = useChain()
  const { data: balanceData, isLoading } = useBetTokenBalance()

  const { balance } = balanceData || {}

  const handleGetTokensClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()

    openModal('FundingModal')
  }

  const rootClassName = cx('wd:h-10 -wd:h-8 bg-grey-10 flex items-center justify-between border border-transparent pl-1.5 pr-1 w-fit text-grey-60 ui-open:text-grey-90 hover:text-grey-90 ui-open:border-grey-20 hover:border-grey-20 transition-all mb:w-full rounded-md')

  return (
    <Dropdown
      className={cx('group')}
      contentClassName="mb:p-0"
      content={<Content />}
      placement="bottomRight"
    >
      <div className={rootClassName}>
        <div className="flex items-center">
          <ChainCurrency
            className="mr-2"
            chainClassName="border-grey-10 bg-grey-10"
            chainId={appChain.id}
            size={5}
            withGrayscale
          />
          {
            isLoading ? (
              <div className="bone h-4 w-10 rounded-full" />
            ) : (
              <div className="text-caption-13">{toLocaleString(balance || 0, { digits: 2 })}</div>
            )
          }
          <Icon className="size-4 ui-open:rotate-180" name="interface/caret_down" />
        </div>
        <div
          className="flex items-center justify-center size-6 rounded-min bg-brand-50 ml-2 cursor-pointer text-grey-90 flex-none"
          onClick={handleGetTokensClick}
          onMouseEnter={(event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation()}
        >
          <Icon className="size-4" name="interface/plus" />
        </div>
      </div>
    </Dropdown>
  )
}

export default Balance
