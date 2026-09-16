import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'


const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/compositions/**/*.{ts,tsx}',
    './src/views/**/*.{ts,tsx}',
  ],
  theme: {
    screens: {
      // see context/device/index
      mb: { max: '801.9px' }, // isMobileView
      ds: '802px', // isDesktopView
      nr: { min: '802px', max: '1279.9px' }, // isNarrowVie
      '-wd': { max: '1280px' },
      'wd': { min: '1280px' },
      '2wd': '1366px', // for more control (view where both sidebars are fixed in viewport)
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // SmartContractBets brand
        'brand-70': '#8f1818',
        'brand-60': '#a51c1c',
        'brand-50': '#b82020',
        'brand-15': '#2a0d0d',
        'brand-10': '#3d1212',
        'brand-5': '#241010',

        // slate neutrals
        'grey-90': '#f1f5f9',
        'grey-70': '#cbd5e1',
        'grey-60': '#94a3b8',
        'grey-40': '#64748b',
        'grey-20': '#475569',
        'grey-15': '#334155',
        'grey-10': '#1e293b',

        // navy surfaces (dark chrome)
        'bg-l0': '#0f172a',
        'bg-l1': '#141e32',
        'bg-l2': '#1e293b',
        'bg-l3': '#334155',

        // semantic accent colors
        'accent-pink': '#ec4899',
        'accent-pink-5': '#3b2330',

        'accent-green': '#22c55e',
        'accent-green-5': '#12201a',
        'accent-green-10': '#166534',

        'accent-yellow': '#eab308',
        'accent-yellow-10': '#423a10',

        'accent-red': '#dc2626',
        'accent-red-5': '#2a1215',
        'accent-red-10': '#451a1a',

        'accent-blue': '#3b82f6',

        'accent-purple': '#a855f7',

        // Semantic design-system tokens (light workspace)
        surface: {
          DEFAULT: '#ffffff',
          subtle: '#f8fafc',
          muted: '#eef2f6',
        },
        navy: {
          950: '#080d19',
          900: '#0f172a',
          850: '#141e32',
          800: '#1e293b',
          700: '#334155',
        },
        border: {
          DEFAULT: '#e2e8f0',
          strong: '#cbd5e1',
        },
        success: '#15803d',
        'success-bg': '#f0fdf4',
        warning: '#b45309',
        'warning-bg': '#fffbeb',
        danger: '#b91c1c',
        'danger-bg': '#fef2f2',
        info: '#0369a1',
        'info-bg': '#f0f9ff',
      },
      borderRadius: {
        'ssm': '0.375rem', // 6
        'min': '0.5rem', // 8
        'sm': '0.625rem', // 10
        'md': '0.75rem', // 12
        'lg': '1rem', // 16
      },
      boxShadow: {
        'betslip': '0px -10px 30px rgba(8, 13, 25, 0.6)',
        'sm': '0 1px 2px rgba(15, 23, 42, 0.05)',
        'md': '0 4px 14px rgba(15, 23, 42, 0.08)',
        'panel': '0 10px 30px rgba(15, 23, 42, 0.10)',
        'card': '0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.06)',
      },
      backgroundImage: ({ theme }) => ({
        'card-border-top': 'linear-gradient(180deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0) 100%)',
        'card-border-bottom': 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.10) 100%)',
        'live-switcher-bg': 'linear-gradient(90deg, rgba(220, 38, 38, 0.22) 0%, rgba(220, 38, 38, 0) 100%)',
        'betslip-item-bg': `linear-gradient(90.08deg, ${theme('colors.bg-l2')} 0.06%, ${theme('colors.brand-10')} 300%)`,
        'betslip-item-bg-inc': `linear-gradient(90.08deg, ${theme('colors.bg-l2')} 0.06%, ${theme('colors.accent-green-10')} 300%)`,
        'betslip-item-bg-dec': `linear-gradient(90.08deg, ${theme('colors.bg-l2')} 0.06%, ${theme('colors.accent-red-10')} 300%)`,
        'live-game-shadow': `linear-gradient(90deg, ${theme('colors.accent-red')} -1000%, ${theme('colors.bg-l2')} 100%)`,
        'live-bet-shadow': `linear-gradient(90deg, ${theme('colors.bg-l3')} 0%, ${theme('colors.accent-red')} 800%)`,
        'result-button-won': `linear-gradient(180deg, ${theme('colors.grey-15')} 0%, ${theme('colors.accent-green-10')} 1500%)`,
        'result-button-lost': `linear-gradient(90deg, ${theme('colors.grey-15')} 0%, ${theme('colors.accent-red-10')} 1500%)`,
        'bet-game-won': `linear-gradient(180deg, ${theme('colors.bg-l3')} 0%, ${theme('colors.accent-green-10')} 1000%)`,
        'bet-game-lost': `linear-gradient(180deg, ${theme('colors.bg-l3')} 0%, ${theme('colors.accent-red-10')} 1000%)`,
        'live-event-gradient': `linear-gradient(90deg, transparent 0%, ${theme('colors.accent-red')} 50%, transparent 100%)`,
      }),
      fill: {
        'gradient-azuro-waves-grey': '#c4cfe4',
        'gradient-azuro-waves-mist': '#a5d0e6',
        // ATTN: check /local_modules/svg-provider/SvgSprite.tsx
        'gradient-azuro-waves-sky': 'url(#gradient-azuro-waves-sky)',
        'gradient-azuro-waves-blue': 'url(#gradient-azuro-waves-blue)',
        'gradient-azuro-waves-ultramarine': 'url(#gradient-azuro-waves-ultramarine)',
        'gradient-azuro-waves-bright': 'url(#gradient-azuro-waves-bright)',
        'gradient-azuro-waves-brilliant': 'url(#gradient-azuro-waves-brilliant)',
        'gradient-azuro-waves-royal': 'url(#gradient-azuro-waves-royal)',
      },
    },
  },
  plugins: [
    require('@headlessui/tailwindcss'),
    plugin(({ addComponents, matchUtilities, theme }) => {
      addComponents({
        '.text-heading-h1': {
          fontSize: '1.75rem', // 28
          lineHeight: '2.25rem', // 36
          fontWeight: '700',
        },
        '.text-heading-h2': {
          fontSize: '1.5rem', // 24
          lineHeight: '2rem', // 32
        },
        '.text-heading-h3': {
          fontSize: '1.25rem', // 20
          lineHeight: '1.625rem', // 26
        },
        '.text-heading-h4': {
          fontSize: '1.125rem', // 18
          lineHeight: '1.5rem', // 24
        },
        '.text-heading-h5': {
          fontSize: '1rem', // 16
          lineHeight: '1.25rem', // 20
        },
        '.text-caption-14': {
          fontSize: '0.875rem', // 14
          lineHeight: '1.125rem', // 18
        },
        '.text-caption-13': {
          fontSize: '0.813rem', // 13
          lineHeight: '1rem', // 16
        },
        '.text-caption-12': {
          fontSize: '0.75rem', // 12
          lineHeight: '0.875rem', // 14
        },
        '.text-label-12': {
          fontSize: '0.688rem', // 11
          lineHeight: '0.813rem', // 13
        },
        '.tabular-nums': {
          fontVariantNumeric: 'tabular-nums',
        },
      })
    }),
  ],
}

export default config