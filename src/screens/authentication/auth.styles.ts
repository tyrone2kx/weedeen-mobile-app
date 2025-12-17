import { Sizes } from '@wd/utils/Theme';
import { StyleSheet } from 'react-native';

export const authStyles = StyleSheet.create({
  app_logo_lg: {
    width: 150,
    height: 60,
  },
  pad_touchable: {
    paddingVertical: Sizes.SIXTEEN / 2,
  },
  keyboard_avoiding_view: {
    flex: 1,
    width: '100%',
  },
});
