/** @type {import('tailwindcss').Config} */
// Weedeen design tokens. Values mirror src/utils/theme/colors.ts (light) so that
// utility classes resolve to the same palette the inline useTheme() styles use.
// Dark mode is driven primarily by inline useTheme() in components; class tokens are light-accurate.
module.exports = {
  content: ['./App.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ---- Brand (primary blue) ----
        brand: {
          50: '#EEF4FF',
          100: '#E8EFFF',
          200: '#D9E6FF',
          300: '#B3CCFF',
          400: '#4D82FF',
          500: '#2563EB',
          600: '#1D4ED8',
          700: '#1E40AF',
          800: '#1E3A8A',
          900: '#172554',
          DEFAULT: '#2563EB',
        },
        // ---- Semantic text ----
        ink: '#0B1220', // headings
        body: '#344054', // body text
        muted: '#667085', // secondary text
        placeholder: '#98A2B3',
        // ---- Surfaces / lines ----
        surface: '#FFFFFF',
        canvas: '#F8FAFB', // screen background
        'surface-alt': '#F5F7FA', // inset rows
        track: '#F2F4F7', // segmented-control track
        line: '#EAECF0', // borders

        // ---- Status ----
        success: '#039855',
        'success-bg': '#ECFDF3',
        danger: '#D92D20',
        'danger-bg': '#FEF3F2',
        warning: '#DC6803',
        'warning-bg': '#FFFAEB',
        info: '#2563EB',
        'info-bg': '#EFF4FF',

        // ---- Scale aliases (match colors.ts light so existing classes resolve) ----
        black: {
          400: '#667085',
          600: '#101828',
          700: '#0B1220',
          900: '#000000',
          DEFAULT: '#101828',
        },
        blue: {
          300: '#E8EFFF',
          400: '#4D82FF',
          500: '#2563EB',
          600: '#1D4ED8',
          DEFAULT: '#2563EB',
        },
        gray: {
          100: '#F2F4F7',
          150: '#EEF1F4',
          200: '#EAECF0',
          250: '#E6E9EC',
          300: '#D0D5DD',
          400: '#98A2B3',
          500: '#667085',
          600: '#475467',
          DEFAULT: '#98A2B3',
        },
        green: {
          300: '#D1FADF',
          400: '#ECFDF3',
          500: '#12B76A',
          600: '#039855',
          DEFAULT: '#12B76A',
        },
        orange: {
          400: '#FFFAEB',
          500: '#F79009',
          600: '#DC6803',
          DEFAULT: '#F79009',
        },
        yellow: {
          400: '#FFFAEB',
          450: '#FEF0C7',
          500: '#F79009',
          600: '#DC6803',
          DEFAULT: '#F79009',
        },
        red: {
          300: '#FEE4E2',
          500: '#F04438',
          600: '#D92D20',
          DEFAULT: '#D92D20',
        },
        white: {
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#F8FAFB',
          400: '#F8FAFB',
          DEFAULT: '#FFFFFF',
        },
        purple: { 300: '#E8E4FF', 400: '#5668D5', 500: '#362391', DEFAULT: '#362391' },
        pink: { 500: '#DE8FC2', DEFAULT: '#DE8FC2' },
        brown: { 500: '#59323C', DEFAULT: '#59323C' },
      },
      fontFamily: {
        sans: ['PlusJakartaSans-Regular'],
        pjs: ['PlusJakartaSans-Regular'],
        'pjs-medium': ['PlusJakartaSans-Medium'],
        'pjs-semibold': ['PlusJakartaSans-SemiBold'],
        'pjs-bold': ['PlusJakartaSans-Bold'],
        'pjs-extrabold': ['PlusJakartaSans-ExtraBold'],
      },
      borderRadius: {
        card: '16px',
        sheet: '24px',
        pill: '9999px',
      },
    },
  },
  plugins: [],
};
