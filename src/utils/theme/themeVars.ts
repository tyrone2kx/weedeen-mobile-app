import { vars } from 'nativewind';
import { darkThemeColorsVars, lightThemeColorsVars } from './themeColorsVars';

const themeVars = {
  light: vars(lightThemeColorsVars),
  dark: vars(darkThemeColorsVars),
};

export default themeVars;
