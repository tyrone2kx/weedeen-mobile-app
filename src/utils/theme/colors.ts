// Weedeen design tokens — aligned to the product design (Plus Jakarta Sans + brand blue #2563EB).
// Key shape is intentionally stable (consumed by themeColorsVars.ts and useTheme throughout the app);
// only the values are tuned to match the mockup. Light is the source of truth; dark mirrors the keys.

export const light = {
  black: {
    400: '#667085', // muted text / secondary
    600: '#101828', // primary text & icons
    700: '#0B1220', // headings (near-black navy)
    900: '#000000',
    DEFAULT: '#101828',
  },
  blue: {
    300: '#E8EFFF', // light tint — icon tiles, active-tab highlight
    400: '#4D82FF',
    500: '#2563EB',
    600: '#1D4ED8', // pressed
    DEFAULT: '#2563EB', // brand primary
  },
  gray: {
    100: '#F2F4F7', // track / subtle fill
    150: '#EEF1F4', // chips, icon button bg
    200: '#EAECF0', // borders
    250: '#E6E9EC',
    300: '#D0D5DD',
    400: '#98A2B3', // muted icons / placeholder
    500: '#667085', // subtext
    DEFAULT: '#98A2B3',
  },
  green: {
    300: '#D1FADF',
    400: '#ECFDF3', // success bg tint
    500: '#12B76A',
    600: '#039855',
    DEFAULT: '#12B76A',
  },
  orange: {
    400: '#FFFAEB', // warning bg tint
    500: '#F79009',
    600: '#DC6803',
    DEFAULT: '#F79009',
  },
  purple: {
    300: '#E8E4FF',
    400: '#5668D5',
    500: '#362391',
    DEFAULT: '#362391',
  },
  yellow: {
    400: '#FFFAEB',
    450: '#FEF0C7',
    500: '#F79009',
    600: '#DC6803',
    DEFAULT: '#F79009',
  },
  red: {
    300: '#FEE4E2', // danger bg tint
    500: '#F04438',
    600: '#D92D20',
    DEFAULT: '#D92D20',
  },
  white: {
    100: '#FFFFFF',
    200: '#FFFFFF', // input surface
    300: '#F8FAFB', // sheet / raised surface
    400: '#F8FAFB', // screen background / status bar
    DEFAULT: '#FFFFFF',
  },
  pink: {
    500: '#DE8FC2',
    DEFAULT: '#DE8FC2',
  },
  brown: {
    500: '#59323C',
    DEFAULT: '#59323C',
  },
  transparent: 'transparent',
  current: 'currentColor',
} as const;

export const dark = {
  black: {
    400: '#98A2B3',
    600: '#F2F4F7', // primary text & icons (inverted)
    700: '#FFFFFF', // headings
    900: '#FFFFFF',
    DEFAULT: '#F2F4F7',
  },
  blue: {
    300: '#1E3A8A',
    400: '#4D82FF',
    500: '#3B82F6',
    600: '#2563EB',
    DEFAULT: '#2563EB',
  },
  gray: {
    100: '#1C2430',
    150: '#232D3A',
    200: '#2A3543',
    250: '#324050',
    300: '#3B4A5C',
    400: '#64748B',
    500: '#94A3B8',
    DEFAULT: '#64748B',
  },
  green: {
    300: '#064E3B',
    400: '#052E21',
    500: '#12B76A',
    600: '#34D399',
    DEFAULT: '#12B76A',
  },
  orange: {
    400: '#3A2A0A',
    500: '#F79009',
    600: '#FBBF61',
    DEFAULT: '#F79009',
  },
  purple: {
    300: '#2A2550',
    400: '#5668D5',
    500: '#A99BFF',
    DEFAULT: '#A99BFF',
  },
  yellow: {
    400: '#3A2A0A',
    450: '#4A3A14',
    500: '#F79009',
    600: '#FBBF61',
    DEFAULT: '#F79009',
  },
  red: {
    300: '#4A1512',
    500: '#F04438',
    600: '#FDA29B',
    DEFAULT: '#F97066',
  },
  white: {
    100: '#0B1220', // surfaces (inverted)
    200: '#111A28', // input surface
    300: '#0E1726', // sheet
    400: '#0B1220', // screen background
    DEFAULT: '#0B1220',
  },
  pink: {
    500: '#DE8FC2',
    DEFAULT: '#DE8FC2',
  },
  brown: {
    500: '#59323C',
    DEFAULT: '#59323C',
  },
  transparent: 'transparent',
  current: 'currentColor',
} as const;

export type TColors = typeof light | typeof dark;
