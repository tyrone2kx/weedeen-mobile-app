import { useColorScheme } from 'nativewind';
import { FC } from 'react';
import { StatusBar, StatusBarProps, ViewProps } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '../StatusBar/StatusBar';

type SafeAreaComponentProps = ViewProps & {
  isDark?: boolean;
  statusBarProps?: StatusBarProps;
  focusAwareStatusBar?: boolean;
  edges?: readonly Edge[];
};

const SafeAreaComponent: FC<SafeAreaComponentProps> = ({
  isDark,
  statusBarProps,
  focusAwareStatusBar = false,
  edges = ['top'],
  ...props
}) => {
  const { colorScheme = 'light' } = useColorScheme();

  const backgroundColor = isDark || colorScheme === 'dark' ? 'black' : 'white';

  const barStyle =
    !isDark && colorScheme === 'dark' ? 'light-content' : 'dark-content';

  return (
    <>
      <SafeAreaView edges={edges} {...props} />
      {focusAwareStatusBar ? (
        <FocusAwareStatusBar
          animated
          backgroundColor={backgroundColor}
          barStyle={barStyle}
          {...statusBarProps}
        />
      ) : (
        <StatusBar
          animated
          backgroundColor={backgroundColor}
          barStyle={barStyle}
          {...statusBarProps}
        />
      )}
    </>
  );
};

export default SafeAreaComponent;
