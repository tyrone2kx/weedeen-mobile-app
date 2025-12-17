import { Theme } from '@wd/utils/Theme';
import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('screen');
export const onboardingStyles = StyleSheet.create({
  slides_container: {
    height: height * 0.85,
  },
  slide_item_container: {
    flex: 1,
    width,
  },
  getting_started_content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  button_row: {
    flexDirection: 'row',
    marginHorizontal: 16,
    gap: 16,
  },
  button_wrapper: {
    flex: 0.5,
  },
  alt_button: {
    backgroundColor: Theme.colors.white.DEFAULT,
    borderRadius: 100,
  },
  alt_button_text: {
    color: Theme.colors.black[600],
  },
});
