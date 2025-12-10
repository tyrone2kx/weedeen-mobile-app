import { useColorScheme } from 'nativewind';
import { useMemo } from 'react';
import themeColors from './themeColors';

type TThemeProps = {
  colorScheme?: 'light' | 'dark';
};

const useTheme = (props: TThemeProps = {}) => {
  const { colorScheme = 'light' } = useColorScheme();

  const theme = useMemo(() => {
    return themeColors[props.colorScheme || colorScheme];
  }, [colorScheme, props.colorScheme]);

  const bgImageTintColor =
    colorScheme === 'light'
      ? themeColors.light.white.DEFAULT
      : themeColors.light.black[400];

  return {
    theme,
    colorScheme,
    bgImageTintColor,
  };
};

export default useTheme;
