import { useIsFocused } from '@react-navigation/native';
import { FC } from 'react';
import { StatusBar, StatusBarProps } from 'react-native';

const FocusAwareStatusBar: FC<StatusBarProps> = (props) => {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
};

export default FocusAwareStatusBar;
