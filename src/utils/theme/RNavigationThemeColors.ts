import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Fonts } from '../Fonts';
import { dark, light } from './colors';

export const RNavigationFonts = {
  regular: {
    fontFamily: Fonts.default,
    fontWeight: 'normal',
  },
  medium: {
    fontFamily: Fonts.medium,
    fontWeight: 'normal',
  },
  bold: {
    fontFamily: Fonts.semibold,
    fontWeight: 'normal',
  },
  heavy: {
    fontFamily: Fonts.bold,
    fontWeight: 'normal',
  },
} as const;

export const RNavigationLightTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    primary: light.green.DEFAULT,
    background: light.white[400],
    card: light.white.DEFAULT,
    text: light.black[600],
    border: light.gray[200],
    notification: light.orange.DEFAULT,
  },
  fonts: RNavigationFonts,
} satisfies ReactNavigation.Theme;

export const RNavigationDarkTheme = {
  ...DarkTheme,
  dark: true,
  colors: {
    primary: dark.green.DEFAULT,
    background: dark.white[400],
    card: dark.white.DEFAULT,
    text: dark.black[600],
    border: dark.gray[200],
    notification: dark.orange.DEFAULT,
  },
  fonts: RNavigationFonts,
} satisfies ReactNavigation.Theme;
