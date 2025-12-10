import { useColorScheme } from 'nativewind';
import { FC } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StatusBarProps,
  ViewProps,
} from 'react-native';
import FocusAwareStatusBar from '../StatusBar/StatusBar';

type SafeAreaComponentProps = ViewProps & {
  isDark?: boolean;
  statusBarProps?: StatusBarProps;
  focusAwareStatusBar?: boolean;
};

const SafeAreaComponent: FC<SafeAreaComponentProps> = ({
  isDark,
  statusBarProps,
  focusAwareStatusBar = false,
  ...props
}) => {
  const { colorScheme = 'light' } = useColorScheme();

  const backgroundColor = isDark || colorScheme === 'dark' ? 'black' : 'white';

  const barStyle =
    !isDark && colorScheme === 'dark' ? 'light-content' : 'dark-content';

  return (
    <>
      <SafeAreaView {...props} />
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
