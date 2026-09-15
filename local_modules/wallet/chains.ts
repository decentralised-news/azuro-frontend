import { polygonAmoy, spicy, polygon, gnosis, chiliz, bsc, bscTestnet } from 'viem/chains'


const isDevEnabled = Boolean(JSON.parse(process.env.AZURO_UNSTABLE_DEV_ENABLED || 'false'))

export const appChains = isDevEnabled
  ? [ polygonAmoy, spicy, bscTestnet ] as const
  : [ polygon, gnosis, chiliz, bsc ] as const
